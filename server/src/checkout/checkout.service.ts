import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CheckoutOrderDTO } from './dto/checkout-order.dto';
import { CheckoutListingDTO } from './dto/checkout-listing.dto';
import { OrdersService } from 'src/orders/orders.service';
import { orders } from '@prisma/client';
var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;
var SDKConstants = require('authorizenet').Constants;

@Injectable()
export class CheckoutService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ordersService: OrdersService,
  ) {}

  async checkoutOrder(checkout: CheckoutOrderDTO, user_id: string) {
    await this.prisma.orders.update({
      where: {
        number: checkout.orderNumber,
        buyer_user_id: user_id,
        is_paid: false,
      },
      data: {
        ship_to_ffl_id: checkout.ffl,
        billing_name: checkout.fullName,
        billing_address_1: checkout.address1,
        billing_address_2: checkout.address2,
        billing_city: checkout.city,
        billing_state: checkout.state,
        billing_zip: checkout.zip,
      },
    });

    const order = await this.prisma.orders.findFirst({
      where: {
        number: checkout.orderNumber,
      },
      include: { listing: true },
    });

    const response = await this.processTransaction(
      checkout,
      order,
      order.listing,
    );

    if (response.error) {
      await this.prisma.orders.delete({
        where: { number: order.number },
      });
      throw new InternalServerErrorException(response.message);
    } else {
      // Update Order
      await this.prisma.orders.update({
        where: {
          number: checkout.orderNumber,
          buyer_user_id: user_id,
          is_paid: false,
        },
        data: {
          is_paid: true,
          checkout_completed: true,
          status: 'paid',
        },
      });

      // TODO: Send payment confirmation email
      return true;
    }
  }

  async checkoutListing(checkout: CheckoutListingDTO, user_id: string) {
    const listing = await this.prisma.listings.findFirst({
      where: {
        ref: checkout.listingRef,
        status: 'active',
        listing_type: 'fixed',
        quantity: { lte: checkout.quantity },
      },
    });

    if (!listing) {
      return new BadRequestException(
        'Checkout not available for this listing.',
      );
    }

    let order = await this.ordersService.createOrder(
      listing.id,
      user_id,
      listing.price.toNumber(),
      listing.shipping_charge.toNumber(),
      checkout.quantity,
    );

    if (!order)
      return new InternalServerErrorException(
        'There was an error while processing your checkout.',
      );

    order = await this.prisma.orders.update({
      where: {
        number: order.number,
      },
      data: {
        ship_to_ffl_id: checkout.ffl,
        billing_name: checkout.fullName,
        billing_address_1: checkout.address1,
        billing_address_2: checkout.address2,
        billing_city: checkout.city,
        billing_state: checkout.state,
        billing_zip: checkout.zip,
      },
    });

    const response = await this.processTransaction(checkout, order, listing);

    if (response.error) {
      await this.prisma.orders.delete({
        where: { number: order.number },
      });
      throw new InternalServerErrorException(response.message);
    } else {
      // Update Order
      await this.prisma.orders.update({
        where: {
          number: order.number,
        },
        data: {
          is_paid: true,
          checkout_completed: true,
          status: 'paid',
        },
      });

      // TODO: Send payment confirmation email
      return true;
    }
  }

  private async processTransaction(checkout, order: orders, listing) {
    var merchantAuthenticationType =
      new ApiContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(process.env.AUTHORIZENET_LOGIN);
    merchantAuthenticationType.setTransactionKey(
      process.env.AUTHORIZENET_TRANSACTION_KEY,
    );

    // Card Information
    var creditCard = new ApiContracts.CreditCardType();
    creditCard.setCardNumber(checkout.cardNumber);
    const expirationDate =
      checkout.expDateMonth + checkout.expDateYear.slice(-2);
    console.log('Expiration Date:', expirationDate);
    creditCard.setExpirationDate(expirationDate);
    creditCard.setCardCode(checkout.cvv);

    var paymentType = new ApiContracts.PaymentType();
    paymentType.setCreditCard(creditCard);

    // Order details
    var orderDetails = new ApiContracts.OrderType();
    orderDetails.setInvoiceNumber('INV-' + order.number);
    const orderDescription = 'Order #' + order.number;
    orderDetails.setDescription(orderDescription);

    // Shipping
    var shipping = new ApiContracts.ExtendedAmountType();
    shipping.setAmount(order.shipping_price);
    shipping.setName('shipping name');
    shipping.setDescription('shipping description');

    // Billing
    var billTo = new ApiContracts.CustomerAddressType();
    billTo.setFirstName(order.billing_name.split(' ')[0]);
    billTo.setLastName(order.billing_name.split(' ').pop());
    billTo.setAddress(order.billing_address_1 + ' ' + order.billing_address_2);
    billTo.setCity(order.billing_city);
    billTo.setState(order.billing_state);
    billTo.setZip(order.billing_zip);
    billTo.setCountry('USA');

    // Order Items
    var lineItemList = [];

    var lineItem = new ApiContracts.LineItemType();
    lineItem.setItemId(listing.ref);
    lineItem.setName(listing.title);
    lineItem.setQuantity(order.quantity);
    lineItem.setUnitPrice(order.price_per_item);
    lineItemList.push(lineItem);

    var lineItems = new ApiContracts.ArrayOfLineItem();
    lineItems.setLineItem(lineItemList);

    var transactionRequestType = new ApiContracts.TransactionRequestType();
    transactionRequestType.setTransactionType(
      ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION,
    );
    transactionRequestType.setPayment(paymentType);
    transactionRequestType.setAmount(order.total);
    transactionRequestType.setLineItems(lineItems);
    transactionRequestType.setOrder(orderDetails);
    transactionRequestType.setShipping(shipping);
    transactionRequestType.setBillTo(billTo);

    var createRequest = new ApiContracts.CreateTransactionRequest();
    createRequest.setMerchantAuthentication(merchantAuthenticationType);
    createRequest.setTransactionRequest(transactionRequestType);

    //pretty print request
    console.log(JSON.stringify(createRequest.getJSON(), null, 2));

    var ctrl = new ApiControllers.CreateTransactionController(
      createRequest.getJSON(),
    );

    //Defaults to sandbox
    //ctrl.setEnvironment(SDKConstants.endpoint.production);

    const response: { error: boolean; message: string | null } =
      await new Promise(function (resolve, reject) {
        ctrl.execute(() => {
          let transactionError = false;
          let transactionErrorMessage;
          var apiResponse = ctrl.getResponse();

          var response = new ApiContracts.CreateTransactionResponse(
            apiResponse,
          );

          //pretty print response
          console.log(JSON.stringify(response, null, 2));

          if (response != null) {
            if (
              response.getMessages().getResultCode() ==
              ApiContracts.MessageTypeEnum.OK
            ) {
              if (response.getTransactionResponse().getMessages() != null) {
                // Successful transaction
                console.log(
                  'Successfully created transaction with Transaction ID: ' +
                    response.getTransactionResponse().getTransId(),
                );
              } else {
                transactionError = true;
                console.log('Failed Transaction.');
                if (response.getTransactionResponse().getErrors() != null) {
                  console.log(
                    'Error message: ' +
                      response
                        .getTransactionResponse()
                        .getErrors()
                        .getError()[0]
                        .getErrorText(),
                  );
                  transactionErrorMessage = response
                    .getTransactionResponse()
                    .getErrors()
                    .getError()[0]
                    .getErrorText();
                }
              }
            } else {
              // Failed Transaction
              transactionError = true;
              console.log('Failed Transaction.');
              if (
                response.getTransactionResponse() != null &&
                response.getTransactionResponse().getErrors() != null
              ) {
                console.log(
                  'Error message: ' +
                    response
                      .getTransactionResponse()
                      .getErrors()
                      .getError()[0]
                      .getErrorText(),
                );
                transactionErrorMessage = response
                  .getTransactionResponse()
                  .getErrors()
                  .getError()[0]
                  .getErrorText();
              } else {
                console.log(
                  'Error Code: ' +
                    response.getMessages().getMessage()[0].getCode(),
                );
                console.log(
                  'Error message: ' +
                    response.getMessages().getMessage()[0].getText(),
                );
                transactionErrorMessage = response
                  .getMessages()
                  .getMessage()[0]
                  .getText();
              }
            }
          } else {
            // Null Response
            transactionError = true;
            transactionErrorMessage = 'Unexpected Server Error.';
            console.log('Null Response.');
          }
          resolve({
            error: transactionError,
            message: transactionErrorMessage,
          });
        });
      });
    return response;
  }
}

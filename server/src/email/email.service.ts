import { Injectable, InternalServerErrorException } from '@nestjs/common';
const brevo = require('@getbrevo/brevo');

const ContactsApi = new brevo.ContactsApi();

ContactsApi.setApiKey(
  brevo.AccountApiApiKeys.apiKey,
  process.env.BREVO_API_KEY,
);

const TransactionalEmailsApi = new brevo.TransactionalEmailsApi();

TransactionalEmailsApi.setApiKey(
  brevo.AccountApiApiKeys.apiKey,
  process.env.BREVO_API_KEY,
);

const marketingListID = 4;

@Injectable()
export class EmailService {
  async sendVerificationEmail(code: number, email: string) {
    const sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.to = [{ email: email }];
    sendSmtpEmail.params = {
      code: code,
      link: process.env.CLIENT_BASE_URL + '/verify-email/?code=' + code,
    };
    sendSmtpEmail.templateId = 7;

    TransactionalEmailsApi.sendTransacEmail(sendSmtpEmail).then(
      function (data) {
        // Email sent successfully.
      },
      function (error) {
        console.log(error.body.message || error);
        throw new InternalServerErrorException(error);
      },
    );
  }

  async sendWelcomeEmail(email: string) {
    const sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.to = [{ email: email }];
    sendSmtpEmail.templateId = 9;

    TransactionalEmailsApi.sendTransacEmail(sendSmtpEmail).then(
      function (data) {
        // Email sent successfully.
      },
      function (error) {
        console.log(error.body.message || error);
        throw new InternalServerErrorException(error);
      },
    );
  }

  async sendPasswordResetEmail(code: string, email: string) {
    const sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.to = [{ email: email }];
    sendSmtpEmail.params = {
      link: process.env.CLIENT_BASE_URL + '/forgot-password/?code=' + code,
    };
    sendSmtpEmail.templateId = 8;

    TransactionalEmailsApi.sendTransacEmail(sendSmtpEmail).then(
      function (data) {
        // Email sent successfully.
      },
      function (error) {
        console.log(error.body.message || error);
        throw new InternalServerErrorException(error);
      },
    );
  }

  async addUser(email: string, first_name: string, last_name: string) {
    const createContact = new brevo.CreateContact();

    createContact.email = email;
    createContact.attributes = { FIRSTNAME: first_name, LASTNAME: last_name };

    ContactsApi.createContact(createContact)
      .then(function (data) {
        console.log(
          'API called successfully. Returned data: ' + JSON.stringify(data),
        );
      })
      .catch((error) => {
        console.log(error.body.message || error);
      });
  }

  async subscribeToMarketingEmails(email: string) {
    const updateContact = new brevo.UpdateContact();

    updateContact.listIds = [marketingListID];

    return await ContactsApi.updateContact(email, updateContact)
      .then(function (data) {
        // Subscribed Successfully
        return true;
      })
      .catch((error) => {
        console.log(error.body.message || error);
        return false;
      });
  }

  async unsubscribeFromMarketingEmails(email: string) {
    const updateContact = new brevo.UpdateContact();

    updateContact.unlinkListIds = [marketingListID];

    return await ContactsApi.updateContact(email, updateContact)
      .then(function (data) {
        // Unsubscribed Successfully
        return true;
      })
      .catch((error) => {
        console.log(error.body.message || error);
        return false;
      });
  }

  async checkMarketingSubscription(email: string) {
    const contact = await ContactsApi.getContactInfo(email)
      .then((data) => {
        return data.body;
      })
      .catch((error) => {
        console.log(error.body.message || error);
        return false;
      });

    if (!contact) return false;
    if (contact.listIds.includes(marketingListID)) return true;

    return false;
  }
}

import Image from "next/image";

export function processArrows(status: string) {
  const statusFlowArray = {
    paid: false,
    shipped: false,
    complete: false,
  };

  if (status === "paid") {
    statusFlowArray.paid = true;
  } else if (status === "shipped") {
    statusFlowArray.paid = true;
    statusFlowArray.shipped = true;
  } else if (status === "complete") {
    statusFlowArray.paid = true;
    statusFlowArray.shipped = true;
    statusFlowArray.complete = true;
  }

  return (
    <div className="flex items-center gap-2 text-xs sm:text-sm">
      <span className="font-semibold text-blue-800">Ordered</span>
      <Image
        src="/assets/icons/arrow-right.png"
        width={12}
        height={12}
        alt=""
      />
      <span
        className={
          "font-semibold " +
          (statusFlowArray.paid ? "text-blue-800" : "text-gray-400")
        }
      >
        Paid
      </span>
      <Image
        className={!statusFlowArray.paid ? "grayscale opacity-50" : ""}
        src="/assets/icons/arrow-right.png"
        width={12}
        height={12}
        alt=""
      />
      <span
        className={
          "font-semibold " +
          (statusFlowArray.shipped ? "text-blue-800" : "text-gray-400")
        }
      >
        Shipped
      </span>
      <Image
        className={!statusFlowArray.shipped ? "grayscale opacity-50" : ""}
        src="/assets/icons/arrow-right.png"
        width={12}
        height={12}
        alt=""
      />
      <span
        className={
          "font-semibold " +
          (statusFlowArray.complete ? "text-green-700" : "text-gray-400")
        }
      >
        Complete
      </span>
    </div>
  );
}

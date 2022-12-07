import Link from "next/link";
import type { DoctorResponse } from "../../../server/trpc/router/db";
import {
  formatMoney,
  formatProductName,
  formatProductType,
} from "../../../utils";

type Props = {
  transaction: DoctorResponse["payments"][0];
};

const Transaction = ({
  transaction: {
    amount,
    contextualInfo,
    paymentNature,
    date,
    doctorId,
    id,
    manufacturerId,
    manufacturerName,
    paymentType,
    productCategory,
    productName,
    productType,
    year,
  },
}: Props) => (
  <div className="flex w-full justify-center">
    <div className="w-full rounded-lg bg-white text-center shadow-lg lg:w-3/4">
      <div className="w-full p-2">
        <div className="flex flex-row justify-between">
          <h5 className="text-md mb-2 font-medium text-gray-900 underline">
            <Link href={`/manufacturer/${manufacturerId}`}>
              {manufacturerName}
            </Link>
          </h5>
          <p className="mb-1 text-base text-gray-700">
            {" "}
            {new Date(date).toLocaleDateString()}
          </p>
        </div>
        <div className="flex flex-row justify-between">
          <h5 className="text-md mb-2 text-gray-900">
            {formatProductType(productType)}: {formatProductName(productName)}
          </h5>
          <p className="mb-1 text-base text-gray-700"> {amount ? formatMoney(amount) : 0}</p>
        </div>
        <div className="flex flex-row justify-between text-sm">
          <p className="mb-1 text-base text-gray-700">
            Context: {paymentNature}
          </p>

          <div className="border-gray-300 text-gray-600"></div>
        </div>
      </div>
    </div>
  </div>
);

export default Transaction;

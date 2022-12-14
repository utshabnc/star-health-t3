import type { Doctor, Manufacturer, Payment } from "@prisma/client";
import Link from "next/link";
import {
  formatMoney, formatName,
} from "../../utils";

type Props = {
  transaction: Payment & {
    doctor: Doctor;
    manufacturer: Manufacturer;
  },
}

const Transaction = ({
  transaction: {
    amount,
    contextualInfo,
    date,
    doctorId,
    id,
    manufacturerId,
    manufacturerName,
    paymentNature,
    paymentType,
    year,
    productId,
    doctor,
    manufacturer,
  }
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
            Doctor: {formatName(doctor.firstName + ' ' + doctor.lastName)}
          </h5>
          <p className="mb-1 text-base text-gray-700"> {formatMoney(amount)}</p>
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

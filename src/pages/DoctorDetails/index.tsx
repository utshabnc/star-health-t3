import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useState,
} from "react";
// import { useUser } from '../../hooks';
// import { useAddReviewMutation, useDoctorQuery } from '../../api';
// import "./index.css";
import { DocDets } from "../../components/DocDets";
import ReviewForm from "../../components/ReviewForm";
// import Reviews from '../../components/Reviews';
import {
  formatMoney,
  formatName,
  formatProductName,
  formatProductType,
} from "../../utils";
import Transaction from "../../components/DocDets/Transaction";
import BarChart from "../../components/charts/bar";
import DoctorReviews from "../DoctorReviews";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

// .bgColor {
//   background-color: #f6f6f6;
// }

const DoctorDetails = () => {
  const navigate = useRouter();
  const id = navigate.query.id as string;
  // const [user] = useUser();

  const [year, setYear] = useState<string>();

  const { data: doctor } = trpc.db.doctor.useQuery({ id, year });

  // const addReview = useAddReviewMutation();

  // const [reviewText, setReviewText] = useState('');
  // const [reviewStars, setReviewStars] = useState(5);

  // const formatter = new Intl.NumberFormat('en-US', {
  //   style: 'currency',
  //   currency: 'USD',
  // });

  // const payment = [
  //   { title: 'Top Payments Made' },
  //   { title: 'Top Products' },
  //   { title: 'Top Manufacturers' },
  // ];

  if (!doctor) {
    return (
      <>
        <div className="bgColor">
          <div
            style={{
              height: "800px",
            }}
            className="rounded bg-white p-5"
          >
            <div className="flex flex-row">
              <div>
                <button
                  onClick={navigate.back}
                  className="ease focus:shadow-outline select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex w-11/12 justify-center">
                <div className="flex flex-col">
                  <p className="p-1 text-2xl font-semibold text-violet-700"></p>

                  <div className="mx-auto mt-48 max-w-2xl">
                    <svg
                      role="status"
                      className="mr-2 inline h-20 w-20 animate-spin fill-purple-600 text-gray-200 dark:text-gray-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  </div>
                  <p className="flex justify-center pt-2 text-lg font-semibold text-violet-700 sm:text-2xl">
                    Loading StarHealth Data...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const specialtyParse = (doctor.specialty ?? "").replace("|", " | ");

  const topManufacturers = doctor.topManufacturers
    .sort((a, b) => b.count - a.count)
    .slice(0, 9);

  return (
    <div className="bgColor">
      <div className="rounded bg-white p-5">
        <div className="flex flex-row">
          <div>
            <button
              onClick={navigate.back}
              className="ease focus:shadow-outline select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </button>
          </div>
        </div>

        <DocDets
          doctor={doctor}
          firstName={doctor.firstName ?? ""}
          lastName={doctor.lastName ?? ""}
          addressLine1={doctor.addressLine1 ?? ""}
          city={doctor.city ?? ""}
          state={doctor.state ?? ""}
          specialty={specialtyParse}
          totalAmount={formatMoney(doctor.totalAmount ?? 0)}
          onChangeYear={(year) =>
            setYear((oldYear) => {
              if (!year) return undefined;
              if (oldYear === String(year)) return;

              return String(year);
            })
          }
        />

        <div className="grid grid-cols-1">
          <div className="mx-1 grid grid-cols-3 rounded-lg border-2 border-violet-400 p-2">
            <div className="flex flex-col ">
              <p className="font flex justify-center text-center text-sm font-semibold underline sm:text-base">
                Top Items By Payment
              </p>
              <ul className="flex flex-col items-center">
                {doctor.topProducts
                  .sort((a, b) => b.amount - a.amount)
                  .slice(0, 4)
                  .map((product, idx) => {
                    return (
                      <li
                        key={`${product.productName}-${idx}`}
                        className="text-center text-sm sm:text-base "
                      >
                        {formatProductName(product.productName)}:{" "}
                        {formatMoney(product.amount)}
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className="flex flex-col ">
              <p className="font flex justify-center text-center text-sm font-semibold underline sm:text-base">
                Largest Payments
              </p>
              <ul className="flex flex-col items-center">
                {doctor.payments
                  .sort((a, b) => b.amount - a.amount)
                  .slice(0, 4)
                  .map((product) => {
                    return (
                      <li
                        key={product.id}
                        className="text-center text-sm sm:text-base "
                      >
                        {typeof window != 'undefined' && window.screen.width > 1000 &&
                          `${formatProductName(product.productName)}:`}
                        {formatMoney(product.amount)}
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className="flex flex-col ">
              <p className="font flex justify-center text-center text-sm font-semibold underline sm:text-base">
                Top Transaction Items
              </p>
              <ul className="flex flex-col items-center">
                {doctor.topProducts
                  .sort((a, b) => b.count - a.count)
                  .slice(0, 5)
                  .map((product, idx) => {
                    return (
                      <li
                        key={`${product.productName}-${idx}`}
                        className="text-center text-sm sm:text-base "
                      >
                        {formatProductType(product.type)}:{" "}
                        {formatProductName(product.productName)} (
                        {product.count})
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>

          <div className="flex max-h-[350px] flex-col  sm:flex-row">
            <div className="sm:w-1/2">
              <BarChart
                title="Transactions"
                data={{
                  labels: topManufacturers.map((rec) => rec.manufacturerName),
                  datasets: [
                    {
                      label: "Number of Transactions",
                      backgroundColor: "#8D47FC",
                      borderWidth: 0,
                      data: topManufacturers.map((rec) => rec.count),
                    },
                  ],
                }}
              />
            </div>
            <div
              style={{
                maxHeight:
                  (typeof window != 'undefined' && window.screen.width > 640)
                    ? Math.ceil(screen.width * 0.24)
                    : undefined,
              }}
              className="flex max-h-[100%] flex-col overflow-scroll sm:w-1/2"
            >
              <p className="mt-2 flex justify-center text-base font-semibold">
                All Transaction Summaries
              </p>
              <div className="flex flex-col gap-2">
                {doctor.payments
                  .sort(
                    (a, b) =>
                      new Date(b.date).getTime() - new Date(a.date).getTime()
                  )
                  .map((payment, i) => (
                    <Transaction key={i} transaction={payment} />
                  ))}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <DoctorReviews doctorId={doctor.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;

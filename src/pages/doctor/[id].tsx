import { useState, useEffect } from "react";
import { DocDets } from "../../components/DocDets";
import ReviewForm from "../../components/ReviewForm";
import Reviews from "../../components/Reviews";
import {
  formatMoney,
  formatName,
  formatProductName,
  formatProductType,
  formatFullAddress
} from "../../utils";
import Transaction from "../../components/DocDets/Transaction";
import BarChart from "../../components/charts/bar";
import DoctorReviews from "../DoctorReviews";
import LocalMapEmbed from "../../components/LocalMapEmbed";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

const DoctorDetails = () => {
  const navigate = useRouter();
  const id = navigate.query.id as string;
  const [year, setYear] = useState<string>();
  const {
    data: doctor,
    isLoading: isDoctorLoading,
    refetch: doctorRefetch,
  } = trpc.db.doctor.useQuery(
    { id, year: year ? year + "" : "" },
    {
      keepPreviousData: true,
    }
  );
  const addReview = trpc.db.addReview.useMutation();

  const [reviewText, setReviewText] = useState("");
  const [reviewStars, setReviewStars] = useState(5);
  const [location, setLocation] = useState<any>(null);

  // THIS WILL FULL FORMAT THE PROVIDER ADDRESS PROPERTIES FOR GOOGLE MAPS CONSUMPTION
  const handleAddress = () => {
    if (doctor !== undefined) {
        const fullAddress = formatFullAddress(
          doctor?.addressLine1,
          doctor?.addressLine2,
          doctor?.city,
          doctor?.state,
          doctor?.zipCode
        )

      return fullAddress;
    }
  }

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    
    function success(pos: any) {
      const crd = pos.coords;

      if (location === null) {
        setLocation({
          longitude: crd.longitude,
          latitude: crd.latitude
        })
      }
    }
    
    function error(err: any) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    
    window.navigator.geolocation.getCurrentPosition(success, error, options);
  })

  const formattedAddress = doctor !== undefined && handleAddress()

  if (!doctor || isDoctorLoading) {
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
                  onClick={() => navigate.back()}
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

  const topManufacturers = doctor.topManufacturers
    .sort((a, b) => b.count - a.count)
    .slice(0, 9);

  return (
    <div className="bgColor">
      <div className="rounded bg-white p-5">
        <div className="flex flex-row">
          <div>
            <button
              onClick={() => navigate.back()}
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
          onChangeYear={(year) =>
            setYear((oldYear) => {
              if (!year) return undefined;
              if (oldYear === String(year)) return;
              return String(year);
            })
          }
        />
      {doctor.topProducts.length > 0 && (
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
                  .map((payment, idx) => {
                    return (
                      <li
                        key={`${payment.productName}-${idx}`}
                        className="text-center text-sm sm:text-base "
                      >
                        {formatProductName(payment.productName)}:{" "}
                        {formatMoney(payment.amount)}
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
                  .map(({ amount, id, productName }) => {
                    return (
                      <li
                        key={id}
                        className="text-center text-sm sm:text-base "
                      >
                        {typeof window != "undefined" &&
                          window.screen.width > 1000 &&
                          `${formatProductName(productName)}: ${formatMoney(amount)}`}
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
                  .slice(0, 4)
                  .map((product, idx) => {
                    return (
                      <li
                        key={`${product.productName}-${idx}`}
                        className="text-center text-sm sm:text-base "
                      >
                        {`${formatProductType(
                          product.type
                        )}: ${formatProductName(product.productName)} (${
                          product.count
                        })`}
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
                  typeof window != "undefined" && window.screen.width > 640
                    ? Math.ceil(screen.width * 0.24)
                    : undefined,
              }}
              className="flex max-h-[100%] flex-col overflow-scroll sm:w-1/2"
            >

  
            </div>
          </div>

          <div className="mt-8">
            <DoctorReviews doctor={doctor} doctorRefetch={doctorRefetch} />
            <div className="py-5 px-12">
              <div className="sm:px-2 lg:px-28">
                <LocalMapEmbed address={formattedAddress} origin={location} />
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default DoctorDetails;

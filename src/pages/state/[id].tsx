import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
// import { Link, useParams } from 'react-router-dom';
// import { useStateQuery } from '../../api';
import BarChart from "../../components/charts/bar";
import CountyHeatmap from "../../components/charts/CountyHeatmap";
import PieChart from "../../components/charts/pie";
import { StateDets } from "../../components/StateDets";
import { colorGradient, formatMoney } from "../../utils";
import { trpc } from "../../utils/trpc";

const StateDetails = () => {
  const id = useRouter().query.id as string;
  const [year, setYear] = useState<string>();
  const [drugType, setDrugType] = useState<string>();
  const { data: state, isLoading } = trpc.db.state.useQuery({
    id: id ? id : "NY",
  });

  // Loading Screen
  if (isLoading || !state) {
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
              <Link href="/">
                <button className="ease focus:shadow-outline select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none">
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
              </Link>

              <div className="flex w-11/12 justify-center">
                <div className="flex flex-col">
                  <p className="p-1 text-3xl font-semibold text-violet-700"></p>

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

  // console.log(state)

  const topManufacturers = state.topManufacturers
    .sort(
      (a: { totalAmount: number }, b: { totalAmount: number }) =>
        b.totalAmount - a.totalAmount
    )
    .slice(0, 10);

  const topItems = state.topItems
    .sort(
      (a: { totalAmount: number }, b: { totalAmount: number }) =>
        b.totalAmount - a.totalAmount
    )
    .slice(0, 10);

  return (
    <>
      <div className="bgColor">
        <div className="rounded bg-white p-5">
          <div className="flex flex-row">
            <Link href="/" legacyBehavior>
              <button className="ease focus:shadow-outline select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none">
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
            </Link>
          </div>

          <StateDets
            state={state}
            year={year}
            drugType={drugType}
            onChangeYear={(year) =>
              setYear((oldYear) => {
                if (!year) return undefined;
                if (oldYear === String(year)) return;

                return String(year);
              })
            }
            onChangeDrugType={setDrugType}
          />

          <div>
            <div className="flex flex-col sm:flex-row sm:px-2">
              <div className="inline-block align-middle sm:w-1/2">
                {/* <BarChart
                data={{
                    labels: [],
                    datasets: [],
                  }}
                title='bar chart'
                
                 /> */}
                <BarChart
                  title="Top Manufacturers"
                  data={{
                    labels: topManufacturers.map(
                      (rec) => rec.manufacturer.name
                    ),
                    datasets: [
                      {
                        label: "Total Amount",
                        backgroundColor: "#8D47FC",
                        borderWidth: 0,
                        data: topManufacturers.map(
                          (rec: { totalAmount: any }) => rec.totalAmount
                        ),
                      },
                    ],
                  }}
                  ticks={{
                    // Include a dollar sign in the ticks
                    callback: function (value, index, ticks) {
                      if (typeof value === "string") {
                        return value;
                      }
                      return formatMoney(value / 1000000, 0) + "M";
                    },
                  }}
                />
              </div>
              <div className="flex justify-center sm:w-1/2">
                <PieChart
                  title="Top Payments By Item"
                  data={{
                    labels: topItems.map(
                      (rec) => rec.product?.name ?? "UNKNOWN"
                    ),
                    datasets: [
                      {
                        label: "Total Amount",
                        // backgroundColor: '#8D47FC',
                        backgroundColor: topItems.map((_: any, idx: number) =>
                          colorGradient(idx)
                        ),
                        borderWidth: 0,
                        data: topItems.map(
                          (rec: { totalAmount: any }) => rec.totalAmount
                        ),
                      },
                    ],
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StateDetails;

import { capitalize } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import { formatName } from "../../utils";
// import './index.css';

// .buttonText {
//   color: white;
// }

interface ResultSchema {
  id: string;
  name: string | null;
  location: string | null;
  type: "doctor" | "manufacturer" | "drugs" | "device" | "hospital" | "clinical trials" | "diseases" | "genetics" | "food" ;
  link: string

}

const tableHeaders =
  typeof window != "undefined" && window.screen.width > 1000
    ? [{ title: "Type" }, { title: "Name" }, { title: "Location" }]
    : [{ title: "Name" }, { title: "Location" }];

function DetailsTable({ rows }: { rows: ResultSchema[] }) {
  const navigation = useRouter();
  return (
    <>
      <section className="py-4 text-gray-600 antialiased" x-data="app">
        <div className="flex flex-row">
          <div className="mx-auto max-h-[300px] overflow-scroll rounded-lg border border-gray-200 bg-white shadow-lg">
            <div className="overflow-x-auto p-3 ">
              <table className="w-full table-auto">
                <thead className="text-xs font-semibold uppercase text-gray-500">
                  <tr>
                    {tableHeaders.map((item, i) => (
                      <th key={i} className="p-2">
                        <div className="text-left text-sm font-semibold">
                          {item.title}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {rows.map((row, i) => (
                    <tr key={i}>
                      {/* {screen.width > 1000 && ( */}
                      {
                        <td className="p-2">
                          <div className="text-left text-base font-medium text-violet-700">
                            {capitalize(row.type)}
                          </div>
                        </td>
                      }
                      <td className="p-2">
                      <Link href={`${row.link}`}>                          <p className="text-left text-base font-medium text-violet-700 sm:underline lg:no-underline">
                            {formatName(row.name?row.name:'')}
                          </p>
                        </Link>
                      </td>
                      <td className="p-2">
                        <div className="text-left text-base font-medium text-violet-700">
                          {row.location?row.location:''}
                        </div>
                      </td>
                      {/* {screen.width > 1000 && ( */}
                      {
                        <td className="p-2">
                          <div className="flex justify-center">
                            <button
                              onClick={() =>
                                navigation.push(`${row.link}`)
                              }
                              className="buttonText ease m-2 rounded-md bg-violet-600 px-4 py-2 text-white transition duration-500 hover:bg-violet-700 active:bg-violet-800"
                            >
                              Open
                            </button>
                          </div>
                        </td>
                      }
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr
                style={{
                  height: "1px",
                  width: "100%",
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default DetailsTable;

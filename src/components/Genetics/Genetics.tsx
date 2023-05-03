import Link from "next/link";
import type { Genetic } from "./Genetic.model";

function mapOtherNames(other_names: any[]) {
    try {
        let otherNames = "";
        other_names.forEach((name: any) => {
            otherNames += name['_text'] + ", ";
        });
        return otherNames.slice(0, -2) || "";    
    } catch (error) {
        return "";
    }
}

function generateURL(url: string, type: string) {
    const urlSplit = url.split("/");
    const newURL = urlSplit[urlSplit.length - 1];
    return `/genetic/${type}?name=${newURL}`;
}

export default function GeneticsComponent({ data }: { data: Genetic[] }) {
  return (
    <>
      {data?.map((genetic: Genetic, index: number) => {
        return (
          <div
            key={index}
            className="mb-2 w-[100%] rounded-lg bg-white shadow-lg"
          >
            <div className="p-2">
              <div className="flex flex-row justify-between">
                <div className="flex-auto">
                  <h5 className="text-md mb-2 w-[75%] font-medium text-violet-700 underline">
                    <Link
                      href={generateURL(genetic.url, genetic.type)}
                    >
                      {genetic?.title || "-"}
                    </Link>
                  </h5>
                  <div className="flex w-[75%] flex-row justify-between">
                    <h5 className="text-xs mb-2 text-gray-500">
                        {mapOtherNames(genetic.other_names)}
                    </h5>
                    <p className="mb-1 text-base text-gray-700"> </p>
                  </div>
                  <div className="flex flex-row justify-between text-sm">
                    <p className="mb-1 text-xs text-violet-400">
                      Category: {genetic.type[0]?.toUpperCase() + genetic?.type.slice(1) || "-"}
                    </p>
                    <div className="border-gray-300 text-gray-600"></div>
                  </div>
                </div>
                <div className="w-[25%]">
                  <div className="flex flex-col">
                    <p className="mb-1 text-right text-sm text-gray-600">
                      <br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

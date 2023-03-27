import Link from "next/link";

export default function HealthPlansComponent({ plans }: any) {
  return (
    <>
      {plans?.map((plan: any, index: number) => {
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
                        href={`/healthplans/${plan?.id || ""}`}
                      >
                    {plan?.name || "-"}
                    </Link>
                  </h5>
                  <div className="flex w-[75%] flex-row justify-between">
                    <h5 className="text-md mb-2 text-gray-900">
                      {`${plan?.id || "-"}`}
                    </h5>
                    <p className="mb-1 text-base text-gray-700"> </p>
                  </div>
                  <div className="flex flex-row justify-between text-sm">
                    <p className="mb-1 text-xs text-violet-400">
                      Issuer: {plan?.issuer?.name || "-"}
                    </p>
                    <div className="border-gray-300 text-gray-600"></div>
                  </div>
                </div>
                <div className="w-[25%]">
                  <div className="flex flex-col">
                    <p className="mb-1 text-right text-sm text-gray-600">
                      State: {plan?.state || "-"}
                      <br />
                    </p>
                    <p className="mb-1 text-right text-sm text-gray-600">
                      Premium: {plan?.premium || "-"}
                      <br />
                    </p>
                    <p className="mb-1 text-right text-sm text-gray-600">
                      Market: {plan?.market || "-"}
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

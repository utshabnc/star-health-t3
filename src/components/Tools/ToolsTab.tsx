import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Tab } from "../../utils/Enums/Tab.enum";

const ToolsTab = ({
  items,
  header,
  boxStyle,
  itemTextSpacing = false,
  textColor,
  textSize = "sm:text-5xl",
}: {
  items: {
    label: string | string[];
    img?: StaticImageData;
    route?: string;
    linkparam?: string;
    count?: string;
  }[];
  header?: string;
  boxStyle?: string;
  textColor?: string;
  textSize?: string;
  itemTextSpacing?: boolean;
}) => {
  return (
    <div
      className={`flex flex-col py-4 pb-24 ${
        boxStyle == null ? "bg-[#0e1936]" : boxStyle
      }`}
    >
      {header && (
        <p
          className={`text-md flex justify-center text-center font-semibold ${textSize} pb-20 ${
            "text-" + textColor ?? "text-violet-700"
          } my-2 mb-4 mt-8`}
        >
          {header}
        </p>
      )}

      <div className="w-3/4 flex mx-auto flex-wrap  gap-1">
        {items.map((item, i) => (
          // <div key={i} className='relative w-full gap-4 rounded-md bg-white px-6 py-12'>
          <div
            className={`relative m-5 space-y-5 flex w-full flex-col items-center rounded-[6px] rounded-md border-[1.5px] border-bordercolor bg-white px-6 py-8 shadow-md  h-full p-1 sm:w-[27%] sm:p-3 md:w-[25.5%] xl:w-[21%] ${
              boxStyle ? "" : "rounded-lg bg-[#0e1936] "
            } h-[10.8rem]
                p-1 sm:w-[27%] sm:p-3 md:w-[25.5%] xl:w-[21%] hover:bg-gray-200`}
            key={i}
          >
            {item.img && (
              <>
                {(  <a
                    onClick={() => {
                      if (item?.linkparam) {
                        localStorage.setItem(
                          "curDirTab",
                          JSON.stringify({
                            tab: Tab[item?.linkparam as Tab],
                            subject: item?.linkparam?.toLowerCase(),
                          })
                        );
                      }
                    }}
                  >
                    <Link
                      href={{
                        pathname: item.route || "/directory",
                        query: { tab: item.linkparam },
                      }}
                    >
                      <Image
                        src={item.img}
                        alt={
                          typeof item.label === "string"
                            ? item.label
                            : item.label.join(" ")
                        }
                        className=""
                        style={{
                          height: 100,
                          width: 185,
                          objectFit: "contain",
                        }}
                      />
                    </Link>
                  </a>
                )}
              </>
            )}
            {(
              <a
                onClick={() => {
                  if (item?.linkparam) {
                    localStorage.setItem(
                      "curDirTab",
                      JSON.stringify({
                        tab: Tab[item?.linkparam as Tab],
                        subject: item?.linkparam?.toLowerCase(),
                      })
                    );
                  }
                }}
              >
                <Link
                  href={{
                    pathname: item.linkparam != "" ? "/directory" : "/",
                    query: { tab: item.linkparam },
                  }}
                >
                  <div className="group absolute bottom-0 translate-x-[-2rem] translate-y-[2rem]">
                    {/* <IoIosArrowDroprightCircle color="#0e1936" size={50} /> */}
                  </div>
                </Link>
              </a>)}

            {
              item.label && (
                <p
                  className={`justify-center py-5 text-center text-xs font-semibold capitalize lg:text-lg ${
                    "text-" + textColor ?? "text-violet-700"
                  }          ${itemTextSpacing && "mt-0"}`}
                >
                  {typeof item.label === "string"
                    ? item.label
                    : item.label.map((line, idx) => <p key={idx}>{line}</p>)}
                </p>
              )
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolsTab;

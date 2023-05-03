import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ExpansionPanel from "../../../components/ExpansionPanel";
import LoadingStarHealth from "../../../components/Loading";
import type { GeneticData } from "../../../components/Genetics/GeneticData.model";
import parse from "html-react-parser";

function upperCaseAllWords(name: string) {
  const words = name.split(" ");
  const upperCasedWords = words.map((word: string) => {
    return word[0]?.toUpperCase() + word.slice(1);
  });
  return upperCasedWords.join(" ");
}

function geneDescription(geneData: GeneticData) {
  try {
    const description = geneData["text-list"].find((text: any) => {
      return text["text"]["text-role"] === "function";
    })["text"]["html"];
    return description.replaceAll("</p><p>", "</p><br/><p>");
  } catch (error) {
    console.log(error);
    return "";
  }
}

function geneInheritancePatternList(geneData: GeneticData) {
  try {
    const inheritancePatternList = geneData["inheritance-pattern-list"].map(
      (inheritancePattern: any) => {
        return inheritancePattern["inheritance-pattern"];
      }
    );
    return (
      <div>
        {inheritancePatternList.map(
          (inheritancePattern: any, index: number) => {
            return (
              <div key={index} className="flex flex-row">
                <p className="text-md mb-1 text-gray-700">
                  {"• " + upperCaseAllWords(inheritancePattern.memo)}
                </p>
              </div>
            );
          }
        )}
      </div>
    );
  } catch (error) {
    console.log(error);
    return <></>;
  }
}

function geneSynonyms(geneData: GeneticData) {
  try {
    let synonyms = geneData["synonym-list"];
    if (!Array.isArray(synonyms)) {
      synonyms = [synonyms];
    }
    synonyms = synonyms.map((synonym: any) => {
      return synonym["synonym"];
    });

    return (
      <div>
        {synonyms.map((synonym: any, index: number) => {
          return (
            <div key={index} className="flex flex-row">
              <p className="text-md my-1 text-gray-700">{"• " + synonym}</p>
            </div>
          );
        })}
      </div>
    );
  } catch (error) {
    console.log(error);
    return <></>;
  }
}

function geneRelatedConditions(geneData: GeneticData) {
  try {
    let relatedConditions = geneData["related-health-condition-list"];
    if (!Array.isArray(relatedConditions)) {
      relatedConditions = [relatedConditions];
    }
    relatedConditions = relatedConditions.map((relatedCondition: any) => {
      return {
        condition: relatedCondition["related-health-condition"]["name"],
        url: relatedCondition["related-health-condition"]["ghr-page"],
      };
    });

    return (
      <div>
        {relatedConditions.map((gene: any, index: number) => {
          const urlSplit = gene.url.split("/");
          const url = urlSplit[urlSplit.length - 1];
          const type = urlSplit[urlSplit.length - 2];
          const medline = urlSplit[2] === "medlineplus.gov";

          // For now, only showing medlineplus.gov links - we need to add alternate data sources later.
          if (medline) {
            return (
              <div key={index} className="flex flex-row">
                <a
                  href={`/genetic/${type}?name=${url}`}
                  className="text-md mb-1 text-violet-700 underline"
                >
                  {upperCaseAllWords(gene.condition)}
                </a>
              </div>
            );
          }
        })}
      </div>
    );
  } catch (error) {
    console.log(error);
    return [];
  }
}

const GeneDetails = () => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [geneData, setGeneData] = useState<GeneticData>({} as GeneticData);
  const navigate = useRouter();
  const geneName = navigate.query.name as string;

  useEffect(() => {
    if (geneName) {
      setIsProcessing(true);
      const fetchGeneData = async (geneName: string) => {
        try {
          const response = await fetch(`/api/genetics/gene/${geneName}`);
          const data = await response.json();
          setGeneData(data["gene"]);
        } catch (error) {
          console.log(error);
        } finally {
          setIsProcessing(false);
        }
      };
      fetchGeneData(geneName);
    }
  }, [geneName]);

  return geneData && isProcessing ? (
    <LoadingStarHealth />
  ) : (
    <>
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
          <div className="flex flex-col justify-end sm:px-2 lg:px-28">
            <p className="text-2xl font-semibold text-violet-700">
              {geneData["gene-symbol"]
                ? geneData["gene-symbol"].toLocaleUpperCase()
                : ""}
            </p>
            <p className="flex flex-row text-lg font-semibold">
              {geneData["name"] ? upperCaseAllWords(geneData["name"]) : ""}
            </p>
            <p className="text-purp-5 pt-1 text-violet-700 sm:text-xs">
              Reviewed: {geneData.reviewed ? geneData.reviewed : "-"}
            </p>
            <p className="text-purp-5 pt-1 text-violet-700 sm:text-xs">
              Published: {geneData.published ? geneData.published : "-"}
            </p>
            <div className="my-1">
              <hr />
            </div>
            <div className="flex flex-col">
              {geneData["text-list"] ? (
                <ExpansionPanel
                  key={"description"}
                  title={"Description"}
                  content={parse(geneDescription(geneData)) as any}
                />
              ) : (
                <></>
              )}
              {geneData["related-health-condition-list"] ? (
                <ExpansionPanel
                  key={"related-health-condition"}
                  title={"Related Conditions"}
                  content={geneRelatedConditions(geneData) as any}
                />
              ) : (
                <></>
              )}
              {geneData["inheritance-pattern-list"] ? (
                <ExpansionPanel
                  key={"inheritance-pattern"}
                  title={"Inheritance"}
                  content={geneInheritancePatternList(geneData) as any}
                />
              ) : (
                <></>
              )}
              {geneData["synonym-list"] ? (
                <ExpansionPanel
                  key={"synonyms"}
                  title={"Other Names for this Gene"}
                  content={geneSynonyms(geneData) as any}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneDetails;

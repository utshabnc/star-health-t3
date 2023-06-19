import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ExpansionPanel from "../../../components/ExpansionPanel";
import LoadingStarHealth from "../../../components/Loading";
import type { GeneticData } from "../../../components/Genetics/GeneticData.model";
import parse from "html-react-parser";
import Citation from "../../../components/Citation";

function upperCaseAllWords(name: string) {
  const words = name.split(" ");
  const upperCasedWords = words.map((word: string) => {
    return word[0]?.toUpperCase() + word.slice(1);
  });
  return upperCasedWords.join(" ");
}

function conditionDescription(conditionData: GeneticData) {
  try {
    const description = conditionData["text-list"].find((text: any) => {
      return text["text"]["text-role"] === "description";
    })["text"]["html"];
    return description.replaceAll('</p><p>', '</p><br/><p>');
  } catch (error) {
    console.log(error);
    return "";
  }
}

function conditionInheritancePatternList(conditionData: GeneticData) {
  try {

    let inheritancePatternList = conditionData["inheritance-pattern-list"];
    if (!Array.isArray(inheritancePatternList)) {
      inheritancePatternList = [inheritancePatternList];
    }
    inheritancePatternList = inheritancePatternList.map((inheritancePattern: any) => {
      return inheritancePattern["inheritance-pattern"];
    });

    return (
      <div>
        {inheritancePatternList.map(
          (inheritancePattern: any, index: number) => {
            return (
              <div key={index} className="flex flex-row">
                <p className="text-md my-1 text-gray-700">
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

function conditionSynonyms(conditionData: GeneticData) {
  try {
    let synonyms = conditionData["synonym-list"];
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

function conditionRelatedGenes(conditionData: GeneticData) {
  try {

    let relatedGenes = conditionData["related-gene-list"];
    if (!Array.isArray(relatedGenes)) {
      relatedGenes = [relatedGenes];
    }
    relatedGenes = relatedGenes.map((gene: any) => {
      return {
        gene: gene["related-gene"]["gene-symbol"],
        url: gene["related-gene"]["ghr-page"],
      };
    });

    return (
      <div>
        {relatedGenes.map((gene: any, index: number) => {
          const urlSplit = gene.url.split("/");
          const type = urlSplit[urlSplit.length - 2];
          const url = type === "gene" ? gene.gene.toLowerCase() : urlSplit[urlSplit.length - 1];

          // For now, only showing medlineplus.gov links - we need to add alternate data sources later.
          const medline = urlSplit[2] === "medlineplus.gov";
          if (medline) {
            return (
              <div key={index} className="flex flex-row">
                <a
                  href={`/genetic/${type}?name=${url}`}
                  className="my-1 text-md text-violet-700 underline"
                >
                  {upperCaseAllWords(gene.gene)}
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

const ConditionDetails = () => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [conditionData, setConditionData] = useState<GeneticData>(
    {} as GeneticData
  );
  const navigate = useRouter();
  const conditionName = navigate.query.name as string;

  useEffect(() => {
    if (conditionName) {
      setIsProcessing(true);
      const fetchConditionData = async (conditionName: string) => {
        try {
          const response = await fetch(
            `/api/genetics/condition/${conditionName}`
          );
          const data = await response.json();
          setConditionData(data["condition"]);
        } catch (error) {
          console.log(error);
        } finally {
          setIsProcessing(false);
        }
      };
      fetchConditionData(conditionName);
    }
  }, [conditionName]);

  return conditionData && isProcessing ? (
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
            <div className="flex flex-row justify-between	items-start">
              <div>
                <p className="text-2xl font-semibold text-violet-700">
                  {conditionData.name ? upperCaseAllWords(conditionData.name) : ""}
                </p>
                <p className="text-purp-5 pt-1 text-violet-700 sm:text-xs">
                  Reviewed: {conditionData.reviewed ? conditionData.reviewed : "-"}
                </p>
                <p className="text-purp-5 pt-1 text-violet-700 sm:text-xs">
                  Published:{" "}
                  {conditionData.published ? conditionData.published : "-"}
                </p>
              </div>
              <Citation title={conditionData.name ? upperCaseAllWords(conditionData.name) : ""} />
            </div>
            <div className="my-1">
              <hr />
            </div>
            <div className="flex flex-col">
              {conditionData["text-list"] ? (
                <ExpansionPanel
                  key={"description"}
                  title={"Description"}
                  content={parse(conditionDescription(conditionData)) as any}
                />
              ) : (
                <></>
              )}
              {conditionData["related-gene-list"] ? (
                <ExpansionPanel
                  key={"related-genes"}
                  title={"Related Genes and Chromosomes"}
                  content={conditionRelatedGenes(conditionData) as any}
                />
              ) : (
                <></>
              )}
              {conditionData["inheritance-pattern-list"] ? (
                <ExpansionPanel
                  key={"inheritance-pattern"}
                  title={"Inheritance"}
                  content={
                    conditionInheritancePatternList(conditionData) as any
                  }
                />
              ) : (
                <></>
              )}
              {conditionData["synonym-list"] ? (
                <ExpansionPanel
                  key={"synonyms"}
                  title={"Other Names for this Condition"}
                  content={conditionSynonyms(conditionData) as any}
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

export default ConditionDetails;

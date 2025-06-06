import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ExpansionPanel from "../../../components/ExpansionPanel";
import LoadingStarHealth from "../../../components/Loading";
import type { ChromosomeData } from "../../../components/Genetics/GeneticData.model";
import parse from "html-react-parser";
import Citation from "../../../components/Citation";
import BookmarkButton from "../../../components/BookmarkButton";
import { DataDirectoryCategory } from "../../../utils/Enums/DataDirectoryCategory.enum";

function upperCaseAllWords(name: string) {
  const words = name.split(" ");
  const upperCasedWords = words.map((word: string) => {
    return word[0]?.toUpperCase() + word.slice(1);
  });
  return upperCasedWords.join(" ");
}

function chromosomeDescription(chromosomeData: ChromosomeData) {
  try {
    const paragraphs = chromosomeData['text-list']['text']['html']['html:p'];
    if (!Array.isArray(paragraphs)) {
      return '';
    }
    let finalString = '<p>';
    finalString += paragraphs.map((paragraph) => paragraph['_text']).join('</p><br/><p>');
    finalString += '</p>';
    return (finalString);
  } catch (error) {
    const description = chromosomeData["text-list"].find((text: any) => {
      return text["text"]["text-role"] === "description";
    })["text"]["html"];
    return description.replaceAll("</p><p>", "</p><br/><p>");
  }
}

function chromosomeRelatedConditions(chromosomeData: ChromosomeData) {
  try {
    let relatedConditions = chromosomeData["related-health-condition-list"]["related-health-condition"];
    if (!Array.isArray(relatedConditions)) {
      relatedConditions = [relatedConditions];
    }
    relatedConditions = relatedConditions.map((condition: any) => {
      return {
        condition: condition["name"]["_text"],
        url: condition["ghr-page"]["_text"],
      };
    });
    return (
      <div>
        {relatedConditions.map((chromosome: any, index: number) => {
          const urlSplit = chromosome.url.split("/");
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
                  {upperCaseAllWords(chromosome.condition)}
                </a>
              </div>
            );
          }
        })}
      </div>
    );
  } catch (error) {
    let relatedConditions = chromosomeData["related-health-condition-list"];
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
  }
}

const ChromosomeDetails = () => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [chromosomeData, setChromosomeData] = useState<ChromosomeData>(
    {} as ChromosomeData
  );
  const navigate = useRouter();
  const chromosomeName = navigate.query.name as string;

  useEffect(() => {
    if (chromosomeName) {
      setIsProcessing(true);
      const fetchChromosomeData = async (chromosomeName: string) => {
        try {
          const response = await fetch(
            `/api/genetics/chromosome/${chromosomeName}`
          );
          const data = await response.json();
          if ('chromosome-summary' in data['chromosome']) {
            setChromosomeData(data["chromosome"]["chromosome-summary"]);
          } else {
            setChromosomeData(data["chromosome"]);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsProcessing(false);
        }
      };
      fetchChromosomeData(chromosomeName);
    }
  }, [chromosomeName]);

  return chromosomeData && isProcessing ? (
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
                  {chromosomeData.name
                    ? upperCaseAllWords(chromosomeData.name["_text"] ? chromosomeData.name["_text"] : chromosomeData.name)
                    : ""}
                </p>
                <p className="text-purp-5 pt-1 text-violet-700 sm:text-xs">
                  Reviewed:{" "}
                  {chromosomeData.reviewed ? chromosomeData.reviewed["_text"] ? chromosomeData.reviewed["_text"] : chromosomeData.reviewed : "-"}
                </p>
                <p className="text-purp-5 pt-1 text-violet-700 sm:text-xs">
                  Published:{" "}
                  {chromosomeData.published ? chromosomeData.published["_text"] ? chromosomeData.published["_text"] : chromosomeData.published : "-"}
                </p>
              </div>
              <div className="flex justify-end min-w-[375px]">
                <Citation title={chromosomeData.name
                  ? upperCaseAllWords(chromosomeData.name["_text"] ? chromosomeData.name["_text"] : chromosomeData.name)
                  : ""} />
                <div className="ml-1">
                  <BookmarkButton title={chromosomeData.name
                    ? upperCaseAllWords(chromosomeData.name["_text"] ? chromosomeData.name["_text"] : chromosomeData.name)
                    : ""} categoryId={DataDirectoryCategory.Genetics} />
                </div>
              </div>
            </div>
            <div className="my-1">
              <hr />
            </div>
            <div className="flex flex-col">
              {chromosomeData["text-list"] ? (
                <ExpansionPanel
                  key={"description"}
                  title={"Description"}
                  content={parse(chromosomeDescription(chromosomeData)) as any}
                />
              ) : (
                <></>
              )}
              {chromosomeData["related-health-condition-list"] ? (
                <div>
                  <ExpansionPanel
                    key={"related-condition"}
                    title={"Related Conditions"}
                    content={chromosomeRelatedConditions(chromosomeData) as any}
                  />
                </div>
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

export default ChromosomeDetails;

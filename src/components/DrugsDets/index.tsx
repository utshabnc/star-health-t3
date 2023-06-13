import { formatDate, formatName } from "../../utils";
import type { DrugResponse } from "../../server/trpc/router/db";
import { useState } from "react";
import ExpansionPanel from "../ExpansionPanel";
import parse from "html-react-parser";

interface DrugSchema {
  data: DrugResponse;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function cleanDescription(description: string) {
  if (!description) return null;
  if (!description[0]) return null;
  let descriptionWithoutPrefix = description[0].replace("11 DESCRIPTION", "");
  if (descriptionWithoutPrefix.startsWith("DESCRIPTION")) {
    descriptionWithoutPrefix = descriptionWithoutPrefix.replace(
      "DESCRIPTION",
      ""
    );
  }
  const sentences = descriptionWithoutPrefix
    .split(".")
    .filter((sentence) => sentence.length > 0);
  const sentencesGroupedInThree: string[] = [];
  let currSentenceGroup = "";
  sentences.forEach((sentence, index) => {
    const wordSplit = sentence.split(" ");
    if (wordSplit.length > 7 && sentence[-1] != ":") {
      currSentenceGroup += sentence + ".";
    }
    if (index % 3 === 0 && index !== 0) {
      sentencesGroupedInThree.push(currSentenceGroup);
      currSentenceGroup = "";
    }
  });
  return (
    <div>
      {sentencesGroupedInThree.map((sentence, index) => {
        return (
          <p key={index} className="text-purp-2">
            {sentence}
          </p>
        );
      })}
    </div>
  );
}

function cleanAdverseReactions(reaction: string, reaction_table: any[]) {
  if (!reaction) return null;
  if (!reaction[0]) return null;
  let reactionWithoutPrefix = reaction[0].replace("6 ADVERSE REACTIONS ", "");
  if (reactionWithoutPrefix.startsWith("ADVERSE REACTIONS")) {
    reactionWithoutPrefix = reactionWithoutPrefix.replace(
      "ADVERSE REACTIONS",
      ""
    );
  }
  const shortenedReaction = reactionWithoutPrefix.split("( 6.1 )")[0];
  return (
    <div>
      <p className="text-purp-2">{shortenedReaction}</p>
      {reaction_table && (
        <div className="mt-8">
          {parse(reaction_table[0].replace(/Table [0-9]+\. /g, ""))}
        </div>
      )}
    </div>
  );
}

function cleanClinicalStudies(studies: string, studies_table: any[]) {
  if (!studies) return null;
  if (!studies[0]) return null;
  let studiesWithoutPrefix = studies[0].replace("14 CLINICAL STUDIES ", "");
  if (studiesWithoutPrefix.startsWith("CLINICAL STUDIES")) {
    studiesWithoutPrefix = studiesWithoutPrefix.replace("CLINICAL STUDIES", "");
  }
  if (studiesWithoutPrefix.startsWith("CLINICAL TRIALS ")) {
    studiesWithoutPrefix = studiesWithoutPrefix.replace("CLINICAL TRIALS ", "");
  }
  let shortenedStudies = studiesWithoutPrefix.split("( 14.1 )")[0];
  if (shortenedStudies?.startsWith("14.1")) {
    shortenedStudies = "";
  }
  if (shortenedStudies?.length && shortenedStudies?.length > 800) {
    shortenedStudies = shortenedStudies?.slice(0, 800) + "...";
  }
  return (
    <div>
      <p className="text-purp-2">{shortenedStudies}</p>
      {studies_table && (
        <div className="mt-8">
          {parse(studies_table[0].replace(/Table [0-9]+\. /g, ""))}
        </div>
      )}
    </div>
  );
}

function cleanDosage(dosage: string, dosage_table: any[]): JSX.Element | null {
  if (!dosage) return null;
  if (!dosage[0]) return null;
  let dosageWithoutPrefix = dosage[0].replace(
    "2 DOSAGE AND ADMINISTRATION ",
    ""
  );
  if (dosageWithoutPrefix.startsWith("DOSAGE & ADMINISTRATION")) {
    dosageWithoutPrefix = dosageWithoutPrefix.replace(
      "DOSAGE & ADMINISTRATION",
      ""
    );
  }
  if (dosageWithoutPrefix.startsWith("DOSAGE AND ADMINISTRATION ")) {
    dosageWithoutPrefix = dosageWithoutPrefix.replace(
      "DOSAGE AND ADMINISTRATION ",
      ""
    );
  }
  if (dosageWithoutPrefix.startsWith("Dosage and Administration: ")) {
    dosageWithoutPrefix = dosageWithoutPrefix.replace(
      "Dosage and Administration: ",
      ""
    );
  }
  if (dosageWithoutPrefix.startsWith("Directions ")) {
    dosageWithoutPrefix = dosageWithoutPrefix.replace("Directions ", "");
  }
  let shortenedDosage = dosageWithoutPrefix.split("( 2.1 )")[0] || "";
  if (shortenedDosage === "" || !shortenedDosage) {
    return null;
  } else if (shortenedDosage && shortenedDosage[0]) {
    shortenedDosage =
      (shortenedDosage[0] ?? "").toUpperCase() + shortenedDosage.slice(1);
    const findNumeralSteps = shortenedDosage.match(/[0-9]+\. /g);
    if (
      findNumeralSteps &&
      findNumeralSteps.length > 0 &&
      findNumeralSteps[0] == "1. "
    ) {
      const htmlString = formatString(shortenedDosage);
      return (
        <div>
          {parse(htmlString)}
          {dosage_table && (
            <div className="mt-8">
              {parse(dosage_table[0].replace(/Table [0-9]+\. /g, ""))}
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div>
          <p className="text-purp-2">{shortenedDosage}</p>
          {dosage_table && (
            <div className="mt-8">
              {parse(dosage_table[0].replace(/Table [0-9]+\. /g, ""))}
            </div>
          )}
        </div>
      );
    }
  }
  return null;
}

function cleanPurpose(purpose: string) {
  if (!purpose) return null;
  if (!purpose[0]) return null;
  let purposeWithoutPrefix = purpose[0].replace("1 INDICATIONS AND USAGE ", "");
  if (purposeWithoutPrefix.startsWith("INDICATIONS & USAGE")) {
    purposeWithoutPrefix = purposeWithoutPrefix.replace(
      "INDICATIONS & USAGE",
      ""
    );
  }
  if (purposeWithoutPrefix.startsWith("INDICATIONS AND USAGE ")) {
    purposeWithoutPrefix = purposeWithoutPrefix.replace(
      "INDICATIONS AND USAGE ",
      ""
    );
  }
  if (purposeWithoutPrefix.startsWith("Indications and Usage: ")) {
    purposeWithoutPrefix = purposeWithoutPrefix.replace(
      "Indications and Usage: ",
      ""
    );
  }
  if (purposeWithoutPrefix.startsWith("Purpose ")) {
    purposeWithoutPrefix = purposeWithoutPrefix.replace("Purpose ", "");
  }
  if (purposeWithoutPrefix.startsWith("PURPOSE ")) {
    purposeWithoutPrefix = purposeWithoutPrefix.replace("PURPOSE ", "");
  }
  const shortenedPurpose = purposeWithoutPrefix.split("( 1.1 )")[0];
  return (
    <div>
      <p className="text-purp-2">{shortenedPurpose}</p>
    </div>
  );
}

function cleanOverdosage(overdosage: string) {
  if (!overdosage) return null;
  if (!overdosage[0]) return null;
  let overdosageWithoutPrefix = overdosage[0].replace("10 OVERDOSAGE ", "");
  if (overdosageWithoutPrefix.startsWith("OVERDOSAGE ")) {
    overdosageWithoutPrefix = overdosageWithoutPrefix.replace(
      "OVERDOSAGE ",
      ""
    );
  }
  const shortenedOverdosage = overdosageWithoutPrefix.split("( 10.1 )")[0];
  return (
    <div>
      <p className="text-purp-2">{shortenedOverdosage}</p>
    </div>
  );
}

function cleanInteraction(interaction: string) {
  if (!interaction) return null;
  if (!interaction[0]) return null;
  let interactionWithoutPrefix = interaction[0].replace(
    "7 DRUG INTERACTIONS ",
    ""
  );
  if (interactionWithoutPrefix.startsWith("DRUG INTERACTIONS")) {
    interactionWithoutPrefix = interactionWithoutPrefix.replace(
      "DRUG INTERACTIONS",
      ""
    );
  }
  const shortenedInteraction = interactionWithoutPrefix.split("( 7.1 )")[0];
  return (
    <div>
      <p className="text-purp-2">{shortenedInteraction}</p>
    </div>
  );
}

function formatString(str: string) {
  const paragraphs = str.split(".");
  let htmlString = "<p>";
  for (let i = 0; i < paragraphs.length; i++) {
    let paragraph = paragraphs[i]?.trim();
    let nextParagraph = paragraphs[i + 1]?.trim();
    if (paragraph?.length === 0) {
      continue;
    }
    if (paragraph?.endsWith("1")) {
      if (paragraph.slice(0, -2).trim().length === 0) {
        htmlString += "</p><p>";
      } else {
        htmlString += `</p><br/><p>${paragraph.slice(0, -2)}:</p>`;
      }
      let currNum = 1;
      htmlString += "<ol>\n" + `<li>${currNum}. `;
      let currCounter = 1;
      while (
        !nextParagraph?.endsWith("1") &&
        nextParagraph !== undefined &&
        nextParagraph !== null &&
        nextParagraph?.length !== 0
      ) {
        paragraph = paragraphs[i + currCounter]?.trim();
        nextParagraph = paragraphs[i + currCounter + 1]?.trim();
        if (paragraph === undefined || paragraph === null) {
          break;
        }

        if (paragraph?.length === 0) {
          if (nextParagraph?.length === 0) {
            break;
          }
          currCounter += 1;
          continue;
        }

        if (paragraph?.length === 1 && !isNaN(parseInt(paragraph))) {
          currNum = parseInt(paragraph);
          htmlString += `</li>\n<li>${currNum}. `;
          currCounter += 1;
          continue;
        }

        htmlString += `${paragraph}. `;
        currCounter += 1;
      }
      htmlString += "</li></ol>\n";
      i += currCounter - 1;
    } else {
      htmlString += `${paragraph}. `;
    }
  }
  return htmlString;
}

function cleanInstructions(instructions: string) {
  if (!instructions) return null;
  if (!instructions[0]) return null;
  const instructionsWithoutPrefix = instructions[0].replace(
    "INSTRUCTIONS FOR USE ",
    ""
  );
  const findNumeralSteps = instructionsWithoutPrefix.match(/[0-9]+\. /g);
  if (
    findNumeralSteps &&
    findNumeralSteps.length > 0 &&
    findNumeralSteps[0] == "1. "
  ) {
    const htmlString = formatString(instructionsWithoutPrefix);
    return <div>{parse(htmlString)}</div>;
  } else {
    return (
      <div>
        <p className="text-purp-2">{instructionsWithoutPrefix}</p>
      </div>
    );
  }
}

function cleanWarnings(
  warnings: string,
  ask_doctor: string,
  ask_doctor_pharmacist: string,
  children: string,
  pregnant: string,
  precautions: string
) {
  console.log(precautions);
  if (!warnings) return null;
  if (!warnings[0]) return null;
  let warningsWithoutPrefix = warnings[0].replace(
    "5 WARNINGS AND PRECAUTIONS ",
    ""
  );
  if (warningsWithoutPrefix.startsWith("WARNINGS & PRECAUTIONS ")) {
    warningsWithoutPrefix = warningsWithoutPrefix.replace(
      "WARNINGS & PRECAUTIONS ",
      ""
    );
  }
  if (warningsWithoutPrefix.startsWith("WARNINGS ")) {
    warningsWithoutPrefix = warningsWithoutPrefix.replace("WARNINGS ", "");
  }
  if (warningsWithoutPrefix.startsWith("Warnings ")) {
    warningsWithoutPrefix = warningsWithoutPrefix.replace("Warnings ", "");
  }
  if (warningsWithoutPrefix.startsWith("Warnings: ")) {
    warningsWithoutPrefix = warningsWithoutPrefix.replace("Warnings: ", "");
  }
  let shortenedWarnings = warningsWithoutPrefix.split("( 5.1 )")[0];
  if (shortenedWarnings === warningsWithoutPrefix) {
    shortenedWarnings = warningsWithoutPrefix.split("( 5.2 )")[0];
  }
  try {
    return (
      <div>
        {children && (
          <p className="text-purp-5 text-red-700 sm:text-sm">{children}</p>
        )}
        {ask_doctor && (
          <p className="text-purp-5 text-red-700 sm:text-sm">{ask_doctor}</p>
        )}
        {ask_doctor_pharmacist && (
          <p className="text-purp-5 text-red-700 sm:text-sm">
            {ask_doctor_pharmacist}
          </p>
        )}
        {pregnant && (
          <p className="text-purp-5 text-red-700 sm:text-sm">{pregnant}</p>
        )}
        {precautions && (
          <p className="text-purp-5 text-red-700 sm:text-sm">
            {precautions.replace("PRECAUTIONS General ", "")}
          </p>
        )}
        <p className="text-purp-2 pt-1">{shortenedWarnings}</p>
      </div>
    );
  } catch (e) {
    return <></>;
  }
}

function cleanIngredients(
  activeIngredients: string,
  inactiveIngredients: string
) {
  if (!activeIngredients && !inactiveIngredients) return null;
  const active = activeIngredients
    ? activeIngredients[0]
      ? activeIngredients[0]
      : ""
    : "";
  const inactive = inactiveIngredients
    ? inactiveIngredients[0]
      ? inactiveIngredients[0]
      : ""
    : "";
  let activeIngredientsWithoutPrefix = active.replace(
    "1 ACTIVE INGREDIENT ",
    ""
  );
  if (activeIngredientsWithoutPrefix.startsWith("ACTIVE INGREDIENT ")) {
    activeIngredientsWithoutPrefix = activeIngredientsWithoutPrefix.replace(
      "ACTIVE INGREDIENT ",
      ""
    );
  }
  if (activeIngredientsWithoutPrefix.startsWith("Active Ingredients ")) {
    activeIngredientsWithoutPrefix = activeIngredientsWithoutPrefix.replace(
      "Active Ingredients ",
      ""
    );
  }
  if (activeIngredientsWithoutPrefix.startsWith("Active ingredients ")) {
    activeIngredientsWithoutPrefix = activeIngredientsWithoutPrefix.replace(
      "Active ingredients ",
      ""
    );
  }
  let inactiveIngredientsWithoutPrefix = inactive.replace(
    "2 INACTIVE INGREDIENT ",
    ""
  );
  if (inactiveIngredientsWithoutPrefix.startsWith("INACTIVE INGREDIENT ")) {
    inactiveIngredientsWithoutPrefix = inactiveIngredientsWithoutPrefix.replace(
      "INACTIVE INGREDIENT ",
      ""
    );
  }
  if (inactiveIngredientsWithoutPrefix.startsWith("Inactive Ingredients ")) {
    inactiveIngredientsWithoutPrefix = inactiveIngredientsWithoutPrefix.replace(
      "Inactive Ingredients ",
      ""
    );
  }
  if (inactiveIngredientsWithoutPrefix.startsWith("Inactive Ingredients:")) {
    inactiveIngredientsWithoutPrefix = inactiveIngredientsWithoutPrefix.replace(
      "Inactive Ingredients:",
      ""
    );
  }
  if (inactiveIngredientsWithoutPrefix.startsWith("Inactive ingredients ")) {
    inactiveIngredientsWithoutPrefix = inactiveIngredientsWithoutPrefix.replace(
      "Inactive ingredients ",
      ""
    );
  }
  return (
    <div>
      <h3 className="text-purp-2">Active Ingredients</h3>
      <p className="text-purp-2">{activeIngredientsWithoutPrefix}</p>
      <br />
      <h3 className="text-purp-2">Inactive Ingredients</h3>
      <p className="text-purp-2">{inactiveIngredientsWithoutPrefix}</p>
    </div>
  );
}

async function alternateDrugData(data: DrugResponse) {
  const spl_id = data?.drug?.id;
  const splData = await fetch(`/api/drugs/label/${spl_id}`).then(
    async (response) => {
      const data = await response.json();
      return data;
    }
  );
  return await splData;
}

export const DrugsDets = ({ data }: DrugSchema) => {
  const [splData, setSplData] = useState(null);

  if (!splData) {
    alternateDrugData(data).then((data) => {
      if (!data["results"]) return;
      setSplData(data["results"][0]);
    });
  }

  console.log(splData);
  return (
    <>
      <style>
        {`
        table {
          border-collapse: collapse;
          width: 100%;
        }
        
        caption {
          font-weight: light;
          font-size: 14px;
          text-align: center;
          color: #333;
          padding-bottom: 10px;
        }
        
        td, th {
          border-bottom: 1px solid #ddd;
          padding: 5px;
        }

        th {
          font-weight: bold;
        }
        
        tr:nth-child(even) {
          background-color: #f0e7fe;
        }

        ol {
          padding-left: 20px;
          font-size: 15px;
        }

        h3 {
          font-size: 16px;
          font-weight: bold;
          color: #333;
        }

        `}
      </style>

      <div className="flex flex-col justify-end sm:px-2 lg:px-28">
        <p className="text-2xl font-semibold text-violet-700">
          {formatName(data?.drug?.brand_name || "Unknown")}
        </p>
        <p className="text-purp-2 font-semibold sm:text-sm lg:text-xl">
          Manufacturer: {data?.drug?.manufacturer_name}
        </p>
        <p className="text-purp-5 pt-1 sm:text-xs lg:text-lg">
          Product Type: {data?.drug?.product_type}
        </p>
        <p className="text-purp-5 pt-1 sm:text-xs lg:text-lg">
          Route: {data?.drug?.route}
        </p>
        <p className="text-purp-5 pb-1 pt-1 text-violet-700 sm:text-xs">
          Effective Date:{" "}
          {formatDate(data?.drug?.effective_time || "00000000", "-")}
        </p>
        <div className="my-1">
          <hr />
        </div>
        <div className="flex flex-col">
          {splData && splData["description"] && (
            <ExpansionPanel
              key="description"
              title="Description"
              content={cleanDescription(splData["description"])}
            />
          )}
          {splData &&
            (splData["indications_and_usage"] || splData["purpose"]) && (
              <ExpansionPanel
                key="purpose"
                title="Purpose"
                content={cleanPurpose(
                  splData["indications_and_usage"] || splData["purpose"]
                )}
              />
            )}
          {splData && splData["dosage_and_administration"] && (
            <ExpansionPanel
              key="dosage_and_administration"
              title="Dosage and Administration"
              content={cleanDosage(
                splData["dosage_and_administration"],
                splData["dosage_and_administration_table"] || null
              )}
            />
          )}
          {splData && splData["instructions_for_use"] && (
            <ExpansionPanel
              key="instructions_for_use"
              title="Instructions For Use"
              content={cleanInstructions(splData["instructions_for_use"])}
            />
          )}
          {splData && splData["adverse_reactions"] && (
            <ExpansionPanel
              key="adverse_reactions"
              title="Adverse Reactions"
              content={cleanAdverseReactions(
                splData["adverse_reactions"],
                splData["adverse_reactions_table"] || null
              )}
            />
          )}
          {splData && splData["overdosage"] && (
            <ExpansionPanel
              key="overdosage"
              title="Overdosage"
              content={cleanOverdosage(splData["overdosage"])}
            />
          )}
          {splData &&
            (splData["warnings"] || splData["warnings_and_cautions"]) && (
              <ExpansionPanel
                key="warnings"
                title="Warnings"
                content={cleanWarnings(
                  splData["warnings"] || splData["warnings_and_cautions"],
                  splData["ask_doctor"] || null,
                  splData["ask_doctor_or_pharmacist"] || null,
                  splData["keep_out_of_reach_of_children"] || null,
                  splData["pregnancy_or_breast_feeding"] || null,
                  (splData["precautions"]
                    ? typeof splData["precations"] === "string"
                      ? splData["precautions"]
                      : splData["precautions"][0]
                    : "") || ""
                )}
              />
            )}
          {splData && splData["clinical_studies"] && (
            <ExpansionPanel
              key="clinical_studies"
              title="Clinical Studies"
              content={cleanClinicalStudies(
                splData["clinical_studies"],
                splData["clinical_studies_table"] || null
              )}
            />
          )}
          {splData &&
            (splData["active_ingredient"] ||
              splData["inactive_ingredient"]) && (
              <ExpansionPanel
                key="ingredients"
                title="Ingredients"
                content={cleanIngredients(
                  splData["active_ingredient"] || null,
                  splData["inactive_ingredient"] || null
                )}
              />
            )}
          {splData && splData["drug_interactions"] && (
            <ExpansionPanel
              key="drug_interactions"
              title="Drug Interactions"
              content={cleanInteraction(splData["drug_interactions"])}
            />
          )}
        </div>
      </div>
    </>
  );
};

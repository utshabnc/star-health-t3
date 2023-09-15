import { PrismaClient } from "@prisma/client";
import { parseISO } from "date-fns";

const prisma = new PrismaClient();

// Define a route to create a UserDrugTracker record
export default async function handler(
  req: { method: string; query: any; body: any },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: any): void; new (): any };
    };
  }
) {
  if (req.method === "GET") {
    try {
      const { userId, date } = req.query;
      // ... (existing code for fetching water intake data)
    } catch (error) {
      // ... (existing error handling)
    }
  } else if (req.method === "POST") {
    try {
      const {
        id,
        isNewDrug,
        dosageType,
        spl_id,
        dateTimeInput,
        brand_name,
        manufacturer_name,
        dosge_descrip,
        userId,
        dosageAmount,
        sideEffect,
        selectedPrevDrug,
      } = req.body;
      if (id) {
        //update
        const formattedEntryDateTime = parseISO(dateTimeInput);

        let newDrug: any = "";
        if (isNewDrug) {
          try {
            newDrug = await prisma.userDrugTracker.create({
              data: {
                spl_id,
                brand_name,
                manufacturer_name,
                dosge_descrip,
                userId,
              },
            });
          } catch (error) {
            console.error("An error occurred while submitting the form", error);
            res.status(500).json({ message: "Failed to submit form" });
            return;
          }
        }
        // Create a new UserDrugTracker record
        try {
          const userDrugTracker = await prisma.userDrugLog.update({
            where: { id },
            data: {
              dateTimeOfLog: formattedEntryDateTime,
              amount: dosageAmount,
              dosageType,
              sideEffectFelt: sideEffect,
              drugId: isNewDrug ? newDrug["id"] : selectedPrevDrug,
            },
          });

          res.status(201).json(userDrugTracker);
        } catch (error) {
          console.error(error);
          res.status(500).json({
            error:
              "An error occurred while creating the UserDrugTracker record.",
          });
        }
      } else {
        const formattedEntryDateTime = parseISO(dateTimeInput);

        let newDrug: any = "";
        if (isNewDrug) {
          try {
            newDrug = await prisma.userDrugTracker.create({
              data: {
                spl_id,
                brand_name,
                manufacturer_name,
                dosge_descrip,
                userId,
              },
            });
          } catch (error) {
            console.error("An error occurred while submitting the form", error);
            res.status(500).json({ message: "Failed to submit form" });
            return;
          }
        }
        // Create a new UserDrugTracker record
        try {
          const userDrugTracker = await prisma.userDrugLog.create({
            data: {
              dateTimeOfLog: formattedEntryDateTime,
              amount: dosageAmount,
              sideEffectFelt: sideEffect,
              dosageType,
              drugId: isNewDrug ? newDrug["id"] : selectedPrevDrug,
            },
          });

          res.status(201).json(userDrugTracker);
        } catch (error) {
          console.error(error);
          res.status(500).json({
            error:
              "An error occurred while creating the UserDrugTracker record.",
          });
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "An error occurred while creating the UserDrugTracker record.",
      });
    }
  }
}

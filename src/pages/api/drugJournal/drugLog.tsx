import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: { method: string; query: { userId: string; date: string }; body: any },
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
      const { userId, date, dosage, drugId } = req.body;
      const formatedDate = new Date(date);
      const startOfDay = new Date(date);
      const endOfDay = new Date(startOfDay);
      endOfDay.setDate(startOfDay.getDate() + 1);
      // Check if the water intake data for the same user and date already exists
      const existingData = await prisma.userDrugLog.findFirst({
        where: {
          drugId: drugId,
          dateOfLog: {
            equals: startOfDay,
          },
        },
      });

      if (existingData) {
        // If data exists, update it
        await prisma.userDrugLog.update({
          where: {
            id: existingData.id,
          },
          data: {
            amount: dosage,
          },
        });
      } else {
        // If data doesn't exist, create a new entry
        await prisma.userDrugLog.create({
          data: {
            drugId,
            dateOfLog: formatedDate,
            amount: dosage,
          },
        });
      }

      res
        .status(200)
        .json({ message: "Water intake data successfully updated" });
    } catch (error) {
      console.error(
        "An error occurred while updating water intake data",
        error
      );
      res.status(500).json({ message: "Failed to update water intake data" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

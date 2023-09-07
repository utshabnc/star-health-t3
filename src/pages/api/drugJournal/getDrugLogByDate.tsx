import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: { method: string; query: { userId: string; date: string } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: any): void; new (): any };
    };
  }
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    const { userId, date } = req.query;
    const startOfDay = new Date(date);
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(startOfDay.getDate() + 1);
    console.log(startOfDay);
    console.log(endOfDay);
    const drugs = await prisma.userDrugTracker.findMany({
      where: {
        userId: userId,
      },
    });
    const output: any = [];
    const drugLogsPromises = drugs.map(async (drug: any) => {
      const drugLogs = await prisma.userDrugLog.findFirst({
        where: {
          drugId: drug.id,
          dateOfLog: {
            equals: startOfDay,
          },
        },
      });

      output.push({
        drug: drug,
        logs: drugLogs || {},
      });
    });
    await Promise.all(drugLogsPromises);
    if (!drugs) {
      res.status(404).json({ message: "Form data not found for the user" });
    } else {
      res.status(200).json({ drug: output });
    }
  } catch (error) {
    console.error("An error occurred while fetching the form data", error);
    res.status(500).json({ message: "Failed to fetch form data" });
  }
}

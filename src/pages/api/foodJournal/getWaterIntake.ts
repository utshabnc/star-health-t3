import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: { method: string; query: { userId: string, date: string } },
  res: { status: (arg0: number) => { (): any; new (): any; json: { (arg0: any): void; new (): any } } }
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
    const waterIntakeData = await prisma.userWaterIntake.findMany({
      where: {
        userId,
        dateTimeOfIntake: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },

    });

    if (!waterIntakeData) {
      res.status(404).json({ message: "Water intake data not found for the user" });
    } else {
      res.status(200).json({ waterIntakeData });
    }
  } catch (error) {
    console.error("An error occurred while fetching water intake data", error);
    res.status(500).json({ message: "Failed to fetch water intake data" });
  }
}

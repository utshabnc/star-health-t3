import { PrismaClient } from "@prisma/client";
import { startOfWeek } from "date-fns";

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
    const diary = await prisma.mentalHealthJournal.findMany({
      where: {
        userId,
        entryDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });
    const today = new Date(date);
    const dayOfWeek = today.getDay(); // 0 (Sunday) through 6 (Saturday)
    const startWeekDate = new Date(today);
    const endWeekDate = new Date(today);
    startWeekDate.setDate(today.getDate() - dayOfWeek);
    endWeekDate.setDate(today.getDate() + (6 - dayOfWeek) + 1);
    console.log(startWeekDate);
    console.log(endWeekDate);
    console.log(today);
    console.log(dayOfWeek);
    const trackerWeekEntries = await prisma.mentalHealthJournal.findMany({
      where: {
        userId,
        entryDate: {
          gte: startWeekDate,
          lt: endWeekDate,
        },
      },
    });
    console.log("DDD");
    console.log(trackerWeekEntries);
    const moodByDayOfWeek: any = [
      { id: 1, day: "Monday", mood: 0 },
      { id: 2, day: "Tuesday", mood: 0 },
      { id: 3, day: "Wednesday", mood: 0 },
      { id: 4, day: "Thursday", mood: 0 },
      { id: 5, day: "Friday", mood: 0 },
      { id: 6, day: "Saturday", mood: 0 },
      { id: 7, day: "Sunday", mood: 0 },
    ];

    // Update mood values based on the data retrieved from the database
    trackerWeekEntries.forEach((record) => {
      const recordDate = new Date(record.entryDate);
      const dayOfWeek = recordDate.getDay();
      moodByDayOfWeek[dayOfWeek == 0 ? 6 : dayOfWeek - 1].mood =
        record.moodScale;
    });
    const dateS = startWeekDate;

    for (let i = 0; i < 7; i++) {
      dateS.setDate(startWeekDate.getDate() + 1);
      moodByDayOfWeek[i].day =
        moodByDayOfWeek[i].day + ";" + dateS.toLocaleDateString("en-US");
    }
    res.status(200).json({ diary, moodByDayOfWeek });
  } catch (error) {
    console.log(error);
    console.error("An error occurred while fetching data", error);
    res.status(500).json({ message: "Failed to fetch data" });
  }
}

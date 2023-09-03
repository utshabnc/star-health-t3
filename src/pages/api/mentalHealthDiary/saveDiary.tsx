import { PrismaClient } from "@prisma/client";
import { parseISO } from "date-fns";

const prisma = new PrismaClient();

export default async function handler(
  req: {
    method: string;
    body: {
      id: number;
      userId: string;
      entryDate: string;
      moodScale: number;
      emotionTags: string;
      freeFormJournal: string;
      dailyGratitude: string;
      triggerIdentification: string;
      copingStrategies: string;
    };
  },

  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { message: string }): void; new (): any };
    };
  }
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }
  try {
    const {
      id,
      userId,
      entryDate,
      moodScale,
      emotionTags,
      freeFormJournal,
      dailyGratitude,
      triggerIdentification,
      copingStrategies,
    } = req.body;
    const formattedDate = parseISO(entryDate);

    if (id) {
      await prisma.mentalHealthJournal.update({
        where: {
          id: id,
        },
        data: {
          moodScale,
          emotionTags,
          freeFormJournal,
          dailyGratitude,
          triggerIdentification,
          copingStrategies,
        },
      });
    } else {
      await prisma.mentalHealthJournal.create({
        data: {
          userId,
          entryDate: formattedDate,
          moodScale,
          emotionTags,
          freeFormJournal,
          dailyGratitude,
          triggerIdentification,
          copingStrategies,
        },
      });
    }
    res.status(200).json({ message: "Diary Savef successfully" });
  } catch (error) {
    console.error("An error occurred while submitting the form", error);
    res.status(500).json({ message: "Failed to submit form" });
  }
}

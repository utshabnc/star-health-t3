import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }
  try {
    const { id, dailyGoal } = req.body;

    const customSubstances = await prisma.customExercise.update({
      where: { id },
      data: {
        dailyGoal: dailyGoal,
      },
    });

    res.status(200).json({ customSubstances });
  } catch (error) {
    console.error("An error occurred while fetching water intake data", error);
    res.status(500).json({ message: "Failed to fetch water intake data" });
  }
}

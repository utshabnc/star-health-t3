import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: any, res: any) => {
  if (req.method === "GET") {
    try {
      const exercises = await prisma.adminExercise.findMany();
      const list = exercises.map((row: any) => row.exerciseName);

      res.status(200).json(list);
    } catch (error) {
      console.error("Error retrieving exercises:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

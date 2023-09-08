import { PrismaClient } from "@prisma/client";
import { parseISO } from "date-fns";

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    if (req.body.id) {
      console.log("ojjjj");
      try {
        const {
          id,
          entryDateTime,
          customExerciseId,
          duration,
          intensity,
          calorieBurned,
          unitToTrackValue,
          userId,
          isNewExercise,
          addNewExercise,
        } = req.body;
        const formattedEntryDateTime = parseISO(entryDateTime);

        let newExercise: any = "";
        if (isNewExercise) {
          try {
            const { exerciseName, unitToTrack } = req.body["addNewExercise"];

            newExercise = await prisma.customExercise.create({
              data: {
                userId: userId,
                exerciseName: exerciseName,
                unitToTrack: unitToTrack,
              },
            });
          } catch (error) {
            console.error("An error occurred while submitting the form", error);
            res.status(500).json({ message: "Failed to submit form" });
            return;
          }
        }

        const newEntry = await prisma.ExerciseTracker.update({
          where: {
            id: id,
          },
          data: {
            entryDateTime: formattedEntryDateTime,
            customExerciseId: isNewExercise
              ? newExercise["id"]
              : customExerciseId,
            duration,
            intensity,
            calorieBurned,
            unitToTrackValue,
            userId,
          },
        });

        res.status(201).json(newEntry);
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ error: "An error occurred while creating the entry." });
      }
    } else {
      try {
        const {
          entryDateTime,
          customExerciseId,
          duration,
          intensity,
          calorieBurned,
          unitToTrackValue,
          userId,
          isNewExercise,
          addNewExercise,
        } = req.body;
        const formattedEntryDateTime = parseISO(entryDateTime);

        let newExercise: any = "";
        if (isNewExercise) {
          try {
            const { exerciseName, unitToTrack } = req.body["addNewExercise"];

            newExercise = await prisma.customExercise.create({
              data: {
                userId: userId,
                exerciseName: exerciseName,
                unitToTrack: unitToTrack,
              },
            });
          } catch (error) {
            console.error("An error occurred while submitting the form", error);
            res.status(500).json({ message: "Failed to submit form" });
            return;
          }
        }

        const newEntry = await prisma.ExerciseTracker.create({
          data: {
            entryDateTime: formattedEntryDateTime,
            customExerciseId: isNewExercise
              ? newExercise["id"]
              : customExerciseId,
            duration,
            intensity,
            calorieBurned,
            unitToTrackValue,
            userId,
          },
        });

        res.status(201).json(newEntry);
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ error: "An error occurred while creating the entry." });
      }
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

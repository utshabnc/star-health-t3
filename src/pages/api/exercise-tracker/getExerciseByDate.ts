import { PrismaClient } from "@prisma/client";
import { includes } from "lodash";

const prisma = new PrismaClient();

export default async function handler(
  req: { method: string; query: { userId: string, date:string } },
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
    const customExerciseWithTotal:any = [];

    const formData = await prisma.exerciseTracker.findMany({
        where: { userId, entryDateTime: { 
            gte: startOfDay,
            lt: endOfDay,
        }
          },
      include:{
        customExercise: true
      },
      orderBy: {
        entryDateTime: 'asc', // or 'desc' for descending order
      },
    });

    if (!formData) {
        res.status(404).json({ message: "Form data not found for the user" });
      } else {
        const customExercises = await prisma.customExercise.findMany({
          where:
          {userId}
        })
        // Iterate through the custom substances and calculate the total dosage
        const today = new Date(date);
        const dayOfWeek = today.getDay(); // 0 (Sunday) through 6 (Saturday)
        const startWeekDate = new Date(today);
        const endWeekDate = new Date(today);
// Calculate the start date of the week (assuming Sunday as the first day of the week)
        startWeekDate.setDate(today.getDate() - dayOfWeek);

// Calculate the end date of the week
        endWeekDate.setDate(today.getDate() + (6 - dayOfWeek+1));

        const startMonthDate = new Date(date);
startMonthDate.setDate(1); // Set the day of the month to 1 (beginning of the month)
startMonthDate.setHours(0, 0, 0, 0); // Set the time to midnight

// Calculate end of the month
const endMonthDate = new Date(date);
endMonthDate.setMonth(endMonthDate.getMonth() + 1, 0); // Set to the last day of the current month
endMonthDate.setHours(23, 59, 59, 999); 
        for (const customExercise of customExercises) {
          const exerciseId = customExercise.id;
      
          // Find all entries in the SubstanceTracker table for this substance
          const trackerEntries = await prisma.exerciseTracker.findMany({
            where: { customExerciseId: exerciseId ,entryDateTime: { 
              gte: startOfDay,
              lt: endOfDay,
          }},
          });
          const trackerWeekEntries = await prisma.exerciseTracker.findMany({
            where: { customExerciseId: exerciseId ,entryDateTime: { 
              gte: startWeekDate,
              lte: endWeekDate,
          }},
          });
          const trackerMonthEntries = await prisma.exerciseTracker.findMany({
            where: { customExerciseId: exerciseId ,entryDateTime: { 
              gte: startMonthDate,
              lte: endMonthDate,
          }},
          });
          // Calculate the total dosage for this substance
          let total=0
          let totalWeek=0
          let totalMonth=0

          if(customExercise.unitToTrack==='Calories')
          { 
            total = trackerEntries?trackerEntries.reduce((acc, entry) => acc + entry.calorieBurned, 0):0;
           totalWeek = trackerWeekEntries?trackerWeekEntries.reduce((acc, entry) => acc + entry.calorieBurned, 0):0;
           totalMonth = trackerMonthEntries?trackerMonthEntries.reduce((acc, entry) => acc + entry.calorieBurned, 0):0;

          }
          else if(customExercise.unitToTrack==='Minutes')
          { 
            total = trackerEntries?trackerEntries.reduce((acc, entry) => acc + entry.duration, 0):0;
            totalWeek = trackerWeekEntries?trackerWeekEntries.reduce((acc, entry) => acc + entry.duration, 0):0;
            totalMonth = trackerMonthEntries?trackerMonthEntries.reduce((acc, entry) => acc + entry.duration, 0):0;

          }
          else       
          { 
            total = trackerEntries?trackerEntries.reduce((acc, entry) => acc + entry.unitToTrackValue, 0):0;
           totalWeek = trackerWeekEntries?trackerWeekEntries.reduce((acc, entry) => acc + entry.unitToTrackValue, 0):0;
           totalMonth = trackerMonthEntries?trackerMonthEntries.reduce((acc, entry) => acc + entry.unitToTrackValue, 0):0;

          }
          // Store the total dosage in the totalDosage object
          customExerciseWithTotal.push({
            ...customExercise,
            totalDaily: total,
            totalWeekly:totalWeek,
            totalMonthly:totalMonth
          })
        }

        //WeeklyData


      
        console.log(customExerciseWithTotal)
        res.status(200).json({exerciseTracker:formData,customExerciseWithTotal});
      }} catch (error) {
  console.error("An error occurred while fetching the form data", error);
  res.status(500).json({ message: "Failed to fetch form data" });
}
}
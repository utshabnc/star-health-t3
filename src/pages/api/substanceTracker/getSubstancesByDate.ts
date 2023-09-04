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
    const customSubstancesWithTotal:any = [];

    const formData = await prisma.substanceTracker.findMany({
        where: { userId, entryDateTime: { 
            gte: startOfDay,
            lt: endOfDay,
        }
        
          },
      include:{
        customSubstance: true
      },
      orderBy: {
        entryDateTime: 'asc', // or 'desc' for descending order
      },
    });

    if (!formData) {
        res.status(404).json({ message: "Form data not found for the user" });
      } else {
        const customSubstances = await prisma.customSubstance.findMany({
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
        for (const customSubstance of customSubstances) {
          const substanceId = customSubstance.id;
      
          // Find all entries in the SubstanceTracker table for this substance
          const trackerEntries = await prisma.substanceTracker.findMany({
            where: { substance: substanceId ,entryDateTime: { 
              gte: startOfDay,
              lt: endOfDay,
          }},
          });
          const trackerWeekEntries = await prisma.substanceTracker.findMany({
            where: { substance: substanceId ,entryDateTime: { 
              gte: startWeekDate,
              lte: endWeekDate,
          }},
          });
          // Calculate the total dosage for this substance
          const total = trackerEntries.reduce((acc, entry) => acc + entry.dosageAmount, 0);
          const totalWeek = trackerWeekEntries.reduce((acc, entry) => acc + entry.dosageAmount, 0);

          // Store the total dosage in the totalDosage object
          customSubstancesWithTotal.push({
            ...customSubstance,
            totalDosage: total,
            totalWeeklyDosage:totalWeek
          })
        }

        //WeeklyData


      
        console.log(customSubstancesWithTotal)
        res.status(200).json({substanceTracker:formData,customSubstancesWithTotal});
      }} catch (error) {
  console.error("An error occurred while fetching the form data", error);
  res.status(500).json({ message: "Failed to fetch form data" });
}
}
import { PrismaClient } from "@prisma/client";
import { parseISO } from "date-fns";

const prisma = new PrismaClient();

export default async function handler(
    req:{
        method: string;
        body: {
            userId:string   
            foodItemID:string
            foodItemAPI:string
            dateTimeOfMeal:string
            nutrientResponse:any
            numberOfServings:number
        }
    },

    res: {
        status: (arg0: number) => {
          (): any;
          new (): any;
          json: { (arg0: { message: string }): void; new (): any };
        };
      }
){
    if (req.method !== "POST") {
        res.status(405).json({ message: "Method not allowed" });
        return;
      }
      try {
        const {
          userId,
          foodItemID,
          foodItemAPI,
          dateTimeOfMeal,
          nutrientResponse,
          numberOfServings
        }=req.body
    const formattedDateOfMeal = parseISO(dateTimeOfMeal);
    

    await prisma.userFoodJournal.create({
        data: {
          userId,
          foodItemID,
          foodItemAPI,
          dateTimeOfMeal: formattedDateOfMeal,
          nutrientResponse, // Replace with the actual structure of your JSON data
          numberOfServings,
        },
      });
  
      res.status(200).json({ message: "Food item added successfully" });

    }
    catch (error) {
      console.error("An error occurred while submitting the form", error);
      res.status(500).json({ message: "Failed to submit form" });
    }}

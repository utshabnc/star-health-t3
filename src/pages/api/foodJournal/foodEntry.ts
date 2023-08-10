import { PrismaClient } from "@prisma/client";
import { parseISO } from "date-fns";

const prisma = new PrismaClient();

export default async function handler(
    req:{
        method: string;
        body: {
            id:number
            userId:string   
            foodItemID:string
            foodItemAPI:string
            nutrientResponse:any
            numberOfServings:number
            mealCategory:string
            dateTimeOfMeal:string

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
          id,
          userId,
          foodItemID,
          foodItemAPI,
          nutrientResponse,
          numberOfServings,
          mealCategory,
          dateTimeOfMeal,

        }=req.body
    const formattedDateOfMeal = parseISO(dateTimeOfMeal);
    

    if (id) {
      await prisma.userFoodJournal.update({
        where: {
          id: id
        },
        data: {
          userId,
          foodItemID,
          foodItemAPI,
          nutrientResponse,
          numberOfServings,
          mealCategory,
          dateTimeOfMeal: formattedDateOfMeal,

        }
      });
    } else {
      await prisma.userFoodJournal.create({
        data: {
          userId,
          foodItemID,
          foodItemAPI,
          nutrientResponse,
          numberOfServings,
          mealCategory,
          dateTimeOfMeal: formattedDateOfMeal,

        },
      });
    }
    
      res.status(200).json({ message: "Food item added successfully" });

    }
    catch (error) {
      
      console.error("An error occurred while submitting the form", error);
      res.status(500).json({ message: "Failed to submit form" });
    }}

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: { method: string; query: { userId: string, date:string } },
  res: { status: (arg0: number) => { (): any; new (): any; json: { (arg0: any): void; new (): any } } }
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }
  function getNutrientSummary(foodList:any[]){
    const output:any = {}
    foodList.map((food)=>{
        const numberOfServings = food['numberOfServings']
        const selectedPortion = food['nutrientResponse']['selectedPortion']
        food['nutrientResponse']['nutrientFacts'].map((nutrient:any)=>{
        const i:any =nutrient['nutrient']['id']
        if(output.hasOwnProperty(i))
        {
            output[i]['amount'] += nutrient['amount']*(selectedPortion/100)*numberOfServings
        }
        else{
        output[i] = 
        {amount:nutrient['amount']*(selectedPortion/100)*numberOfServings,
        name:nutrient['nutrient']['name'],
        unit:nutrient['nutrient']['unitName']
        }
        }   
    })
    })
    return output
  }

  try {
    const { userId, date } = req.query;
    const startOfDay = new Date(date);
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(startOfDay.getDate() + 1);
    const formData = await prisma.userFoodJournal.findMany({
        where: { userId, dateTimeOfMeal: { 
            gte: startOfDay,
            lt: endOfDay,
        }
      
      },
      orderBy: {
        dateTimeOfMeal: 'asc', // or 'desc' for descending order
      },
    });
    const nutrientSummary= getNutrientSummary(formData)
    if (!formData) {
      res.status(404).json({ message: "Form data not found for the user" });
    } else {
      res.status(200).json({foodlist:formData,nutrientSummary:nutrientSummary});
    }
  } catch (error) {
    console.error("An error occurred while fetching the form data", error);
    res.status(500).json({ message: "Failed to fetch form data" });
  }
}
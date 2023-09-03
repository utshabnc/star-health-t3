import { PrismaClient } from '@prisma/client';
import { parseISO } from "date-fns";

const prisma = new PrismaClient();

export default async function handler(req:any, res:any) {
  if (req.method === 'POST') {
    if(req.body.id)
    {
      try{const {
        id,
        entryDateTime,
        substance,
        dosageAmount,
        methodOfConsumption,
        moodBefore,
        moodAfter,
        userId,
        isNewSubstance,
        addNewSubstance,
      } = req.body;
      const formattedDateOfMeal = parseISO(entryDateTime);

      let newSub:any = ''
      if (isNewSubstance)
        {
          try {
            const {
              substanceName,
              dosageUnit  
            }=req.body['addNewSubstance']
          
        newSub = await prisma.customSubstance.create({
            data:{
                userId : userId,
                substance:substanceName,
                dosageUnit:dosageUnit
            }
        })
    
        }
          catch(error)
          {
            console.error("An error occurred while submitting the form", error);
          res.status(500).json({ message: "Failed to submit form" });
          }
        }
      const newEntry = await prisma.substanceTracker.update({
        where: {
          id: id
        },
        data: {
          entryDateTime:formattedDateOfMeal,
          substance: isNewSubstance?newSub['id']:substance,
          dosageAmount,
          methodOfConsumption,
          moodBefore,
          moodAfter,
          userId,
        },
      });


      res.status(201).json(newEntry);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while creating the entry.' });
    }
    }
    else{
    try {
      const {
        id,
        entryDateTime,
        substance,
        dosageAmount,
        methodOfConsumption,
        moodBefore,
        moodAfter,
        userId,
        isNewSubstance,
        addNewSubstance,
      } = req.body;
      const formattedDateOfMeal = parseISO(entryDateTime);

      let newSub:any = ''
      if (isNewSubstance)
        {
          try {
            const {
              substanceName,
              dosageUnit  
            }=req.body['addNewSubstance']
          
        newSub = await prisma.customSubstance.create({
            data:{
                userId : userId,
                substance:substanceName,
                dosageUnit:dosageUnit
            }
        })
    
        }
          catch(error)
          {
            console.error("An error occurred while submitting the form", error);
          res.status(500).json({ message: "Failed to submit form" });
          }
        }
      const newEntry = await prisma.substanceTracker.create({
        
        data: {
          entryDateTime:formattedDateOfMeal,
          substance: isNewSubstance?newSub['id']:substance,
          dosageAmount,
          methodOfConsumption,
          moodBefore,
          moodAfter,
          userId,
        },
      });


      res.status(201).json(newEntry);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while creating the entry.' });
    }
  }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

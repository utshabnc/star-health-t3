import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Define a route to create a UserDrugTracker record
export default async function handler(
  req: { method: string; query: any; body: any },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: any): void; new (): any };
    };
  }
) {
  if (req.method === "GET") {
    try {
      const { userId, date } = req.query;
      // ... (existing code for fetching water intake data)
    } catch (error) {
      // ... (existing error handling)
    }
  } else if (req.method === "POST") {
    try {
      const { spl_id, brand_name, manufacturer_name, dosge_descrip, userId } =
        req.body;

      // Create a new UserDrugTracker record
      const userDrugTracker = await prisma.userDrugTracker.create({
        data: {
          spl_id,
          brand_name,
          manufacturer_name,
          dosge_descrip,
          userId,
        },
      });

      res.status(201).json(userDrugTracker);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "An error occurred while creating the UserDrugTracker record.",
      });
    }
  }
}

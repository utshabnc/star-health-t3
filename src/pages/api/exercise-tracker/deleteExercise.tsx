import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: {
    method: string;
    query: {
      key: string; // Assuming "key" is the parameter for the food item ID
    };
  },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { message: string }): void; new (): any };
    };
  }
) {
  if (req.method !== "DELETE") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    const execrsieID = parseInt(req.query.key); // Get the food item ID from the query parameter
    // Delete the food item using the provided foodItemID
    await prisma.exerciseTracker.delete({
      where: {
        id: execrsieID,
      },
    });

    res.status(200).json({ message: "Food item deleted successfully" });
  } catch (error) {
    console.error("An error occurred while deleting the food item", error);
    res.status(500).json({ message: "Failed to delete food item" });
  }
}

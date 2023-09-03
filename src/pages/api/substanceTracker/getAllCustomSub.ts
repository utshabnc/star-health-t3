import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: { method: string; query: { userId: string } },
  res: { status: (arg0: number) => { (): any; new (): any; json: { (arg0: any): void; new (): any } } }
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }
  try {
    const { userId } = req.query;
  const customSubstances = await prisma.customSubstance.findMany({
    where:
    {userId}
  })

  
  res.status(200).json({ customSubstances });

}
catch (error) {
    console.error("An error occurred while fetching water intake data", error);
    res.status(500).json({ message: "Failed to fetch water intake data" });
  }

}
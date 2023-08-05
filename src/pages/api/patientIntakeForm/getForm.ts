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

    // Fetch user's intake form data by userId
    const formData = await prisma.patientIntakeForm.findUnique({
      where: { userId },
    });

    if (!formData) {
      res.status(404).json({ message: "Form data not found for the user" });
    } else {
      res.status(200).json(formData);
    }
  } catch (error) {
    console.error("An error occurred while fetching the form data", error);
    res.status(500).json({ message: "Failed to fetch form data" });
  }
}
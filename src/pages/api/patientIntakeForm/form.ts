import { PrismaClient } from "@prisma/client";
import { parseISO } from "date-fns";

const prisma = new PrismaClient();

export default async function handler(
  req: {
    method: string;
    body: {
      userId:string;
      firstName: string;
      lastName: string;
      dateOfBirth: string;
      sex: string;
      maritialStatus: string;
      email: string;
      phoneNumber: string;
      homePhone1?: string | null;
      cellPhone1: string;
      workPhone1?: string | null;
      homePhone2?: string | null;
      cellPhone2?: string | null;
      workPhone2?: string | null;
      homePhone3?: string | null;
      cellPhone3?: string | null;
      workPhone3?: string | null;
      medications?: string | null;
      allergies?: string | null;
      address: string;
      emergencyContact1: string;
      relationship1: string;
      emergencyContactPhone1: string;
      emergencyContact2?: string | null;
      relationship2?: string | null;
      emergencyContactPhone2?: string | null;
      insuranceCarried?: string | null;
      insurancePlan?: string | null;
      contactNumber?: string | null;
      policyNumber?: string | null;
      groupNumber?: string | null;
      ssn?: string | null;
      underMedicalCare?: string | null;
      medicalCareReason?: string | null;
      primaryCarePhysician?: string | null;
      healthConcerns?: string | null;
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
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    const {
      userId,
      firstName,
      lastName,
      dateOfBirth,
      sex,
      maritialStatus,
      email,
      phoneNumber,
      homePhone1,
      cellPhone1,
      workPhone1,
      homePhone2,
      cellPhone2,
      workPhone2,
      homePhone3,
      cellPhone3,
      workPhone3,
      medications,
      allergies,
      address,
      emergencyContact1,
      relationship1,
      emergencyContactPhone1,
      emergencyContact2,
      relationship2,
      emergencyContactPhone2,
      insuranceCarried,
      insurancePlan,
      contactNumber,
      policyNumber,
      groupNumber,
      ssn,
      underMedicalCare,
      medicalCareReason,
      primaryCarePhysician,
      healthConcerns,
    } = req.body;

    // Convert dateOfBirth to DateTime format
    const formattedDateOfBirth = parseISO(dateOfBirth);

    // Store the form data in the database
    await prisma.patientIntakeForm.upsert({
      where:
      {userId},
      create:{ 
        userId,
        firstName,
        lastName,
        dateOfBirth: formattedDateOfBirth,
        sex,
        maritialStatus,
        email,
        phoneNumber,
        homePhone1,
        cellPhone1,
        workPhone1,
        homePhone2,
        cellPhone2,
        workPhone2,
        homePhone3,
        cellPhone3,
        workPhone3,
        medications,
        allergies,
        address,
        emergencyContact1,
        relationship1,
        emergencyContactPhone1,
        emergencyContact2,
        relationship2,
        emergencyContactPhone2,
        insuranceCarried,
        insurancePlan,
        contactNumber,
        policyNumber,
        groupNumber,
        ssn,
        underMedicalCare,
        medicalCareReason,
        primaryCarePhysician,
        healthConcerns,
      },
      update:{ 
        firstName,
        lastName,
        dateOfBirth: formattedDateOfBirth,
        sex,
        maritialStatus,
        email,
        phoneNumber,
        homePhone1,
        cellPhone1,
        workPhone1,
        homePhone2,
        cellPhone2,
        workPhone2,
        homePhone3,
        cellPhone3,
        workPhone3,
        medications,
        allergies,
        address,
        emergencyContact1,
        relationship1,
        emergencyContactPhone1,
        emergencyContact2,
        relationship2,
        emergencyContactPhone2,
        insuranceCarried,
        insurancePlan,
        contactNumber,
        policyNumber,
        groupNumber,
        ssn,
        underMedicalCare,
        medicalCareReason,
        primaryCarePhysician,
        healthConcerns,
      },
    }
  );

  } catch (error) {
    console.error("An error occurred while submitting the form", error);
    res.status(500).json({ message: "Failed to submit form" });
  }
}

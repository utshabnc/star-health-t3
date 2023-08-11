import { PrismaClient } from "@prisma/client";
import { parseISO } from "date-fns";
import { date } from "zod";

const prisma = new PrismaClient();

export default async function handler(
  req: {
    method: string;
    body: {
      userId:string;
      firstName: string| null;
      lastName: string| null;
      dateOfBirth: string| null;
      sex: string| null;
      maritialStatus: string| null;
      email: string| null;
      phoneNumber: string| null;
      homePhone1?: string | null;
      cellPhone1: string | null;
      workPhone1?: string | null;
      homePhone2?: string | null;
      cellPhone2?: string | null;
      workPhone2?: string | null;
      homePhone3?: string | null;
      cellPhone3?: string | null;
      workPhone3?: string | null;
      medications?: string | null;
      allergies?: string | null;
      address: string| null;
      emergencyContact1: string| null;
      relationship1: string| null;
      emergencyContactPhone1: string| null;
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
      height?: number | null;
      weight?: number | null;

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
      height,
      weight
    } = req.body;

    // Convert dateOfBirth to DateTime format
    console.log(dateOfBirth)
    const formattedDateOfBirth = (!dateOfBirth||dateOfBirth==null)?null:(dateOfBirth.length>0?parseISO(dateOfBirth):null);

    // Store the form data in the database
    await prisma.patientIntakeForm.upsert({
      where:
      {userId:userId+''},
      create:{ 
        firstName:firstName??"",
        lastName:lastName??"",
        dateOfBirth: formattedDateOfBirth,
        sex:sex??"",
        maritialStatus:maritialStatus??"",
        email:email??"",
        phoneNumber:"",
        homePhone1,
        cellPhone1:cellPhone1??"",
        workPhone1,
        homePhone2,
        cellPhone2,
        workPhone2,
        homePhone3,
        cellPhone3,
        workPhone3,
        medications,
        allergies,
        address:address??"",
        emergencyContact1:emergencyContact1??"",
        relationship1:relationship1??"",
        emergencyContactPhone1:"",
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
        height,
        weight,
        user:{
          connect: {
            id: userId+"", // Replace with the actual user ID
          },
        },
      },
      update:{ 
        firstName:firstName??"",
        lastName:lastName??"",
        dateOfBirth: formattedDateOfBirth,
        sex:sex??"",
        maritialStatus:maritialStatus??"",
        email:email??"",
        phoneNumber:"",
        homePhone1,
        cellPhone1:cellPhone1??"",
        workPhone1,
        homePhone2,
        cellPhone2,
        workPhone2,
        homePhone3,
        cellPhone3,
        workPhone3,
        medications,
        allergies,
        address:address??"",
        emergencyContact1:emergencyContact1??"",
        relationship1:relationship1??"",
        emergencyContactPhone1:"",
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
        height,
        weight
      },
    }
  );
  res.status(200).json({ message: "Success" });

  } catch (error) {
    console.error("An error occurred while submitting the form", error);
    res.status(500).json({ message: "Failed to submit form" });
  }
}

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const PatientIntakeForm: React.FC = () => {
  const headingStyle = {
    fontSize: "25px",
    color: "#885CF6",

  };
  const { data: session, status } = useSession();
  const name = session?.user?.name || '';
  const userId = session?.user?.id || '';
  const [firstName, setFirstName] = useState(name);
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [sex, setSex] = useState("");
  const [maritialStatus, setMaritialStatus] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [homePhone1, setHomePhone1] = useState("");
  const [cellPhone1, setCellPhone1] = useState("");
  const [workPhone1, setWorkPhone1] = useState("");
  const [homePhone2, setHomePhone2] = useState("");
  const [cellPhone2, setCellPhone2] = useState("");
  const [workPhone2, setWorkPhone2] = useState("");
  const [homePhone3, setHomePhone3] = useState("");
  const [cellPhone3, setCellPhone3] = useState("");
  const [workPhone3, setWorkPhone3] = useState("");
  const [medications, setMedications] = useState("");
  const [allergies, setAllergies] = useState("");
  const [address, setAddress] = useState("");
  const [emergencyContact1, setEmergencyContact1] = useState("");
  const [relationship1, setRelationship1] = useState("");
  const [emergencyContactPhone1, setEmergencyContactPhone1] = useState("");
  const [emergencyContact2, setEmergencyContact2] = useState("");
  const [relationship2, setRelationship2] = useState("");
  const [emergencyContactPhone2, setEmergencyContactPhone2] = useState("");
  const [insuranceCarried, setInsuranceCarried] = useState("");
  const [insurancePlan, setInsurancePlan] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [groupNumber, setGroupNumber] = useState("");
  const [ssn, setSsn] = useState("");
  const [underMedicalCare, setUnderMedicalCare] = useState("");
  const [medicalCareReason, setMedicalCareReason] = useState("");
  const [primaryCarePhysician, setPrimaryCarePhysician] = useState("");
  const [healthConcerns, setHealthConcerns] = useState("");

  const [formSubmitted, setFormSubmitted] = useState(false); // State variable for tracking form submission
  


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Make a POST request to the server
      await fetch("/api/patientIntakeForm/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
        }),
      });

      setFormSubmitted(true);

      // Clear form input fields
      // setFirstName("");
      // setLastName("");
      // setDateOfBirth("");
      // setSex("");
      // setMaritialStatus("");
      // setEmail("");
      // setPhoneNumber("");
      // setHomePhone1("");
      // setCellPhone1("");
      // setWorkPhone1("");
      // setHomePhone2("");
      // setCellPhone2("");
      // setWorkPhone2("");
      // setHomePhone3("");
      // setCellPhone3("");
      // setWorkPhone3("");
      // setMedications("");
      // setAllergies("");
      // setAddress("");
      // setEmergencyContact1("");
      // setRelationship1("");
      // setEmergencyContactPhone1("");
      // setEmergencyContact2("");
      // setRelationship2("");
      // setEmergencyContactPhone2("");
      // setInsuranceCarried("");
      // setInsurancePlan("");
      // setContactNumber("");
      // setPolicyNumber("");
      // setGroupNumber("");
      // setSsn("");
      // setUnderMedicalCare("");
      // setMedicalCareReason("");
      // setPrimaryCarePhysician("");
      // setHealthConcerns("");
    } catch (error) {
      console.error("An error occurred while submitting the form", error);
    }
  };
  useEffect(()=>{

    const fetchData = async()=>{
        fetch(`/api/patientIntakeForm/getForm?userId=${userId}`,{method:'GET'})
        .then((response) => response.json())
        .then((formData) => {
          setFirstName(formData['firstName']);
          setLastName(formData['lastName']);
          setDateOfBirth(formData['dateOfBirth']);
          setSex(formData['sex']);
          setMaritialStatus(formData['maritialStatus']);
          setEmail(formData['email']);
          setPhoneNumber(formData['phoneNumber']);
          setHomePhone1(formData['homePhone1']);
          setCellPhone1(formData['cellPhone1']);
          setWorkPhone1(formData['workPhone1']);
          setHomePhone2(formData['homePhone2']);
          setCellPhone2(formData['cellPhone2']);
          setWorkPhone2(formData['workPhone2']);
          setHomePhone3(formData['homePhone3']);
          setCellPhone3(formData['cellPhone3']);
          setWorkPhone3(formData['workPhone3']);
          setMedications(formData['medications']);
          setAllergies(formData['allergies']);
          setAddress(formData['address']);
          setEmergencyContact1(formData['emergencyContact1']);
          setRelationship1(formData['relationship1']);
          setEmergencyContactPhone1(formData['emergencyContactPhone1']);
          setEmergencyContact2(formData['emergencyContact2']);
          setRelationship2(formData['relationship2']);
          setEmergencyContactPhone2(formData['emergencyContactPhone2']);
          setInsuranceCarried(formData['insuranceCarried']);
          setInsurancePlan(formData['insurancePlan']);
          setContactNumber(formData['contactNumber']);
          setPolicyNumber(formData['policyNumber']);
          setGroupNumber(formData['groupNumber']);
          setSsn(formData['ssn']);
          setUnderMedicalCare(formData['underMedicalCare']);
          setMedicalCareReason(formData['medicalCareReason']);
          setPrimaryCarePhysician(formData['primaryCarePhysician']);
          setHealthConcerns(formData['healthConcerns']);          // Handle the retrieved form data here
        })
        .catch((error) => {
          console.error("Error fetching form data:", error);
        })};
      
  fetchData();  
},[])
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold" style={{ fontSize: "35px" }}>
        Patient Intake Form
      </h1>
      {formSubmitted && (
        <p className="text-green-600 mb-4">Form submitted successfully!</p>
      )}
      <p className="mb-4">
        Please fill in all the information as accurately as possible. The
        information you provide will assist in formulating a complete health
        profile. All answers are confidential.
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <h2 className="mb-4 text-lg font-semibold" style={headingStyle}>
            Patient Information
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="firstName" className="font-semibold">
                First Name:
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border border-gray-300 px-2 py-1"
                style={{ border: "1px solid #000", borderRadius: "10px" }}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="font-semibold">
                Last Name:
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border border-gray-300 px-2 py-1"
                style={{ border: "1px solid #000", borderRadius: "10px" }}
              />
            </div>
            <div>
              <label htmlFor="dateOfBirth" className="font-semibold">
                Date of Birth:
              </label>
              <input
                type="date"
                id="dateOfBirth"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="w-full border border-gray-300 px-2 py-1"
                style={{ border: "1px solid #000", borderRadius: "10px" }}
              />
            </div>
            <div>
              <label htmlFor="sex" className="font-semibold">
                Sex:
              </label>
              <select
                id="sex"
                value={sex}
                onChange={(e) => setSex(e.target.value)}
                className="w-full border border-gray-300 px-2 py-1"
                style={{ border: "1px solid #000", borderRadius: "10px" }}
              >
                <option value="" disabled>Select Sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
                <label htmlFor="maritialStatus" className="font-semibold">
                  Marital Status:
                </label>
                <select
                  id="maritialStatus"
                  value={maritialStatus}
                  onChange={(e) => setMaritialStatus(e.target.value)}
                  className="w-full border border-gray-300 px-2 py-1"
                  style={{ border: "1px solid #000", borderRadius: "10px" }}
                >
                  <option value="" disabled>Select Marital Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>
            <div>
              <label htmlFor="email" className="font-semibold">
                Email Address:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 px-2 py-1"
                style={{ border: "1px solid #000", borderRadius: "10px" }}
              />
            </div>
            <div>
              <label htmlFor="address" className="font-semibold">
                Address:
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border border-gray-300 px-2 py-1"
                style={{ border: "1px solid #000", borderRadius: "10px" }}
              />
            </div>
            <div>
              <label htmlFor="cellPhone1" className="font-semibold">
                Cell Phone:
              </label>
              <input
                type="tel"
                id="cellPhone1"
                value={cellPhone1}
                onChange={(e) => setCellPhone1(e.target.value)}
                placeholder="123-456-8910"
                className="w-full border border-gray-300 px-2 py-1"
                style={{ border: "1px solid #000", borderRadius: "10px" }}
              />
            </div>
            <div>
              <label htmlFor="homePhone1" className="font-semibold">
                Home Phone:
              </label>
              <input
                type="tel"
                id="homePhone1"
                value={homePhone1}
                onChange={(e) => setHomePhone1(e.target.value)}
                placeholder="123-456-8910"
                className="w-full border border-gray-300 px-2 py-1"
                style={{ border: "1px solid #000", borderRadius: "10px" }}
              />
            </div>
            <div>
              <label htmlFor="workPhone1" className="font-semibold">
                Work Phone:
              </label>
              <input
                type="tel"
                id="workPhone1"
                value={workPhone1}
                onChange={(e) => setWorkPhone1(e.target.value)}
                placeholder="123-456-8910"
                className="w-full border border-gray-300 px-2 py-1"
                style={{ border: "1px solid #000", borderRadius: "10px" }}
              />
            </div>
          </div>
        </div>
        <div>
          <br></br>
          <h2 className="mb-4 text-lg font-semibold" style={headingStyle}>
            Emergency Contact
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="emergencyContact1" className="font-semibold">
                Name: 
              </label>
              <input
                type="text"
                id="emergencyContact1"
                value={emergencyContact1}
                onChange={(e) => setEmergencyContact1(e.target.value)}
                className="w-full border border-gray-300 px-2 py-1"
                style={{ border: "1px solid #000", borderRadius: "10px" }}
              />
            </div>
            <div>
              <label htmlFor="relationship1" className="font-semibold">
                Relationship:
              </label>
              <select
                id="relationship1"
                value={relationship1}
                onChange={(e) => setRelationship1(e.target.value)}
                className="w-full border border-gray-300 px-2 py-1"
                style={{ border: "1px solid #000", borderRadius: "10px" }}
              >
                <option value="">Select a relationship</option>
                <option value="parent">Parent</option>
                <option value="son/daugther">Son/Daugther</option>
                <option value="sibling">Sibling</option>
                <option value="partner">Partner</option>
                <option value="friend">Friend</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="cellPhone2" className="font-semibold">
                Cell Phone:
              </label>
              <input
                type="tel"
                id="cellPhone2"
                value={cellPhone2}
                onChange={(e) => setCellPhone2(e.target.value)}
                placeholder="123-456-8910"
                className="w-full border border-gray-300 px-2 py-1"
                style={{ border: "1px solid #000", borderRadius: "10px" }}
              />
            </div>
            <div>
              <label htmlFor="homePhone2" className="font-semibold">
                Home Phone:
              </label>
              <input
                type="tel"
                id="homePhone2"
                value={homePhone2}
                onChange={(e) => setHomePhone2(e.target.value)}
                placeholder="123-456-8910"
                className="w-full border border-gray-300 px-2 py-1"
                style={{ border: "1px solid #000", borderRadius: "10px" }}
              />
            </div>
            <div>
              <label htmlFor="workPhone2" className="font-semibold">
                Work Phone:
              </label>
              <input
                type="tel"
                id="workPhone2"
                value={workPhone2}
                onChange={(e) => setWorkPhone2(e.target.value)}
                placeholder="123-456-8910"
                className="w-full border border-gray-300 px-2 py-1"
                style={{ border: "1px solid #000", borderRadius: "10px" }}
              />
            </div>
            <div>
              <label htmlFor="emergencyContact2" className="font-semibold">
                Name:
              </label>
              <input
                type="text"
                id="emergencyContact2"
                value={emergencyContact2}
                onChange={(e) => setEmergencyContact2(e.target.value)}
                className="w-full border border-gray-300 px-2 py-1"
                style={{ border: "1px solid #000", borderRadius: "10px" }}
              />
            </div>
            <div>
              <label htmlFor="relationship2" className="font-semibold">
                Relationship:
              </label>
              <select
                id="relationship2"
                value={relationship2}
                onChange={(e) => setRelationship2(e.target.value)}
                className="w-full border border-gray-300 px-2 py-1"
                style={{ border: "1px solid #000", borderRadius: "10px" }}
              >
                <option value="">Select a relationship</option>
                <option value="parent">Parent</option>
                <option value="son/daugther">Son/Daugther</option>
                <option value="sibling">Sibling</option>
                <option value="partner">Partner</option>
                <option value="friend">Friend</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="cellPhone3" className="font-semibold">
                Cell Phone:
              </label>
              <input
                type="tel"
                id="cellPhone3"
                value={cellPhone3}
                onChange={(e) => setCellPhone3(e.target.value)}
                placeholder="123-456-8910"
                className="w-full border border-gray-300 px-2 py-1"
                style={{ border: "1px solid #000", borderRadius: "10px" }}
              />
            </div>
            <div>
              <label htmlFor="homePhone3" className="font-semibold">
                Home Phone:
              </label>
              <input
                type="tel"
                id="homePhone3"
                value={homePhone3}
                onChange={(e) => setHomePhone3(e.target.value)}
                placeholder="123-456-8910"
                className="w-full border border-gray-300 px-2 py-1"
                style={{ border: "1px solid #000", borderRadius: "10px" }}
              />
            </div>
            <div>
              <label htmlFor="workPhone3" className="font-semibold">
                Work Phone:
              </label>
              <input
                type="tel"
                id="workPhone3"
                value={workPhone3}
                onChange={(e) => setWorkPhone3(e.target.value)}
                placeholder="123-456-8910"
                className="w-full border border-gray-300 px-2 py-1"
                style={{ border: "1px solid #000", borderRadius: "10px" }}
              />
            </div>
          </div>
        </div>
        <div>
          <br></br>
          <h2 className="mb-4 text-lg font-semibold" style={headingStyle}>
            Insurance Information
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="insuranceCarried" className="font-semibold">
                Insurance Carried:
              </label>
              <input
                type="text"
                id="insuranceCarried"
                value={insuranceCarried}
                onChange={(e) => setInsuranceCarried(e.target.value)}
                className="w-full border border-gray-300 px-2 py-1"
                style={{ border: "1px solid #000", borderRadius: "10px" }}
              />
            </div>
            <div>
              <label htmlFor="insurancePlan" className="font-semibold">
                Insurance Plan:
              </label>
              <input
                type="text"
                id="insurancePlan"
                value={insurancePlan}
                onChange={(e) => setInsurancePlan(e.target.value)}
                className="w-full border border-gray-300 px-2 py-1"
                style={{ border: "1px solid #000", borderRadius: "10px" }}
              />
            </div>
            <div>
              <label htmlFor="contactNumber" className="font-semibold">
                Contact Number:
              </label>
              <input
                type="tel"
                id="contactNumber"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                placeholder="123-456-8910"
                className="w-full border border-gray-300 px-2 py-1"
                style={{ border: "1px solid #000", borderRadius: "10px" }}
              />
            </div>
            <div>
              <label htmlFor="policyNumber" className="font-semibold">
                Policy Number:
              </label>
              <input
                type="text"
                id="policyNumber"
                value={policyNumber}
                onChange={(e) => setPolicyNumber(e.target.value)}
                className="w-full border border-gray-300 px-2 py-1"
                style={{ border: "1px solid #000", borderRadius: "10px" }}
              />
            </div>
            <div>
              <label htmlFor="groupNumber" className="font-semibold">
                Group Number:
              </label>
              <input
                type="text"
                id="groupNumber"
                value={groupNumber}
                onChange={(e) => setGroupNumber(e.target.value)}
                className="w-full border border-gray-300 px-2 py-1"
                style={{ border: "1px solid #000", borderRadius: "10px" }}
              />
            </div>
            <div>
              <label htmlFor="ssn" className="font-semibold">
                Social Security Number:
              </label>
              <input
                type="text"
                id="ssn"
                value={ssn}
                onChange={(e) => setSsn(e.target.value)}
                placeholder="123-45-6789"
                className="w-full border border-gray-300 px-2 py-1"
                style={{ border: "1px solid #000", borderRadius: "10px" }}
              />
            </div>
          </div>
        </div>
        <div>
          <br></br>
          <h2 className="mb-4 text-lg font-semibold" style={headingStyle}>
            Refferals and Adjunctive Care
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="underMedicalCare" className="font-semibold">
                Are you currently under medical care?
              </label>
              <div style={{ display: "flex", flexDirection: "column" }}>
               <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                <input
                  type="radio"
                  id="underMedicalCareYes"
                  name="underMedicalCare"
                  value="yes"
                  checked={underMedicalCare === "yes"}
                  onChange={(e) => setUnderMedicalCare(e.target.value)}
                />
                <label htmlFor="underMedicalCareYes" style={{ marginLeft: "5px" }}>Yes</label>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="radio"
                  id="underMedicalCareNo"
                  name="underMedicalCare"
                  value="no"
                  checked={underMedicalCare === "no"}
                  onChange={(e) => setUnderMedicalCare(e.target.value)}
                />
                <label htmlFor="underMedicalCareNo" style={{ marginLeft: "5px" }}>No</label>
              </div>
            </div>
          </div>
            <div>
              <label htmlFor="medicalCareReason" className="font-semibold">
                If yes, please explain the reason for medical care:
              </label>
              <textarea
                id="medicalCareReason"
                value={medicalCareReason}
                onChange={(e) => setMedicalCareReason(e.target.value)}
                className="w-full border border-gray-300 px-2 py-1"
                style={{ border: "1px solid #000", borderRadius: "10px" }}
              />
            </div>
            <div>
              <label htmlFor="primaryCarePhysician" className="font-semibold">
                Primary Care Physician:
              </label>
              <input
                type="text"
                id="primaryCarePhysician"
                value={primaryCarePhysician}
                onChange={(e) => setPrimaryCarePhysician(e.target.value)}
                className="w-full border border-gray-300 px-2 py-1"
                style={{ border: "1px solid #000", borderRadius: "10px" }}
              />
            </div>
            <div>
              <label htmlFor="medications" className="font-semibold">
                Current Medications:
              </label>
              <textarea
                id="medications"
                value={medications}
                onChange={(e) => setMedications(e.target.value)}
                className="w-full border border-gray-300 px-2 py-1"
                style={{ border: "1px solid #000", borderRadius: "10px" }}
              />
            </div>
            <div>
              <label htmlFor="allergies" className="font-semibold">
                Allergies:
              </label>
              <textarea
                id="allergies"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                className="w-full border border-gray-300 px-2 py-1"
                style={{ border: "1px solid #000", borderRadius: "10px" }}
              />
            </div>
          </div>
        </div>
        <div className="mt-6">
          {formSubmitted ? (
            <>
              <span className="mr-2">Submitted</span>
              <svg
                className="h-5 w-5 inline-block text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 13l4 4L19 7"></path>
              </svg>
            </>
          ) : (
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              style={{ backgroundColor: "#885CF6" }}
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PatientIntakeForm;
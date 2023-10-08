import {useState} from "react";
import {PersonNode} from "./nodes";
import { DatabaseIcon } from "@heroicons/react/solid";

export interface PersonalData {
    name: string;
    gender: string;
    dateOfBirth: Date;
    placeOfBirth: string;
    alive: boolean;
    dateOfDeath?: Date;
    placeOfDeath?: string;
    causeOfDeath?: string;
    maritalStatus?: string;
    biographicalInfo?: string;
    medicalHistory?: string;
    stories?: string;
    accomplishments?: string;
    religiousAffiliation?: string;
    ethnicity?: string;
    militaryService?: string;
    occupation?: string;
    placeOfResidence?: string;
    socialMediaLinks?: string;
    immigrationDetails?: string;
    languagesSpoken?: string;
    nickname?: string;
    favoriteQuotes?: string;
    favoriteHobbies?: string,
    pets?: string;
    travelHistory?: string;
    politicalAffiliation?: string;
    religiousPractices?: string;
    favoriteMedia?: string;
    businessVentures?: string;
    familyTraditions?: string;
    criminalRecord?: string;
    genealogicalRecord?: string;
    educationHistory?: string;
    specialAchievements?: string;
}


interface AddNodeTypeRequired {
    nodeFns: ((person: PersonNode) => void)[];
    fnNames: string[];
}

interface AddNodeTypeOptional {
    person?: PersonalData;
}

export interface AddNodeType
extends AddNodeTypeRequired, AddNodeTypeOptional {}


const defaultProps: AddNodeTypeOptional = {
    person: {
        name: "",
        gender: "",
        dateOfBirth: new Date("10-06-2023"), 
        placeOfBirth: "",
        alive: false,
        dateOfDeath: new Date("10-06-2023"),
        placeOfDeath: "",
        causeOfDeath: "",
        maritalStatus: "",
        biographicalInfo: "",
        medicalHistory: "",
        stories: "",
        accomplishments: "",
        religiousAffiliation: "",
        ethnicity: "",
        militaryService: "",
        occupation: "",
        placeOfResidence: "",
        socialMediaLinks: "",
        immigrationDetails: "",
        languagesSpoken: "",
        nickname: "",
        favoriteQuotes: "",
        favoriteHobbies: "",
        pets: "",
        travelHistory: "",
        politicalAffiliation: "",
        religiousPractices: "",
        favoriteMedia: "",
        businessVentures: "",
        familyTraditions: "",
        criminalRecord: "",
        genealogicalRecord: "",
        educationHistory: "",
        specialAchievements: ""
    }
};


export const AncestryInfo: React.FC<AddNodeType> = (props: AddNodeType) => {
    const {nodeFns, fnNames, person} = props;
    const id = Date.now().toString();
    const [personalData, setPersonalData] = useState<PersonalData>(person);
    const [tab, setTab] = useState<string>("personalInfo");

    const changeInput = (event) => {
        event.preventDefault();
        const dateInputs = ["dateOfBirth", "dateOfDeath"];
        if (event.target.name in personalData) {
            if (dateInputs.includes(event.target.name)) {

                personalData[event.target.name] = new Date(event.target.value);
            }
            else {
                personalData[event.target.name] = event.target.value;
            }
        }

    };

    const submitPerson = (nodeFn: (person: PersonNode) => void) => {
        if (personalData.name === ""   || personalData.placeOfBirth === "") {
            alert("Please fill out Personal Information!");
            return;
        }
        
        nodeFn({
            id: id,
            name: personalData.name,
            age: getAge(personalData.dateOfBirth),
            place_of_birth: personalData.placeOfBirth,
            personalData: personalData
        });

        setPersonalData({
            name: "",
            gender: "",
            dateOfBirth: new Date("10-06-2023"), 
            placeOfBirth: "",
            alive: false,
            dateOfDeath: new Date("10-06-2023"),
            placeOfDeath: "",
            causeOfDeath: "",
            maritalStatus: "",
            biographicalInfo: "",
            medicalHistory: "",
            stories: "",
            accomplishments: "",
            religiousAffiliation: "",
            ethnicity: "",
            militaryService: "",
            occupation: "",
            placeOfResidence: "",
            socialMediaLinks: "",
            immigrationDetails: "",
            languagesSpoken: "",
            nickname: "",
            favoriteQuotes: "",
            favoriteHobbies: "",
            pets: "",
            travelHistory: "",
            politicalAffiliation: "",
            religiousPractices: "",
            favoriteMedia: "",
            businessVentures: "",
            familyTraditions: "",
            criminalRecord: "",
            genealogicalRecord: "",
            educationHistory: "",
            specialAchievements: ""
        });
    }

    const renderInputType = (property: string) => {
        const oneLineInputs = ["name", "placeOfBirth", "placeOfDeath", "causeOfDeath", "ethnicity", "occupation", "placeOfResidence", "nickname", "pets", "politicalAffiliation", "favoriteMedia"];
        const dateInputs = ["dateOfBirth", "dateOfDeath"];
        const textAreaInputs = ["biographicalInfo", "medicalHistory", "stories", "accomplishments", "immigrationDetails", "languagesSpoken", "favoriteQuotes", "religiousAffiliation", "businessVentures", "familyTraditions", "criminalRecord", "genealogicalRecord", "educationHistory", "specialAchievements", "socialMediaLinks"];
        const checkboxInputs = ["alive"];
        const dropdownInputs = {
            "gender": ["Male", "Female", "Other"],
            "maritalStatus": ["Married", "Status", "Divorced"]
        };

        if (oneLineInputs.includes(property)) {
            return (
                <div key={property} className="mb-4">
                    <label className="block text-sm font-bold mb-2 text-left">
                        {
                            property.replace(property[0], property[0]?.toUpperCase()).replace(/([a-z])([A-Z])/g, '$1 $2')
                        } 
                    </label>
                    <input className="w-full rounded-lg border border-violet-900 bg-violet-100" defaultValue={personalData[property]} name={property}  onChange={changeInput} onClick={(e) => e.preventDefault()}/>
                </div>
            );
        }
        else if (dateInputs.includes(property)) {
            const dateString = personalData[property].toLocaleDateString();
            return (
                <div key={property} className="mb-4">
                    <label className="block text-sm font-bold mb-2 text-left">
                        {
                            property.replace(property[0], property[0]?.toUpperCase()).replace(/([a-z])([A-Z])/g, '$1 $2')
                        } 
                    </label>
                    <input className="w-1/4 rounded-lg border border-violet-900 bg-violet-100" defaultValue={dateString} name={property} onChange={changeInput} type="date"/>
                </div>
            );
        }
        else if (textAreaInputs.includes(property)) {
            return (
                <div key={property} className="mb-4">
                    <label className="block text-sm font-bold mb-2 text-left">
                        {
                            property.replace(property[0], property[0]?.toUpperCase()).replace(/([a-z])([A-Z])/g, '$1 $2')
                        } 
                    </label>
                    <textarea className="w-full rounded-lg border border-violet-900 bg-violet-100" defaultValue={personalData[property]} name={property} />
                </div>
            );
        }
        else if (checkboxInputs.includes(property)) {
            return (
                <div key={property} className="mb-4">
                    <label className="block text-sm font-bold mb-2 text-left">
                        {
                            property.replace(property[0], property[0]?.toUpperCase()).replace(/([a-z])([A-Z])/g, '$1 $2')
                        } 
                    </label>
                    <input className="w-full rounded-lg border border-violet-900 bg-violet-100" defaultValue={personalData[property]} name={property} type="checkbox" onClick={(e) => e.preventDefault()}/>
                </div>

            );
        }
        else if (property in dropdownInputs) {
            return (
                <div key={property} className="mb-4">
                    <label className="block text-sm font-bold mb-2 text-left">
                        {
                            property.replace(property[0], property[0]?.toUpperCase()).replace(/([a-z])([A-Z])/g, '$1 $2')
                        } 
                    </label>
                    <select className="w-1/4 bg-inherit rounded-lg border border-violet-900 bg-violet-100" defaultValue={personalData[property]} name={property} onChange={changeInput}>
                        {
                            dropdownInputs[property].map((dropdownOption) => {
                                return (
                                <option value={dropdownOption}>{dropdownOption}</option>
                                )
                            })
                        }
                    </select>
                </div>
            );
        }
        return;

    };

    const getAge = (date: Date) => {
        const today = new Date();
        let age = today.getFullYear() - date.getFullYear();
        const month = today.getMonth() - date.getMonth();
        if (month < 0 && today.getDate() < date.getDate()) {
            age -= 1;
        }
        return age;
    };


    const switchTab = (e) => {
        console.log(personalData);
        setPersonalData(personalData);
        setTab(e.target.id);
    };
    const tabContents = (tab: string) => {
        const personalInfo = ["name", "gender", "dateOfBirth", "placeOfBirth"];
        const lifeEvents = ["dateOfDeath", "placeOfDeath", "causeOfDeath", "maritalStatus"];
        const biographicalInfo = ["biographicalInfo", "medicalHistory", "injuries", "stories", "accomplishments", "religiousAffiliation", "ethnicity", "militaryService", "occupation", "placeOfResidence", "socialMediaLinks"];
        const additionalInfo = ["mentalHealthHistory", "immigrationDetails", "languagesSpoken", "nickname", "favoriteQuotes", "favoriteHobbies", "pets", "travelHistory", "politicalAffiliation", "religiousPractices", "favoriteMedia", "businessVentures", "familyTraditions", "criminalRecord", "genealogicalRecord", "educationHistory", "specialAchievements"];
        switch (tab) {
            case "personalInfo":
                return (
                        personalInfo.map((key) => {
                            return renderInputType(key);
                        })
                );
            case "lifeEvents":
                return (
                        lifeEvents.map((key) => {
                            return renderInputType(key);
                        })
                );
            case "biographicalInfo":
                return (
                        biographicalInfo.map((key) => {
                            return renderInputType(key);
                        })
                );
            case "additionalInfo":
                return (
                        additionalInfo.map((key) => {
                            return renderInputType(key);
                        })
                );
            default:
                return (
                    <div></div>
                );
        }

    }
    return (
        <div>
            <h1 className="text-lg text-bold">
                {
                    fnNames[0]
                }
            </h1>
            <ul className="flex justify-center space-x-5">
                <li className="text-lg">
                    {
                        tab === "personalInfo" ?
                            (
                            <button id="personalInfo" className="bg-indigo-600 text-white px-3 rounded" onClick={switchTab}>
                                Personal Info
                            </button>
                            )
                        :
                            (
                            <button id="personalInfo" className="focus:text-white px-3 rounded" onClick={switchTab}>
                                Personal Info
                            </button>
                            )

                    }
                </li>
                <li className="text-lg">
                    {
                        tab === "lifeEvents" ?
                        (
                            <button id="lifeEvents" className="bg-indigo-600 text-white px-3 rounded" onClick={switchTab}>
                                Life Events
                            </button>
                        )
                        :
                        (
                            <button id="lifeEvents" className="px-3 rounded" onClick={switchTab}>
                                Life Events
                            </button>
                        )
                    }
                </li>
                <li className="text-lg">
                    {
                        tab === "biographicalInfo" ?
                        (
                            <button id="biographicalInfo" className="bg-indigo-600 text-white px-3 rounded" onClick={switchTab}>
                                Biographical Information
                            </button>
                        )
                        :
                        (
                            <button id="biographicalInfo" className="px-3 rounded" onClick={switchTab}>
                                Biographical Information
                            </button>
                        )
                    }
                    
                </li>
                <li className="text-lg">
                    {
                        tab === "additionalInfo" ?
                        (
                            <button id="additionalInfo" className="bg-indigo-600 text-white px-3 rounded" onClick={switchTab}>
                                Additional Information
                            </button>
                        )
                        :
                        (
                            <button id="additionalInfo" className="px-3 rounded" onClick={switchTab}>
                                Additional Information
                            </button>
                        )
                    }
                </li>
            </ul>
            <div className="grid grid-cols-2 m-5 gap-3">
            {
                tabContents(tab)
            }
            </div>

           {
            nodeFns.map((fn, index) => {
                return (
                    <button className="hover:bg-indigo-600 hover:text-white rounded px-3" onClick={() => submitPerson(fn)} key={fnNames[index]}>
                        {fnNames[index]}
                    </button>
                )
            })
           }
        </div>
    )

}

AncestryInfo.defaultProps = defaultProps;

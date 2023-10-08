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


export interface AddNodeType {
    nodeFns: (() => void)[];
    fnNames: string[];
}


export const AncestryInfo: React.FC<AddNodeType> = (props: AddNodeType) => {
    const {nodeFns, fnNames } = props
    const [personalData, setPersonalData] = useState<PersonalData>({
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
    const [personNode, setPersonNode] = useState<PersonNode>();
    const [tab, setTab] = useState<string>("personalInfo");
    const [isAlive, setIsAlive] = useState<boolean>(true);

    const changeInput = (event) => {
        event.preventDefault();
        if (event.target.name in personalData) {
            personalData[event.target.name] = event.target.value;  
        }
    };

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
                    <input name={property}  onChange={changeInput} onClick={(e) => e.preventDefault()}/>
                </div>
            );
        }
        else if (dateInputs.includes(property)) {
            return (
                <div key={property} className="mb-4">
                    <label className="block text-sm font-bold mb-2 text-left">
                        {
                            property.replace(property[0], property[0]?.toUpperCase()).replace(/([a-z])([A-Z])/g, '$1 $2')
                        } 
                    </label>
                    <input name={property} type="date"/>
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
                    <textarea name={property} />
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
                    <input name={property} type="checkbox" onClick={(e) => e.preventDefault()}/>
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
                    <select name={property} onChange={changeInput}>
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
            <h1 className="text-lg">
                Ancestry Information
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
                            <button id="biographicalInfo" className="focus:bg-indigo-600 focus:text-white px-3 rounded" onClick={switchTab}>
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
            <div className="grid grid-cols-2 m-5">
            {
                tabContents(tab)
            }
            </div>

           {
            nodeFns.map((fn, index) => {
                return (
                    <button onClick={fn} key={fnNames[index]}>
                        {fnNames[index]}
                    </button>
                )
            })
           }
        </div>
    )

}

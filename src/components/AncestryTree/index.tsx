import { useSession } from "next-auth/react";
import { useState, useRef } from "react";
import {type AncestryNode, Ancestry, type PersonNode, type SpousalNode} from './nodes';

import { AncestryInfo } from "./ancestryInfo";


const AncestryTree: React.FC = () => {
    const { data: session, status } = useSession();
    const userId = session?.user?.id || null;
    const name = session?.user?.name || null;
    const [count, setCount] = useState<number>(0);
    const [id, setId] = useState<string>("");
    const person = {
        name: {
            firstName: "",
            middleName: "",
            lastName: ""
        },
        gender: "",
        dateOfBirth: new Date("10-06-2023"), 
        placeOfBirth: {
            city: "",
            state: "",
            country: ""
        },
        alive: false,
        dateOfDeath: new Date("10-06-2023"),
        placeOfDeath: {
            city: "",
            state: "",
            country: ""
        },
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
    };
    const [ancestry, setAncestry] = useState<AncestryNode>({
        item: {
            id: userId ? userId : "",
            name: name ? name : "",
            age: -1,
            place_of_birth: ""

        },
        branches: []
    });

    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [showChild, setShowChild] = useState<boolean>(false);
    const [showParent, setShowParent] = useState<boolean>(false);
    const [showSpouse, setShowSpouse] = useState<boolean>(false);

    const addNodeForm = (event: any) => {
        event.preventDefault();
        setId(event.target.id);
        setShowPopup(true);
    };

    const findNode = (id: string) => {
        console.log(id);
        const copyAncestry = ancestry;
        let searchTargets = [copyAncestry]
        while (searchTargets.length > 0) {
            const node = searchTargets.shift();
            if (!node) {
                return null;
            }
            searchTargets = searchTargets.concat(node.branches);
            if (id === node?.item.id) {
                return node;
            }
            else if ("main_person" in node.item) {
                if (id === node?.item.main_person.id) {
                    return node;
                }
                if (id === node?.item.spouse.id) {
                    return node
                }
            }
        }
        return null;
    };

    
    const addPerson = (person: PersonNode) => {
        ancestry.item = person;
        setAncestry(ancestry);
        setShowPopup(false);
    }

    const editPerson = (person: PersonNode) => {
        const currentNode = findNode(id);
        if (currentNode === null) {
            alert('Node not found!');
            return;
        }
        currentNode.item = person;
        setShowPopup(false);
        setShowEdit(false);
    }

    const addParent = (parent: PersonNode) => {
        const currentNode = findNode(id);
        if (currentNode === null) {
            alert('Node not found!');
            return;
        }
        const newAncestry = {
            item: parent,
            branches: [currentNode]
        }
        setAncestry(newAncestry);
        
        setShowPopup(false);
        setShowParent(false);
        return;
    }

    const addChild = (child: PersonNode) => {
        const currentNode = findNode(id);
        currentNode?.branches.push({item:child, branches:[]});
        setShowPopup(false);
        setShowChild(false);
    }

    const addSpouse = (spouse: PersonNode) => {
        const currentNode = findNode(id);
        if (!currentNode) {
            alert('Node not found!');
            return;
        }
        if ("main_person" in currentNode.item) {
            alert("Can't add spouse already married spouse")
            return;
        }
        currentNode.item = {
            id: Date.now().toString(),
            main_person: (currentNode.item as PersonNode),
            spouse: spouse
        }
        setShowPopup(false);
        setShowSpouse(false);
    }

    const cancel = () => {
        setShowPopup(false);
        setShowEdit(false);
        setShowParent(false);
        setShowSpouse(false);
        setShowChild(false);
    }

    const chooseNodeType = () => {
        if (!showEdit && !showParent && !showSpouse && !showChild ) {
            return (
                <div className="grid grid-cols-2">
                    <div>

                        <button className="border rounded-full p-3 bg-indigo-600 text-white" onClick={() => setShowEdit(true)}>
                            Edit Person
                        </button> 
                    </div>
                    <div className="flex flex-col gap-3">
                        <div>
                        <button className="border rounded-full p-3 bg-indigo-600 text-white" onClick={() => setShowParent(true)}>
                            Add Parent
                        </button> 
                        </div>
                        <div>
                        <button className="border rounded-full p-3 bg-indigo-600 text-white" onClick={() => setShowSpouse(true)}>
                            Add Spouse
                        </button> 
                        </div>
                        <div>
                        <button className="border rounded-full p-3 bg-indigo-600 text-white" onClick={() => setShowChild(true)}>
                            Add Child
                        </button> 
                        </div>
                    </div>
                </div>
            );
        }
        if (showEdit) {
            const currentPerson = (findNode(id)?.item as PersonNode);
            return (
                <AncestryInfo person={currentPerson.personalData} nodeFns={[editPerson, cancel]} fnNames={["Edit Information", "Go Back"]} />
            ); 
        }
        if (showParent) {
            return (
                <AncestryInfo person={person} nodeFns={[addParent, cancel]} fnNames={["Add Parent", "Go Back"]} />
            ); 
        }
        if (showSpouse) {
            return (
                <AncestryInfo person={person} nodeFns={[addSpouse, cancel]} fnNames={["Add Spouse", "Go Back"]} />
            ); 
        }
        if (showChild) {
            return (
                <AncestryInfo person={person} nodeFns={[addChild, cancel]} fnNames={["Add Child", "Go Back"]} />
            ); 
        }
        return (
            <div></div>
        );
    }

    return(
        <div className="w-screen height-screen">
            <h1 className="text-lg">
                Ancestry Tree
            </h1>
            {
                showPopup ?
                (
                    ancestry.item.id ? 
                    (
                        chooseNodeType()
                    )
                    :
                    (
                        <AncestryInfo nodeFns={[addPerson]} fnNames={["Add Person"]} />
                    )
                )
                :
                (
                    <div>
                        <Ancestry item={ancestry.item} branches={ancestry.branches} clickFunc={addNodeForm} />
                    </div>

                )

            }
        </div>
    )
}

export default AncestryTree;
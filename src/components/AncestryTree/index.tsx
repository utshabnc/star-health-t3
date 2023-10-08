import { useSession } from "next-auth/react";
import { useState, useRef } from "react";
import { set, update } from "lodash";
import {type AncestryNode, Ancestry, type PersonNode, type SpousalNode} from './nodes';

import { AncestryInfo } from "./ancestryInfo";


const AncestryTree: React.FC = () => {
    const { data: session, status } = useSession();
    const userId = session?.user?.id || null;
    const name = session?.user?.name || null;
    const [count, setCount] = useState<number>(0);
    const [id, setId] = useState<string>("");
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

    const addNodeForm = (event) => {
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
            searchTargets = searchTargets.concat(node.branches);
            console.log(`Current Item Id: ${node?.item.id}\n Searching Id:${id}`);
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
            console.log(searchTargets);
        }
        return null;
    };

    

    const addPerson = (person: PersonNode) => {
        ancestry.item = person;
        setAncestry(ancestry);
        setShowPopup(false);
    }

    const addParent = (parent: PersonNode) => {
        const currentNode = findNode(id);
        if (currentNode === null) {
            alert('Node not found!');
        }
        const newAncestry = {
            item: parent,
            branches: [currentNode]
        }
        setAncestry(newAncestry);
        
        setShowPopup(false);
        setCount(count + 1);
        return;
    }

    const addChild = (child: PersonNode) => {
        const child_demo = {
            id: "childid",
            name: "Child Person",
            age: 5,
            place_of_birth: "San Jose, CA, USA"
        };
        const currentNode = findNode(id);
        currentNode?.branches.push({item:child_demo, branches:[]});
        setShowPopup(false);
    }

    const addSpouse = (spouse: PersonNode) => {
        const spouse_demo = {
            id: "spouseid",
            name: "Spuse Person",
            age: 25,
            place_of_birth: "San Jose, CA, USA"
        };
        const currentNode = findNode(id);
        if (!currentNode) {
            alert('Node not found!');
            return
        }
        if ("main_person" in currentNode.item) {
            alert("Can't add spouse already married spouse")
            return
        }
        currentNode.item = {
            id: "spousalId",
            main_person: (currentNode.item as PersonNode),
            spouse: spouse_demo
        }
        setShowPopup(false);
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
                        <AncestryInfo nodeFns={[addParent, addChild, addSpouse]} fnNames={["Add Parent", "Add Child", "Add Spouse"]}/>
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
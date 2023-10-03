import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {GrClose} from 'react-icons/gr'
import { toTitleCase } from "../../utils";
import FoodAutocompleteInput from "../FoodAutoCompleteInput";
import FoodDetailsTable from "../FoodDetailsTable";
import LoadingStarHealth from "../Loading";
import { IconContext } from "react-icons";
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsChevronCompactRight } from "react-icons/bs";
import {MdWaterDrop} from 'react-icons/md'
import { set, update } from "lodash";
import { toast } from "react-toastify";
import {PersonNode, Person, SpousalNode, Spouse, AncestryNode, Ancestry} from './nodes';


const AncestryTree: React.FC = () => {
    const { data: session, status } = useSession();
    const userId = session?.user?.id || null;


    const style = {
        width: '100vw',
        height: '100vh',
    };

    const person1: PersonNode = {
        id: "#stanley",
        name: "Stanley Armstrong",
        age: 24,
        place_of_birth: "San Jose, CA, USA"
    }
    const person2: PersonNode = {
        id: "#spouse",
        name: "Spouse Name",
        age: 24,
        place_of_birth: "San Jose, CA, USA"
    }
    const person3: PersonNode = {
        id: "#child",
        name: "Child",
        age: 2,
        place_of_birth: "San Jose, CA, USA"
    }

    const person4: PersonNode = {
        id: "#child1",
        name: "Child1",
        age: 4,
        place_of_birth: "San Jose, CA, USA"
    }
    const person5: PersonNode = {
        id: "#grandchild",
        name: "GrandChild",
        age: 2,
        place_of_birth: "San Jose, CA, USA"
    }

    const person6: PersonNode = {
        id: "#grandchild1",
        name: "GrandChild1",
        age: 4,
        place_of_birth: "San Jose, CA, USA"
    }

    const spouse = {
        id: "#marriage",
        main_person: person1,
        spouse: person2
    };

   const ancestry_tree = {
    item: spouse,
    branches: [
        {
            item: person3,
            branches: [{
                item: person5,
                branches: []
            }, {
                item: person6,
                branches: []
            }]
        },
        {
            item: person4,
            branches: []
        }
    ]
   }

    
    return(
        <div className="flex" style={style}>
            <Ancestry item={ancestry_tree.item} branches={ancestry_tree.branches} />
        </div>
    )
}

export default AncestryTree;
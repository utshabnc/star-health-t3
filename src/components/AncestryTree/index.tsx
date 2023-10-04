import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { set, update } from "lodash";
import {PersonNode, Person, SpousalNode, Spouse, AncestryNode, Ancestry} from './nodes';


const AncestryTree: React.FC = () => {
    const { data: session, status } = useSession();
    const userId = session?.user?.id || null;
    const name = session?.user?.name || null;

    const [ancestry, setAncestry] = useState<AncestryNode>({
        item: {
            id: userId ? userId : "",
            name: name ? name : "",
            age: -1,
            place_of_birth: ""

        },
        branches: []
    });

    // use when the node is undefined
    const addSelf = (person: PersonNode) => {
        setAncestry({
            item: person,
            branches: []
        })
    }

    // use when adding a parent to a node
    const addParent = (parent: PersonNode) => {
        setAncestry({
            item: parent,
            branches: [ancestry]
        })
    };

    const addChild = (child: PersonNode) => {
        return;
    };

    const addSpouse = (spouse: PersonNode) => {
        return;
    }

    return(
        <div className="w-screen height-screen">
            <Ancestry item={ancestry.item} branches={ancestry.branches} />
        </div>
    )
}

export default AncestryTree;
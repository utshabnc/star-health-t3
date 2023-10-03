import { useEffect, useState } from "react";
import Xarrow from "react-xarrows";

export interface PersonNode {
    id: string;
    name: string;
    age: number;
    place_of_birth: string;
}
export interface SpousalNode {
    id: string,
    main_person: PersonNode;
    spouse: PersonNode;
}

export interface AncestryNode {
    item: PersonNode | SpousalNode;
    branches: AncestryNode[];
}


export const Person: React.FC<PersonNode> = (props: PersonNode) => {
    const {id, name, age, place_of_birth} = props;

    return (
        <div>
            <button id={id} className="m-4 p-4 border-2 rounded-full border-stone-500 hover:border-indigo-600 object-contain">
                <h3>{name}</h3>
                <p className="text-slate-400">Age: {age} </p>
                <p className="text-slate-400">From: {place_of_birth} </p>
            </button>
        </div>
    )

}

export const Spouse: React.FC<SpousalNode> = (props: SpousalNode) => {
    const {id, main_person, spouse} = props;
    return (
        <div id={id} className="flex flex-row justify-center">
            <Person id={main_person.id} name={main_person.name} age={main_person.age} place_of_birth={main_person.place_of_birth} />
            <Xarrow start={main_person.id} end={spouse.id}  showHead={false} lineColor={"#4C25DF"}/>
            <Person id={spouse.id} name={spouse.name} age={spouse.age} place_of_birth={spouse.place_of_birth} />
        </div>
    )
}


export const Ancestry: React.FC<AncestryNode> = (props: AncestryNode) => {
    const {item, branches} = props;

    const edges = branches.map((branch) => {
        return <Xarrow start={item.id} end={branch.item.id} showHead={false} startAnchor={"bottom"} endAnchor={"top"} lineColor={"#4C25DF"} key={branch.item.id}/>
    });

    const branchNodes = branches.map((branch) => {
        return <Ancestry item={branch.item} branches={branch.branches} key={branch.item.id} />
    })
    
    return (
        <div className="flex flex-col justify-center">
            {
                'name' in item ? 
                    <Person id={item.id} name={item.name} age={item.age} place_of_birth={item.place_of_birth} />
                :   
                    <Spouse id={item.id} main_person={item.main_person} spouse={item.spouse} />
            }
            {
                edges
            }
        <div className="flex flex-row justify-center">
            {
                branchNodes
            }
        </div>

        </div>
    )
}
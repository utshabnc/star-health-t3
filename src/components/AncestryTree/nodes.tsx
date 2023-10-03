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
        <div id={id} className="rounded-full">
            <button className="rounded-full">
                <h3>{name}</h3>
                <p>Age: {age} </p>
                <p>Place Of Birth: {place_of_birth}</p>
            </button>
        </div>
    )

}

export const Spouse: React.FC<SpousalNode> = (props: SpousalNode) => {
    const {id, main_person, spouse} = props;
    return (
        <div id={id} className="flex flex-row space-x-5">
            <Person id={main_person.id} name={main_person.name} age={main_person.age} place_of_birth={main_person.place_of_birth} />
            <Xarrow start={main_person.id} end={spouse.id} showHead={false} lineColor={"#4C25DF"}/>
            <Person id={spouse.id} name={spouse.name} age={spouse.age} place_of_birth={spouse.place_of_birth} />
        </div>
    )
}


export const Ancestry: React.FC<AncestryNode> = (props: AncestryNode) => {
    const {item, branches} = props;

    const edges = branches.map((branch) => {
        return <Xarrow start={item.id} end={branch.item.id} showHead={false} lineColor={"#4C25DF"} key={branch.item.id}/>
    });

    const branchNodes = branches.map((branch) => {
        return <Ancestry item={branch.item} branches={branch.branches} key={branch.item.id} />
    })
    
    return (
        <div>
            {
                'name' in item ? 
                    <Person id={item.id} name={item.name} age={item.age} place_of_birth={item.place_of_birth} />
                :   
                    <Spouse id={item.id} main_person={item.main_person} spouse={item.spouse} />
            }
            {
                edges
            }
        <div className="flex flex-row">
            {
                branchNodes
            }
        </div>

        </div>
    )
}
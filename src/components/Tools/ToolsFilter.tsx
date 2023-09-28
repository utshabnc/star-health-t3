import { useEffect, useRef, useState } from "react";
import { getNutritionByText } from './httpsRequests'
import { catchError, finalize } from "rxjs";
import text2nutrients from "../../assets/logos/text2nutrients.png";
import recipesimg from "../../assets/logos/recipes.png";
import ToolsTab from "./ToolsTab";
import Compare from "../../components/Compare";
import MentalHealthDiary from "../../components/MentalHealthDiary";
import DrugJournal from "../../components/DrugJournal/DrugJournal";
import ExerciseTracker from "../../components/ExerciseTracker/ExerciseTracker";
import PatientIntakeForm from "../../components/PatientIntakeForm/PatientIntakeForm";
import FoodJournal from "../../components/FoodJournal/FoodJournal";
import SubstanceTracker from "../../components/SubstanceTracker/SubstanceTracker";

import { useRouter } from "next/router";

export default function ToolsFilter() {

     const ref = useRef<HTMLDivElement>(null)
    const [tool, setTool] = useState<string>("");

    const [tableHtml, setTableHtml] = useState<string>("");
    const [recipeHtml, setRecipeHtml] = useState<string>("");

    const [showNutritions, setShowNutritions] = useState(false);
    const [showRecipes, setShowRecipes] = useState(false);

    const navigate = useRouter();
    const toolName = navigate.query?.tab;
    console.log(toolName);

    useEffect(() => {
        if (!!toolName) {
            setTool(toolName as string);
            setShowNutritions(false);
            setShowRecipes(false);
        }
        if (ref.current) {
             ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

    }, [toolName, setTool, setShowNutritions, setShowRecipes]);


    const features = [{
        label: "Text 2 Nutrients",
        img: text2nutrients,
        route: '/tools',
        linkparam: 'text_input'
    },
    {
        label: "Recipes",
        img: recipesimg,
        route: '/tools',
        linkparam: 'recipe'
        },
    {
        label: "Comparison Tool",
        img: recipesimg,
        route: '/tools',
        linkparam: 'comparison'
        },
    {
        label: "Mental Health Diary",
        img: recipesimg,
        route: '/tools',
        linkparam: 'mental_health_diary'
        },
    {
        label: "Drug Journal",
        img: recipesimg,
        route: '/tools',
        linkparam: 'drug_journal'
        },
    {
        label: "Exercise Tracker",
        img: recipesimg,
        route: '/tools',
        linkparam: 'exercise_tracker'
        },
    {
        label: "Patient Intake Form",
        img: recipesimg,
        route: '/tools',
        linkparam: 'patient_intake_form'
        },
    {
        label: "Food Journal",
        img: recipesimg,
        route: '/tools',
        linkparam: 'food_journal'
        },
    {
        label: "Substance Tracke",
        img: recipesimg,
        route: '/tools',
        linkparam: 'substance_tracker'
        },
    ];

    const NutritioinTextInput = () => {
        return (
            <div className="">
                <input
                    type="text"
                    placeholder="Type in food eaten..."
                    className={`my-2 mx-1 w-[30%] cursor-pointer rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900`}
                    id='foodInput'
                />
                <button
                    className="mx-1 cursor-pointer rounded-lg border border-violet-900 bg-transparent p-1 text-sm text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
                    onClick={() => {
                        const foodText = (document.getElementById('foodInput') as HTMLInputElement).value;
                        getNutritionByText(foodText)
                            .pipe(
                                catchError((error) => {
                                    console.error("Error fetching getNutritionByText:", error);
                                    return [];
                                })
                            )
                            .subscribe((resp: any) => {
                                if (!!resp?.response?.items)
                                    renderTable(resp?.response?.items);
                                else
                                    console.log(resp?.response);

                            });
                    }}>
                    Get Nutritions
                </button>
            </div>
        )
    }


    const Recipe = () => {
        return (
            <div>
                <input
                    type="text"
                    placeholder="Type in food..."
                    className={`
            my-2 mx-1 w-[30%] cursor-pointer rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900`}
                    id='recipeInput'
                />
                <button
                    className="mx-1 cursor-pointer rounded-lg border border-violet-900 bg-transparent p-1 text-sm text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
                    onClick={async () => {
                        const recipeFoodText = (document.getElementById('recipeInput') as HTMLInputElement).value;
                        try {
                            const response = await fetch(`/api/tools/getRecipe?recipe=${encodeURIComponent(recipeFoodText)}`);
                            const data = await response.json();
                            // console.log(data);

                            renderRecipeTable(data);
                        } catch (error) {
                            console.error(error);
                        }
                    }}>
                    Get Recipes
                </button>
                {/* <button
                disabled={recipeNum==0}
                className={recipeNum==0 || recipeId==0? 
                    "mx-1 rounded-lg border bg-transparent p-1 text-sm text-slate-500"
                    : "mx-1 rounded-lg border border-violet-900 bg-transparent p-1 text-sm text-slate-900 cursor-pointer placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"}

                onClick={()=>{
                    if(recipeId>0){
                        const id = recipeId-1;
                        setRecipeId(id);
                        renderRecipeTable(recipes, id);
                    }
                    }}>
                    Previous
            </button>
            <button
                disabled={recipeNum==0}
                className={recipeNum==0 || (recipeId==recipeNum-1)? 
                    "mx-1 rounded-lg border bg-transparent p-1 text-sm text-slate-500"
                    : "mx-1 rounded-lg border border-violet-900 bg-transparent p-1 text-sm text-slate-900 cursor-pointer placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"}
                onClick={()=>{
                    if(recipeId<recipeNum-1){
                        const id = recipeId+1;
                        setRecipeId(id);
                        renderRecipeTable(recipes, id);
                    }
                    }}>
                    Next
            </button> */}
            </div>
        )
    };

    const NutritionTableHead = () => {
        if (!showNutritions) {
            return null;
        }
        const texts = ['Name',
            'Calories',
            'Serving Size (g)',
            'Fat Total (g)',
            'Fat Saturated (g)',
            'Protein (g)',
            'Sodium (mg)',
            'Potassium (mg)',
            'Cholesterol (mg)',
            'Carbohydrates Total (g)',
            'Fiber (g)',
            'Sugar (g)'
        ]

        const tableHeadTxt = texts.map(t => `<th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">${t}</th>`).join('');

        return (
            <div id="foodTable" className="min-w-full divide-y divide-gray-200">

                <table className="min-w-full divide-y divide-gray-200" style={{ borderCollapse: 'collapse' }}>
                    <thead className="thead-dark">
                        <tr dangerouslySetInnerHTML={{ __html: tableHeadTxt }}></tr>
                    </thead>
                    <tbody dangerouslySetInnerHTML={{ __html: tableHtml }}>
                    </tbody>
                </table>
            </div>
        )
    }

    const RecipeTableHead = () => {
        if (!showRecipes) {
            return null;
        }
        const texts = ['Title',
            'Ingredients',
            'Servings',
            'Instructions'
        ]

        const tableHeadTxt = texts.map(t => `<th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">${t}</th>`).join('');

        return (
            <div id="recipeTable" className="min-w-full divide-y divide-gray-200">

                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="thead-dark">
                        <tr dangerouslySetInnerHTML={{ __html: tableHeadTxt }}></tr>
                    </thead>
                    <tbody dangerouslySetInnerHTML={{ __html: recipeHtml }}>
                    </tbody>
                </table>
            </div>
        )
    }


    const renderTable = (items: Array<any>) => {
        if (!!items && items.length > 0) {
            const classText = `className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"`;

            let html = "<tr>" +
                `<td ${classText}>Total</td>` +
                `<td ${classText}>${items.reduce((acc, item) => acc + item.calories, 0).toFixed(2)}</td>` +
                `<td ${classText}>${items.reduce((acc, item) => acc + item.serving_size_g, 0).toFixed(2)}</td>` +
                `<td ${classText}>${items.reduce((acc, item) => acc + item.fat_total_g, 0).toFixed(2)}</td>` +
                `<td ${classText}>${items.reduce((acc, item) => acc + item.fat_saturated_g, 0).toFixed(2)}</td>` +
                `<td ${classText}>${items.reduce((acc, item) => acc + item.protein_g, 0).toFixed(2)}</td>` +
                `<td ${classText}>${items.reduce((acc, item) => acc + item.sodium_mg, 0).toFixed(2)}</td>` +
                `<td ${classText}>${items.reduce((acc, item) => acc + item.potassium_mg, 0).toFixed(2)}</td>` +
                `<td ${classText}>${items.reduce((acc, item) => acc + item.cholesterol_mg, 0).toFixed(2)}</td>` +
                `<td ${classText}>${items.reduce((acc, item) => acc + item.carbohydrates_total_g, 0).toFixed(2)}</td>` +
                `<td ${classText}>${items.reduce((acc, item) => acc + item.fiber_g, 0).toFixed(2)}</td>` +
                `<td ${classText}>${items.reduce((acc, item) => acc + item.sugar_g, 0).toFixed(2)}</td></tr>`;


            items.forEach((item: any) => {
                html = html + "<tr>" +
                    `<td ${classText}>${item.name}</td>` +
                    `<td ${classText}>${item.calories}</td>` +
                    `<td ${classText}>${item.serving_size_g}</td>` +
                    `<td ${classText}>${item.fat_total_g}</td>` +
                    `<td ${classText}>${item.fat_saturated_g}</td>` +
                    `<td ${classText}>${item.protein_g}</td>` +
                    `<td ${classText}>${item.sodium_mg}</td>` +
                    `<td ${classText}>${item.potassium_mg}</td>` +
                    `<td ${classText}>${item.cholesterol_mg}</td>` +
                    `<td ${classText}>${item.carbohydrates_total_g}</td>` +
                    `<td ${classText}>${item.fiber_g}</td>` +
                    `<td ${classText}>${item.sugar_g}</td></tr>`;

            });
            setShowNutritions(true);

            setTableHtml(html);
        } else {
            setShowNutritions(false);
            setTableHtml('');
            alert('No nutritions found!');
        }
    };

    const renderRecipeTable = (items: Array<any>) => {
        if (!!items && items.length > 0) {
            const classText = `className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"`;

            let html = "";

            items.forEach((item: any) => {

                const ingredtxt = item.ingredients.split('|').join('</br>');
                html = html + "<tr style='border-bottom: #e5e7eb 1px solid;max-height: 100px; overflow: hidden;'>" +
                    `<td ${classText}>${item.title}</td>` +
                    `<td className="px-8 py-3 text-left text-xs font-small text-gray-900 uppercase tracking-wider" style="width: 300px;">${ingredtxt}</td>` +
                    `<td ${classText}>${item.servings}</td>` +
                    `<td ${classText} style="padding: 0 100px;">${item.instructions}</td></tr>`;
            });

            setShowRecipes(true);
            setRecipeHtml(html);

        } else {
            setShowRecipes(false);
            setRecipeHtml('');
            alert('No recipes found!');
        }
    };

    const renderComponent = () => {
        switch (tool) {
            case 'text_input':
                return <NutritioinTextInput />;
                break;
            case 'recipe':
                return <Recipe />;
            case 'comparison':
                return <Compare />;
                break;
            case 'mental_health_diary':
                return <MentalHealthDiary />;
                break;
            case 'drug_journal':
                return <DrugJournal  />;
                break;
            case 'exercise_tracker':
                return <ExerciseTracker />;
                break;
            case 'patient_intake_form':
                return <PatientIntakeForm  />;
                break;
            case 'food_journal':
                return <FoodJournal />;
                break;
            case 'substance_tracker':
                return <SubstanceTracker />;
                break;
            default:
                return null;
        }
    };

    const renderResult = () => {
        switch (tool) {
            case 'text_input':
                return <NutritionTableHead />;
            case 'recipe':
                return <RecipeTableHead />;
            default:
                return null;
        }
    };

    return (
        <>
            <div className="w-full">
                <div>
                     <h1 className="text-4xl border-b border-black">Tools</h1>
                    <div className="filters flex w-full items-center">
                        <div className="wrap-filters flex w-full items-center py-2"
                        >
                            <ToolsTab
                                items={features}
                                textColor="font-custom"
                                boxStyle="tools-info-sec"
                                itemTextSpacing={true}
                            />
                        </div>
                    </div>
                </div>

                <div ref={ref} className="tools-container text-center border "
                >
                    {renderComponent()}
                    <div className="relative flex h-[100%] w-full justify-center">
                        {renderResult()}
                    </div>
                </div>
            </div>
        </>
    );
}
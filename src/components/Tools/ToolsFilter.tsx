import { useEffect, useRef, useState } from "react";
import { getNutritionByText } from './httpsRequests'
import { catchError, finalize } from "rxjs";

export default function ToolsFilter() {
    const [tool, setTool] = useState<string>("text_input");

const [tableHtml, setTableHtml] = useState<string>("");
    const [recipeHtml, setRecipeHtml] = useState<string>("");
    const [recipeNum, setRecipeNum] = useState(0);
    const [recipeId, setRecipeId] = useState(0);
    const [recipes, setRecipes] = useState([]);

    const NutritioinTextInput = () => {
        return (
            <div>
                <input
                type="text"
                placeholder="Type in food data..."
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
                                console.log(resp?.response);
                                if(!!resp?.response?.items)
                                    renderTable(resp?.response?.items);
                            });
                    }}>
                    Get Nutrition
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
                        console.log(data);
                        setRecipes(data);
                        setRecipeNum(data.length);
                        setRecipeId(0);
                        let cnt = 0;

                        renderRecipeTable(data,0);
                    } catch (error) {
                        console.error(error);
                    }
                }}>
                Get Recipe
            </button>
            <button
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
            </button>
        </div>
    )
};

    const NutritionTableHead = () => {
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

                <table className="min-w-full divide-y divide-gray-200" style={{ borderCollapse: 'collapse'}}>
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
        if (!!items) {
            const classText = `className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"`;

            let html =  "<tr>" +
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
            setTableHtml(html);
        } else {
            setTableHtml('');
        }
    };

    const renderRecipeTable = (items: Array<any>, id) => {
        if (!!items && items.length > 0) {
            const classText = `className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"`;

            let html =  "";

            const item = items[id];

            const ingredtxt = item.ingredients.split('|').join('</br>');
            html = html + "<tr style='border-bottom: #e5e7eb 1px solid;max-height: 100px; overflow: hidden;'>" +
            `<td ${classText}>${item.title}</td>` +
            `<td className="px-8 py-3 text-left text-xs font-small text-gray-900 uppercase tracking-wider" style="width: 200px;">${ingredtxt}</td>` +
            `<td ${classText}>${item.servings}</td>` +
            `<td ${classText}>${item.instructions}</td></tr>`;

            setRecipeHtml(html);
        } else {
            setRecipeHtml('');
        }
    };

    const renderComponent = () => {
        switch (tool) {
          case 'text_input':
            return <NutritioinTextInput/>;
          case 'recipe':
            return <Recipe/>;
            default:
                return null;
        }
      };

      const renderResult = () => {
        switch (tool) {
          case 'text_input':
            return <NutritionTableHead/>;
          case 'recipe':
            return <RecipeTableHead/>;
            default:
                return null;
        }
      };

    return (
        <>
            <div className="w-full">
                <div>
                    <div className="filters flex w-full items-center">
                        <div className="wrap-filters flex w-full items-center py-2">
                            <select
                                className="my-2 mx-5 w-[20%] cursor-pointer rounded-lg bg-violet-500 p-1 text-white hover:bg-violet-400 hover:text-violet-900"
                                onChange={(e) => {
                                    setTool(e.target.value);
                                    setTableHtml('');
                                }}
                                defaultValue={tool}
                            >
                                <option value="text_input">
                                    Text Input
                                </option>
                                <option value="recipe">
                                    Recipes
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="tools-container text-center">
                    {renderComponent()}
                    {renderResult()}
                </div>
            </div>
        </>
    );
}
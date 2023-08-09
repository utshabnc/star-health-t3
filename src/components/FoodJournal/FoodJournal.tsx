import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { toTitleCase } from "../../utils";
import FoodAutocompleteInput from "../FoodAutoCompleteInput";
import Modal from '@mui/material/Modal';
import FoodDetailsTable from "../FoodDetailsTable";
import LoadingStarHealth from "../Loading";

const FoodJournal: React.FC = () => {

    const { data: session, status } = useSession();
    const userId = session?.user?.id || 'clkruomvr0000mj088c28m3a6';
    const [foodList,setFoodList]=useState<any[]>([])
    const [searchStr, setSearchStr] = useState<any>("");
    const [currentFood,setCurrentFood] = useState<any>()
    const [currentFoodDetails,setCurrentFoodDetails] = useState<any>()
    const [portionOptions,setPortionOptions]= useState<any[]>([])
    const [selectedPortion,setSelectedPortion]=useState(0)
    const [openFoodModal,setOpenFoodModal] = useState<boolean>(false)
    const [numOfServings,setNumOfServings]= useState<any>(1)
    const [showAll, setShowAll] = useState(false);
    const [mealDate,setMealDate]= useState<any>('')
    const [mealTime,setMealTime]= useState<any>('')
    const [foodJournalDate,setFoodJournalDate]=useState<any>('')
    const [foodJournalData,setFoodJournalData]=useState<any[]>([])
    const [foodJournalSummary,setFoodJournalSummary]=useState<any>({})
    const [openOverallNutrientsModal,setOpenOverallNutrientsModal]=useState<boolean>(false)
    const [addStatus,setAddStatus] = useState<number>(1)
    const [entryError,setEntryError] = useState<boolean>(false)
    function overallFoodNutrients() {
      let count=0;
      return (
        <div>
    {Object.entries(foodJournalSummary).map((nutrient: any) => {
      if (nutrient.number !== 0) {
        count++;
        return (
          <tr key={nutrient[0]} className={count % 2 == 0 ? "bg-violet-100" : ""}>
            <td className="w-[100%] px-4 py-1 whitespace-nowrap text-md text-gray-800">
              {nutrient[1].name}
            </td>
            <td className="px-4 py-1 whitespace-nowrap text-md text-gray-800">
              {(nutrient[1].amount+0).toFixed(2) + " " + nutrient[1].unit}
            </td>
          </tr>
        );
      }
    })}
    </div>
    )
    }

    function foodNutrients(foodData: any) {
        try {
          let foodNutrients = foodData["foodNutrients"];
          if (!Array.isArray(foodNutrients)) {
            foodNutrients = [foodNutrients];
          }
          const convertedNutrients = foodNutrients.map((nutrient: any) => {
            return {
              name: toTitleCase(nutrient["nutrient"] ? nutrient["nutrient"]["name"] : nutrient["nutrientName"]),
              number: nutrient? nutrient["amount"] : nutrient["amount"],
              unitName: nutrient["nutrient"] ? nutrient["nutrient"]["unitName"] : nutrient["unitName"],
              designation: nutrient["nutrient"] ? nutrient["nutrient"]["number"] : nutrient["nutrientNumber"],
            };
          });
          const visibleRows = showAll ? convertedNutrients : convertedNutrients.slice(0, 10);
          let count = 0;
          return (
            <div>
        {visibleRows.map((nutrient: any, index: number) => {
          if (nutrient.number !== 0) {
            count++;
            return (
              <tr key={index} className={count % 2 == 0 ? "bg-violet-100" : ""}>
                <td className="w-[100%] px-4 py-1 whitespace-nowrap text-md text-gray-800">
                  {nutrient.name}
                </td>
                <td className="px-4 py-1 whitespace-nowrap text-md text-gray-800">
                  {(nutrient.number*(portionOptions[selectedPortion]['gram']/100)*numOfServings).toFixed(2) + " " + nutrient.unitName}
                </td>
              </tr>
            );
          }
        })}
         {convertedNutrients.length > 10 && (
        <button
        className="w-[100%] ease focus:shadow-outline select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none"
        onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Collapse" : "Expand"}
        </button>
      )}
      </div>
          )
        }
        catch (error) {
            console.log("error", error);
          }
    }


    const returnFoodNames =(list:any[])=>{
    const output:any = []
        if ( list === undefined)
        {
          return[]
        }
        list.forEach((element:any) => {
          output.push({'name':toTitleCase((element.description).toLowerCase())
                , 'id':element.fdcId})
        });
        return output
      }


      useEffect(() => {

        try{
           fetch(`/api/foodJournal/getFoodbyDate/?userId=${userId}&date=${foodJournalDate}`).then((response)=>{
            response.json().then((data) => {
              setFoodJournalData(data['foodlist'])
              setFoodJournalSummary(data['nutrientSummary'])
            });
           })
          }
          catch (error) {
            console.error("An error occurred while submitting the form", error);
          }
          },[foodJournalDate,addStatus])

     useEffect(() => {
      if(addStatus==3)
      {
      try{
         fetch(`/api/foodJournal/getFoodbyDate/?userId=${userId}&date=${foodJournalDate}`).then((response)=>{
          response.json().then((data) => {
            setFoodJournalData(data['foodlist'])
            setFoodJournalSummary(data['nutrientSummary'])
          });
         })
        }
        catch (error) {
          console.error("An error occurred while submitting the form", error);
        }
   }     },[addStatus])

      useEffect(() => {
        if (searchStr.length>3) {
            
          const delayDebounceFn = setTimeout(() => {
            fetch(`/api/food/search/${searchStr}`).then((response) => {
              response.json().then((data) => {
                setFoodList(returnFoodNames(data['foods']))
                setSelectedPortion(0)
              });
            });
          }, 250);
          return () => clearTimeout(delayDebounceFn);
        } else {
          
        }
      }, [searchStr]);

      useEffect(()=>{
        if (currentFood)
        {
          
        const delayDebounceFn = setTimeout(() => {
        fetch("/api/food/"+currentFood.id).then((response) => {
        response.json().then((data) => {
        setCurrentFoodDetails(data)
        const output:any = []
        output.push({
            'name':("Default portion ("+100+"g)")
        , 'gram':100})
        data['foodPortions']?.map((portion:any,index:any)=>{
            output.push({'name':(portion.portionDescription+" ("+portion.gramWeight+"g)")
            , 'gram':portion.gramWeight})
        })
        setSelectedPortion(0)
        setPortionOptions(output)
        });
    })}, 250);
    return () => clearTimeout(delayDebounceFn);
}
},[currentFood])

const submitFood = async (e: React.FormEvent) =>{
    e.preventDefault();
    if (mealDate==''||mealTime==''||numOfServings==''||!currentFood)
    {
      setEntryError(true)
      setAddStatus(1)

      return
    }
    setEntryError(false)
    const dateTimeOfMeal = `${mealDate}T${mealTime}:00`;

    const body= {
      userId : userId,
      foodItemID: currentFood.id+'',
      foodItemAPI:'FDC API',
      dateTimeOfMeal:dateTimeOfMeal,
      nutrientResponse:{
        foodName:currentFoodDetails['description'],
        selectedPortion:portionOptions[selectedPortion]['gram'],
        nutrientFacts:currentFoodDetails['foodNutrients']
      } ,
      numberOfServings: parseFloat(numOfServings)
    }
    try{
    setAddStatus(2)
    await fetch("/api/foodJournal/foodEntry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)}).then((message:any)=>{
        setAddStatus(3)

      }
      )
    }
    catch (error) {
      setEntryError(true)
      console.error("An error occurred while submitting the form", error);
    }
    }

    return(
        <>

        <div className="mb-2">
                <div className="font-semibold mb-1">Pick date to retrieve the Food Journal for that day</div>
                <input onChange={(e)=>{setFoodJournalDate(e.target.value)}} className="rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900" type="date"></input>
        </div>
        <Modal
        open={openFoodModal}
        onClose={()=>{if(addStatus!=2){setOpenFoodModal(false);setAddStatus(1)}}}>
            <div>

<div className="foodModal rounded-lg">
        <div className="bg-violet-700 px-4 py-2 text-white w-100 text-center font-bold text-xl">ADD MEAL</div>
        {addStatus==2&&<LoadingStarHealth></LoadingStarHealth>}
        {addStatus!=2&&<div className="flex justify-between p-3">
            <div className="w-[50%] mr-2">
            {entryError&&
            <div className="text-red-700">
              Invalid or missing input.
              </div>}
            <div className="font-semibold mb-1">Select Food from suggestions:</div>
            <FoodAutocompleteInput expr={searchStr} setExpr={setSearchStr}  options={foodList} setFoodItem={setCurrentFood}></FoodAutocompleteInput>
            {currentFood&&
            <div className="mb-1">
                <div className="font-semibold mb-1">Serving Size:</div>
                <select className="rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900" onChange={(e)=>{setSelectedPortion(e.target.selectedIndex)}}>
          {portionOptions.map((option) => (
            <option key={option.name} value={option.gram}>
              {option.name}
            </option>
          ))}
        </select>
            </div>
}            
            <div className="mb-1">
                <div className="font-semibold mb-1">Number Of Servings:</div>
                <input value={numOfServings} onChange={(e)=>{setNumOfServings(e.target.value)}} className="rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900" type="number" step=".1" min="0.1"></input>
            </div>
            <div className="mb-1">
                <div className="font-semibold mb-1">Meal Time:</div>
                <input value={mealTime} onChange={(e)=>{setMealTime(e.target.value)}} className="rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900" type="time"></input>
            </div>
            <div className="mb-2">
                <div className="font-semibold mb-1">Date:</div>
                <input value={mealDate} onChange={(e)=>{setMealDate(e.target.value)}} className="rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900" type="date"></input>
            </div>
            <div>
                {addStatus==1&&<button onClick={(e)=>{setAddStatus(2);submitFood(e);}} className="w-[100%] ease focus:shadow-outline select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none">
                    Add Meal 
                </button>}
                {addStatus==3&&
                
                <p className="text-green-600 mb-4">Food Added successfully!</p>
              }

            </div>
        </div>
        <div className="w-[45%]">
            <div className="text-center text-violet-700 font-bold text-lg">
                Food Nutrients
            </div>
            <div className="foodNutrientsSection">
            {currentFood&&foodNutrients(currentFoodDetails)}
            </div>
        </div>
        </div>}
        </div>
        </div>
        </Modal>
        {foodJournalSummary&&foodJournalDate&& <div className="Summary mt-3 mb-3">
        
       <div className="text-center text-violet-900 text-3xl font-semibold mt-3 mb-3">
          Overall Nutrients Summary
        </div>
        <div className="flex w-[100%] justify-evenly mt-3 mb-3">
          <div className="flex flex-col items-center">
            <div className="text-2xl font-semibold text-violet-700">
              {foodJournalSummary['1008']?(foodJournalSummary['1008']['amount'].toFixed(2)+ " "+foodJournalSummary['1008']['unit']):'0 kcal'}
            </div>
            <div className="text-md font-bold text-violet-500">
              {
           foodJournalSummary['1008']? foodJournalSummary['1008']['name']:'Energy'
              }
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-2xl font-semibold text-violet-700">
              {foodJournalSummary['1003']?(foodJournalSummary['1003']['amount'].toFixed(2)+ " "+foodJournalSummary['1003']['unit']):'0 g'}
            </div>
            <div className="text-md font-bold text-violet-500">
              {
            foodJournalSummary['1003']?foodJournalSummary['1003']['name']:'Protein'

              }
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-2xl font-semibold text-violet-700">
              {foodJournalSummary['1004']?(foodJournalSummary['1004']['amount'].toFixed(2)+ " "+foodJournalSummary['1004']['unit']):'0 g'}
            </div>
            <div className="text-md font-bold text-violet-500">
              {
            foodJournalSummary['1004']?foodJournalSummary['1004']['name']:'Total lipid (fat)'

              }
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-2xl font-semibold text-violet-700">
              {foodJournalSummary['1005']?(foodJournalSummary['1005']['amount'].toFixed(2)+ " "+foodJournalSummary['1005']['unit']):'0 g'}
            </div>
            <div className="text-md font-bold text-violet-500">
              {
            foodJournalSummary['1005']?foodJournalSummary['1005']['name']:'Carbohydrate, by difference'

              }
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-2xl font-semibold text-violet-700">
              {foodJournalSummary['1057']?(foodJournalSummary['1057']['amount'].toFixed(2)+ " "+foodJournalSummary['1057']['unit']):'0 mg'}
            </div>
            <div className="text-md font-bold text-violet-500">
              {
            foodJournalSummary['1057']?foodJournalSummary['1057']['name']:'Caffiene'

              }
            </div>
          </div>
        </div>
        <div className="flex flex-row">
        <button onClick={(e)=>setOpenOverallNutrientsModal(true)} className="w-[100%] ease mr-1 ml-2  focus:shadow-outline select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none">
                    See Overall Nutrients Intake of the Day 
        </button>
        <button 
        className="w-[100%] ease focus:shadow-outline select-none rounded-md border mr-2 ml-1 border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none"
        onClick={(e)=>{setOpenFoodModal(true); setMealDate(foodJournalDate)}}>
        Add Meal
        </button>
        </div>
        </div>}
        <Modal
        open={openOverallNutrientsModal}
        onClose={()=>setOpenOverallNutrientsModal(false)}>
          <>
<div>

  <div className="foodModal rounded-lg">
    <div>
    <div className="text-center text-violet-700 font-bold text-lg">
                Food Nutrients
            </div>
            <div className="foodNutrientsSection">
            {foodJournalSummary&&overallFoodNutrients()}
            </div>
    </div>
  </div>
  </div></>
  </Modal>
        <FoodDetailsTable 
      rows={ [...foodJournalData?.map((product:any) => (
        
        {
          id: product['id']??"",
          title: product['nutrientResponse']['foodName'] ?? "",
          date: new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",}).format(new Date(product['dateTimeOfMeal'])),
          time: product['dateTimeOfMeal'].split("T")[1].split(":").slice(0, 2).join(":") ?? "",
          numOfServings: product['numberOfServings'] ?? "",
          nutrientFact: product['nutrientResponse']['nutrientFacts'] ?? "",
          portionSize: product['nutrientResponse']['selectedPortion'] ?? "",
          link:'/food/?id='+product['foodItemID'],
          }))??[]]}/>
        </>
    )
}

export default FoodJournal;
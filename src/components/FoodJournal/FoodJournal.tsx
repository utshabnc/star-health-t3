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

const Modal = ({
  open,
  children,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}) => {
  const showHideClassName = open ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className='modal-main rounded-lg'>
        {children}
      </section>
    </div>
  );
};

const FoodJournal: React.FC = () => {
  const getFormattedCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };
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
    const [mealTime,setMealTime]= useState<any>(getFormattedCurrentTime())
    const [foodJournalDate,setFoodJournalDate]=useState<any>(new Date().toISOString().split('T')[0])
    const [foodJournalData,setFoodJournalData]=useState<any[]>([])
    const [foodJournalSummary,setFoodJournalSummary]=useState<any>({})
    const [openOverallNutrientsModal,setOpenOverallNutrientsModal]=useState<boolean>(false)
    const [addStatus,setAddStatus] = useState<number>(1)
    const [entryError,setEntryError] = useState<boolean>(false)
    const mealCategoryOptions = ['Breakfast','Lunch','Dinner','Snack']
    const [mealCategory,setMealCategory]=useState(0)
    const [selectedID,setSelectedID]=useState()
    const [waterIntake,setWaterIntake]=useState(0)
    const [waterIntakeBtn,setWaterIntakeBtn] =useState<number>(1)
    const [gettingDataForAdd,setGettingDataForAdd] = useState<boolean>(false)
    // Number Status
    // 1 Ready
    // 2 Loading
    // 3 Done
    function waterIntakeComp()
    {
      const icons = [];

  for (let i = 0; i < waterIntake; i++) {
    icons.push(<MdWaterDrop key={i} size={40} color="#21b6f5" />);
  }

  for (let i = 0; i < 8-waterIntake; i++) {
    icons.push(<MdWaterDrop key={i} size={40} color="grey" />);
  }
  return <div className="flex flex-row">{icons}</div>;
    }
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
              {(nutrient[1].amount+0).toFixed(0) + " " + nutrient[1].unit}
            </td>
          </tr>
        );
      }
    })}
    </div>
    )
    }
    function editMeal(row:any){
      setOpenFoodModal(true)
      setSelectedID(row.id)
      setCurrentFood({id:row.foodID})  
      setSearchStr(row.title)
      setNumOfServings(row.numOfServings)
      const d = row.dateTimeofMeal.split('T')
      setMealDate(d[0])
      setMealTime(d[1].slice(0,-8))
      setMealCategory(mealCategoryOptions.indexOf(row.mealCategory))
    }
    useEffect(()=>{
      console.log('Getting Data')
    },[selectedID])
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
                  {(nutrient.number*(portionOptions[selectedPortion]['gram']/100)*numOfServings).toFixed(0) + " " + nutrient.unitName}
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
      const submitWaterIntake=()=>{
        const body = {
          userId,
          date:foodJournalDate,
          waterIntake:waterIntake
        }
        setWaterIntakeBtn(2)
        try{
          
          fetch("/api/foodJournal/postWaterIntake", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body)}).then((message:any)=>{
            setWaterIntakeBtn(3)
            setTimeout(() => {
              setWaterIntakeBtn(1)
            }, 2000);
            }
            )
          }
          catch (error) {
            setEntryError(true)
            console.error("An error occurred while submitting the form", error);
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
              fetch(`/api/foodJournal/getWaterIntake/?userId=${userId}&date=${foodJournalDate}`).then((response)=>{
                response.json().then((data2) => {
                setWaterIntake(data2['waterIntakeData'][0]?data2['waterIntakeData'][0]['numberOfGlasses']:0)
                })
              });
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
        //disable button 
        //add loading  
        setGettingDataForAdd(true)
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
        setGettingDataForAdd(false)

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
      id:selectedID,
      userId : userId,
      foodItemID: currentFood.id+'',
      foodItemAPI:'FDC API',
      dateTimeOfMeal:dateTimeOfMeal,
      nutrientResponse:{
        foodName:currentFoodDetails['description'],
        selectedPortion:portionOptions[selectedPortion]['gram'],
        nutrientFacts:currentFoodDetails['foodNutrients']
      } ,
      numberOfServings: parseFloat(numOfServings),
      mealCategory:mealCategoryOptions[mealCategory]
    }
    try{
    setAddStatus(2)
    await fetch("/api/foodJournal/foodEntry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)}).then((message:any)=>{
        toast(`Successfully added Food item.`, {})
        setOpenFoodModal(false);
        setAddStatus(1);
        setNumOfServings(1);
        setCurrentFood('');
        setSearchStr('');
        setMealCategory(0)
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
                <input value={foodJournalDate} onChange={(e)=>{setFoodJournalDate(e.target.value)}} className="rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900" type="date"></input>
        </div>
        <Modal
        open={openFoodModal}
        onClose={()=>{if(addStatus!=2){setOpenFoodModal(false);setAddStatus(1);setNumOfServings(1);setCurrentFood('');setSearchStr('');setMealCategory(0)}}}>
            <div>

<div className="foodModal rounded-lg overflow-hidden">
        <div className="bg-violet-700  px-4 py-2 text-white w-100 text-center font-bold text-xl">
          <div>
          ADD MEAL
          </div>
          <div onClick={(e)=>{if(addStatus!=2){setOpenFoodModal(false);setAddStatus(1);setNumOfServings(1);setCurrentFood('');setSearchStr('');setMealCategory(0)}}} className='closeFoodModal bg-violet-700 mt-3 mr-2 justify-end'>
                    <AiOutlineClose size={25} color="white"  ></AiOutlineClose>
          </div>
                            </div>
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
                <select  className="rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900" onChange={(e)=>{setSelectedPortion(e.target.selectedIndex)}}>
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
                <div className="font-semibold mb-1">Meal Category:</div>
                <select value={mealCategory} className="rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900" onChange={(e)=>{setMealCategory(e.target.selectedIndex)}}>
          {mealCategoryOptions.map((option,index) => (
            <option key={option} value={index}>
              {option}
            </option>
          ))}
        </select>
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
                {addStatus==1&&<button onClick={(e)=>{if(!gettingDataForAdd){setAddStatus(2);submitFood(e);}}} className="w-[100%] ease focus:shadow-outline select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none">
                    Add Meal
                    {gettingDataForAdd&&
                    <>
                      <div className="lds-ring"><div></div><div></div><div></div><div></div></div>

                    </>
                    }
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
            {gettingDataForAdd&&<>

              <div className="mx-auto flex justify-center items-center h-[300px] w-[100%]">
                <svg
                  role="status"
                  className="mr-2 inline h-20 w-20 animate-spin fill-purple-600 text-gray-200 dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            </>}
            {!gettingDataForAdd&&currentFood&&foodNutrients(currentFoodDetails)}
            </div>
        </div>
        </div>}
        </div>
        </div>
        </Modal>
        {foodJournalSummary&&foodJournalDate&& 
        <div className="Summary mt-3 mb-3">
          <div className="text-center text-violet-900 text-3xl font-semibold mt-3 mb-3">
            Overall Nutrients Summary
          </div>
        <div className="flex w-[100%] justify-between  mt-3 mb-3">
          <div className="flex flex-col items-center  mr-1 ml-1 ">
            <div className="text-2xl font-semibold text-violet-700">
              {foodJournalSummary['1008']?(foodJournalSummary['1008']['amount'].toFixed(0)+ " "+foodJournalSummary['1008']['unit']):'0 kcal'}
            </div>
            <div className="text-md font-bold text-violet-500">
              {
           foodJournalSummary['1008']? foodJournalSummary['1008']['name']:'Energy'
              }
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-2xl font-semibold text-violet-700">
              {foodJournalSummary['1003']?(foodJournalSummary['1003']['amount'].toFixed(0)+ " "+foodJournalSummary['1003']['unit']):'0 g'}
            </div>
            <div className="text-md font-bold text-violet-500">
              {
            foodJournalSummary['1003']?foodJournalSummary['1003']['name']:'Protein'

              }
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-2xl font-semibold text-violet-700">
              {foodJournalSummary['1004']?(foodJournalSummary['1004']['amount'].toFixed(0)+ " "+foodJournalSummary['1004']['unit']):'0 g'}
            </div>
            <div className="text-md font-bold text-violet-500">
              {
            foodJournalSummary['1004']?foodJournalSummary['1004']['name']:'Total lipid (fat)'

              }
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-2xl font-semibold text-violet-700">
              {foodJournalSummary['1005']?(foodJournalSummary['1005']['amount'].toFixed(0)+ " "+foodJournalSummary['1005']['unit']):'0 g'}
            </div>
            <div className="text-md font-bold text-violet-500">
              {
            'Carbohydrate'

              }
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-2xl font-semibold text-violet-700">
              {foodJournalSummary['1057']?(foodJournalSummary['1057']['amount'].toFixed(0)+ " "+foodJournalSummary['1057']['unit']):'0 mg'}
            </div>
            <div className="text-md font-bold text-violet-500">
              {
            foodJournalSummary['1057']?foodJournalSummary['1057']['name']:'Caffeine'

              }
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-2xl font-semibold text-violet-700">
              {foodJournalSummary['1253']?(foodJournalSummary['1253']['amount'].toFixed(0)+ " "+foodJournalSummary['1253']['unit']):'0 mg'}
            </div>
            <div className="text-md font-bold text-violet-500">
              {
            foodJournalSummary['1253']?foodJournalSummary['1253']['name']:'Cholesterol'

              }
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-2xl font-semibold text-violet-700">
              {foodJournalSummary['2000']?(foodJournalSummary['2000']['amount'].toFixed(0)+ " "+foodJournalSummary['2000']['unit']):'0 g'}
            </div>
            <div className="text-md font-bold text-violet-500">
              {
            foodJournalSummary['2000']?foodJournalSummary['2000']['name']:'Sugar'

              }
            </div>
          
          </div>
          <div>
          <button onClick={(e)=>setOpenOverallNutrientsModal(true)} className="w-[100%] h-[100%] ease focus:shadow-outline select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none">
              <div className="flex h-[100%] justify-center items-center">
              <div>
              Expand Details
              </div>
              </div>
        </button>
          </div>
        </div>
        <div className="flex flex-row">
        <button 
        className="w-[100%] ease focus:shadow-outline select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none"
        onClick={(e)=>{setOpenFoodModal(true); setSelectedID(undefined); setMealDate(foodJournalDate)}}>
        Add Meal
        </button>
        </div>
        <div className="rounded-lg bg-white shadow-lg p-3 mt-3">
          <div className="text-center text-violet-900 text-3xl font-semibold mt-3 mb-3">
              Daily Water Intake
          </div>
            <div className="flex flex-row justify-between items-center mb-3" >
              <div className="flex flex-col items-center">
                <div className="flex flex-row items-center mb-1">
                  <AiOutlineMinus className="text-2xl font-semibold text-violet-700" size={30} onClick={()=>{setWaterIntake(waterIntake==0?0:waterIntake-1)}}></AiOutlineMinus>
                  <div className="text-2xl font-semibold text-violet-700 mx-5">{waterIntake}</div>
                  <AiOutlinePlus className="text-2xl font-semibold text-violet-700" size={30} onClick={()=>{setWaterIntake(waterIntake+1)}}></AiOutlinePlus>
                </div>
                <div className="text-xl font-semibold text-violet-700 mb-1">Cups</div>
                <div className="text-lg font-semibold text-violet-500">{8*waterIntake} fl oz</div>
              </div>
            <div className="flex flex-col items-center">

            <div className="flex flex-row">
            {Array(((waterIntake==0)?0:(waterIntake>=8)?8:waterIntake)).fill(0).map((key)=>{
              return(
              <MdWaterDrop key={key} size={40} color="#21b6f5" />
              )
            })}
            {Array(((8-waterIntake<0)?0:8-waterIntake)).fill(0).map((key)=>{
              return(
              <MdWaterDrop key={key} size={40} color="grey" />
              )
            })}
            </div>
            <div className="text-xl font-semibold text-violet-700 mt-3">
              Recommended Cups of Water
            </div>
            </div>
            </div>
            <button 
        className="w-[100%] ease focus:shadow-outline select-none rounded-md border border-[#21b6f5] bg-[#21b6f5] px-4 py-2 text-white transition duration-500 hover:bg-[#098ac1] focus:outline-none"
        disabled={waterIntakeBtn==2}
        onClick={(e)=>{submitWaterIntake()}}>
        Save Water Intake
        {waterIntakeBtn==2&&
        <>
<div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </>}
        {waterIntakeBtn==3&&
        <>
        										<svg className="h-5 w-5 inline-block mr-2 -mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
											<path d="M5 13l4 4L19 7"></path>
										</svg>
        </>}
        
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
    <div className="bg-violet-700  px-4 py-2 text-white w-100 text-center font-bold text-xl">
          <div>
            Food Nutrients
            </div>
          <div onClick={(e)=>{setOpenOverallNutrientsModal(false)}} className='closeFoodModal bg-violet-700 mt-3 mr-2 justify-end'>
                    <AiOutlineClose size={25} color="white"  ></AiOutlineClose>
          </div>
                            </div>
            <div className="foodNutrientsSection ">
            {foodJournalSummary&&overallFoodNutrients()}
            </div>
    </div>
  </div>
  </div></>
  </Modal>
        <FoodDetailsTable
        foodData = {foodJournalData}
        setFoodData = {setFoodJournalData}
      rows={ [...foodJournalData?.map((product:any) => (
        
        {
          id: product['id']??"",
          title: product['nutrientResponse']['foodName'] ?? "",
          dateTimeofMeal:product['dateTimeOfMeal'],
          date: new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",}).format(new Date(product['dateTimeOfMeal'])),
          time: new Intl.DateTimeFormat("en-US", {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            timeZoneName: 'short'}).format(new Date(product['dateTimeOfMeal'])),
          numOfServings: product['numberOfServings'] ?? "",
          nutrientFact: product['nutrientResponse']['nutrientFacts'] ?? "",
          portionSize: product['nutrientResponse']['selectedPortion'] ?? "",
          link:'/food/?id='+product['foodItemID'],
          foodID:product['foodItemID'],
          mealCategory:product['mealCategory'],
          editFunction:editMeal,
          }))??[]]}/>

        </>
    )
}

export default FoodJournal;
import Image from "next/image";
import { useSession } from "next-auth/react";
import Bookmark from "../../components/Bookmark";
import Compare from "../../components/Compare";
import { useEffect, useState } from "react";
import Dropdown from "../../components/Dropdown";
import { trpc } from "../../utils/trpc";
import LoadingStarHealth from "../../components/Loading";
import PatientIntakeForm from "../../components/PatientIntakeForm/PatientIntakeForm";
import FoodJournal from "../../components/FoodJournal/FoodJournal";
import SubstanceTracker from "../../components/SubstanceTracker/SubstanceTracker";
import { PayWall } from "../../components/PayWall/PayWall";
import MentalHealthDiary from "../../components/MentalHealthDiary";
import DrugJournal from "../../components/DrugJournal/DrugJournal";
import ExerciseTracker from "../../components/ExerciseTracker/ExerciseTracker";
import SignIn from "../../components/SignIn/SignIn";

{/* <div class="relative ml-2 mr-2 flex w-full flex-col items-center rounded-[6px] rounded-md border-[1.5px] border-bordercolor bg-white px-6 py-8 shadow-md  h-[17.188rem] 
                p-1 sm:w-[27%] sm:p-3 md:w-[25.5%] xl:w-[21%] "><img alt="Mapping" loading="lazy" width="360" height="320" decoding="async" data-nimg="1" class="" srcset="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmapping.867f5ed7.png&amp;w=384&amp;q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmapping.867f5ed7.png&amp;w=750&amp;q=75 2x" src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmapping.867f5ed7.png&amp;w=750&amp;q=75" style="color: transparent; height: 185px; width: 185px; object-fit: contain;"><p class="justify-center pb-10 text-center text-xs font-semibold capitalize lg:text-lg text-font-custom          mt-0">Mapping</p></div> */}

interface BookmarkInterface {
  id: number;
  title: string;
  url: string;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface Category {
  id: number;
  name: string;
}

const ProfilePage: React.FC = () => {
  const { data: session, status } = useSession();
  const name = session?.user?.name || "";
  const email = session?.user?.email || "";
  const userPhoto = session?.user?.image || null;
  const [selectedFilter, setSelectedFilter] = useState<string>(() => {
    if (typeof localStorage !== "undefined") {
      // Retrieve the selected category from local storage or set a default value
      return localStorage.getItem("selectedCategory") || "all";
    } else {
      return "Clinical Trials";
    }
  });
  const [bookmarks, setBookmarks] = useState<BookmarkInterface[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showBookmark, setShowBookmark] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [showFoodJournal, setShowFoodJournal] = useState(false);
  const [showSubstanceTracker, setShowSubstanceTracker] = useState(false);
  const [showMentalDiary, setShowSMentalDiary] = useState(false);
  const [showDrugJournal, setShowDrugJournal] = useState(false);
  const [showWorkoutJournal, setShowWorkoutJournal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");

  const removeBookmark = trpc.db.removeBookmarkById.useMutation();
  const { data: allCategories } = trpc.db.allCategories.useQuery();
  const { data: allBookmarks, refetch } = trpc.db.bookmarks.useQuery({
    categoryId: parseInt(selectedFilter),
    userId: (session?.user?.id as string) || "",
  });

  useEffect(() => {
    if (allBookmarks) {
      setBookmarks(allBookmarks);
    }
  }, [allBookmarks]);

  useEffect(() => {
    if (allCategories) {
      setCategories(allCategories);
    }
  }, [allCategories]);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      // Update local storage when the selected category changes
      localStorage.setItem("selectedCategory", selectedFilter);
    }
  }, [selectedFilter]);

  const handleFilterChange = (value: string | undefined) => {
    if (value) {
      refetch();
      setSelectedFilter(value);
      setSelectedCategory(value);
    }
  };

  const handleDelete = (id: number) => {
    removeBookmark
      .mutateAsync({
        bookmarkId: id,
      })
      .then(() => {
        refetch();
      });
  };
  const handleFormToggle = () => {
    setShowForm(true);
    setShowFoodJournal(false);
    setShowBookmark(false);
    setShowCompare(false);
    setShowSubstanceTracker(false);
    setShowSMentalDiary(false);
    setShowDrugJournal(false);
    setShowWorkoutJournal(false);
  };

  const handleBookmarkToggle = () => {
    setShowForm(false);
    setShowFoodJournal(false);
    setShowBookmark(true);
    setShowCompare(false);
    setShowSubstanceTracker(false);
    setShowSMentalDiary(false);
    setShowDrugJournal(false);
    setShowWorkoutJournal(false);
  };

  const handleCompareToggle = () => {
    setShowForm(false);
    setShowFoodJournal(false);
    setShowBookmark(false);
    setShowCompare(true);
    setShowSubstanceTracker(false);
    setShowSMentalDiary(false);
    setShowDrugJournal(false);
    setShowWorkoutJournal(false);
  };

  const handleFoodJournalToggle = () => {
    setShowForm(false);
    setShowFoodJournal(true);
    setShowBookmark(false);
    setShowCompare(false);
    setShowSubstanceTracker(false);
    setShowSMentalDiary(false);
    setShowDrugJournal(false);
    setShowWorkoutJournal(false);
  };

  const handleSubstanceTrackerToggle = () => {
    setShowForm(false);
    setShowFoodJournal(false);
    setShowBookmark(false);
    setShowCompare(false);
    setShowSubstanceTracker(true);
    setShowSMentalDiary(false);
    setShowDrugJournal(false);
    setShowWorkoutJournal(false);
  };

  const handleMentalDiaryToggle = () => {
    setShowForm(false);
    setShowFoodJournal(false);
    setShowBookmark(false);
    setShowCompare(false);
    setShowSubstanceTracker(false);
    setShowSMentalDiary(true);
    setShowDrugJournal(false);
    setShowWorkoutJournal(false);
  };
  const handleDrugJournalToggle = () => {
    setShowForm(false);
    setShowFoodJournal(false);
    setShowBookmark(false);
    setShowCompare(false);
    setShowSubstanceTracker(false);
    setShowSMentalDiary(false);
    setShowDrugJournal(true);
    setShowWorkoutJournal(false);
  };
  const handleWorkoutJournalToggle = () => {
    setShowForm(false);
    setShowFoodJournal(false);
    setShowBookmark(false);
    setShowCompare(false);
    setShowSubstanceTracker(false);
    setShowSMentalDiary(false);
    setShowDrugJournal(false);
    setShowWorkoutJournal(true);
  };
  return status === "loading" ? (
    <LoadingStarHealth />
  ) : (
    <div className="p-16">
      <div className="mb-4 flex flex-wrap items-center">
        {/* <SignIn /> */}
        {userPhoto && (
          <Image
            className="mr-4 rounded-full"
            src={userPhoto}
            alt={"Profile"}
            width={128}
            height={128}
          />
        )}
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">{name}</h1>
          <h1 className="text-xl">{email}</h1>
        </div>
      </div>
      <hr className="my-4" />
      <div className="mb-4 flex flex-wrap space-x-4">
          <button
            className="relative ml-2 mr-2 flex w-full flex-col items-center rounded-[6px] rounded-md border-[1.5px] border-bordercolor bg-white px-6 py-8 shadow-md  h-[17.188rem] p-1 sm:w-[27%] sm:p-3 md:w-[25.5%] xl:w-[21%]"        
          disabled={
            showForm &&
            !showBookmark &&
            !showCompare &&
            !showFoodJournal &&
            !showSubstanceTracker &&
            !showMentalDiary &&
            !showDrugJournal &&
            !showWorkoutJournal
          }
          style={{
            color: !showForm ? "#885CF6" : "white",
            backgroundColor: !showForm ? "white" : "#885CF6",
            border: !showForm ? "1px solid #885CF6" : "node",
          }}
            onClick={handleFormToggle}
        >
          Patient Intake Form
        </button>
        <button
         className="relative ml-2 mr-2 flex w-full flex-col items-center rounded-[6px] rounded-md border-[1.5px] border-bordercolor bg-white px-6 py-8 shadow-md  h-[17.188rem] p-1 sm:w-[27%] sm:p-3 md:w-[25.5%] xl:w-[21%]"
          onClick={handleBookmarkToggle}
          disabled={
            showBookmark &&
            !showForm &&
            !showCompare &&
            !showFoodJournal &&
            !showSubstanceTracker &&
            !showMentalDiary &&
            !showDrugJournal &&
            !showWorkoutJournal
          }
          style={{
            color: !showBookmark ? "#885CF6" : "white",
            backgroundColor: !showBookmark ? "white" : "#885CF6",
            border: !showBookmark ? "1px solid #885CF6" : "node",
          }}
        >
          Bookmarks
        </button>
        <button
         className="relative ml-2 mr-2 flex w-full flex-col items-center rounded-[6px] rounded-md border-[1.5px] border-bordercolor bg-white px-6 py-8 shadow-md  h-[17.188rem] p-1 sm:w-[27%] sm:p-3 md:w-[25.5%] xl:w-[21%]"        
          onClick={handleCompareToggle}
          disabled={
            showCompare &&
            !showForm &&
            !showBookmark &&
            !showFoodJournal &&
            !showSubstanceTracker &&
            !showMentalDiary &&
            !showDrugJournal &&
            !showWorkoutJournal
          }
          style={{
            color: !showCompare ? "#885CF6" : "white",
            backgroundColor: !showCompare ? "white" : "#885CF6",
            border: !showCompare ? "1px solid #885CF6" : "node",
          }}
        >
          Comparison Tool
        </button>
        <button
         className="relative ml-2 mr-2 flex w-full flex-col items-center rounded-[6px] rounded-md border-[1.5px] border-bordercolor bg-white px-6 py-8 shadow-md  h-[17.188rem] p-1 sm:w-[27%] sm:p-3 md:w-[25.5%] xl:w-[21%]"        

          onClick={handleFoodJournalToggle}
          disabled={
            showFoodJournal &&
            !showCompare &&
            !showForm &&
            !showBookmark &&
            !showSubstanceTracker &&
            !showMentalDiary &&
            !showDrugJournal &&
            !showWorkoutJournal
          }
          style={{
            color: !showFoodJournal ? "#885CF6" : "white",
            backgroundColor: !showFoodJournal ? "white" : "#885CF6",
            border: !showFoodJournal ? "1px solid #885CF6" : "node",
          }}
        >
          Food Journal
        </button>
        <button
         className="relative ml-2 mr-2 flex w-full flex-col items-center rounded-[6px] rounded-md border-[1.5px] border-bordercolor bg-white px-6 py-8 shadow-md  h-[17.188rem] p-1 sm:w-[27%] sm:p-3 md:w-[25.5%] xl:w-[21%]"
          onClick={handleSubstanceTrackerToggle}
          disabled={
            !showFoodJournal &&
            !showCompare &&
            !showForm &&
            !showBookmark &&
            showSubstanceTracker &&
            !showMentalDiary &&
            !showDrugJournal &&
            !showWorkoutJournal
          }
          style={{
            color: !showSubstanceTracker ? "#885CF6" : "white",
            backgroundColor: !showSubstanceTracker ? "white" : "#885CF6",
            border: !showSubstanceTracker ? "1px solid #885CF6" : "node",
          }}
        >
          Substance Tracker
        </button>
        <button
          className="relative ml-2 mr-2 flex w-full flex-col items-center rounded-[6px] rounded-md border-[1.5px] border-bordercolor bg-white px-6 py-8 shadow-md  h-[17.188rem] p-1 sm:w-[27%] sm:p-3 md:w-[25.5%] xl:w-[21%]"        
          onClick={handleMentalDiaryToggle}
          disabled={
            !showFoodJournal &&
            !showCompare &&
            !showForm &&
            !showBookmark &&
            !showSubstanceTracker &&
            showMentalDiary &&
            !showDrugJournal &&
            !showWorkoutJournal
          }
          style={{
            color: !showMentalDiary ? "#885CF6" : "white",
            backgroundColor: !showMentalDiary ? "white" : "#885CF6",
            border: !showMentalDiary ? "1px solid #885CF6" : "node",
          }}
        >
          Mental Health Diary
        </button>
        <button
          className="relative ml-2 mr-2 flex w-full flex-col items-center rounded-[6px] rounded-md border-[1.5px] border-bordercolor bg-white px-6 py-8 shadow-md  h-[17.188rem] p-1 sm:w-[27%] sm:p-3 md:w-[25.5%] xl:w-[21%]"        

          onClick={handleDrugJournalToggle}
          disabled={
            !showFoodJournal &&
            !showCompare &&
            !showForm &&
            !showBookmark &&
            !showSubstanceTracker &&
            !showMentalDiary &&
            showDrugJournal &&
            !showWorkoutJournal
          }
          style={{
            color: !showDrugJournal ? "#885CF6" : "white",
            backgroundColor: !showDrugJournal ? "white" : "#885CF6",
            border: !showDrugJournal ? "1px solid #885CF6" : "node",
          }}
        >
          Drug Journal
        </button>
        <button
          className="relative ml-2 mr-2 flex w-full flex-col items-center rounded-[6px] rounded-md border-[1.5px] border-bordercolor bg-white px-6 py-8 shadow-md  h-[17.188rem] p-1 sm:w-[27%] sm:p-3 md:w-[25.5%] xl:w-[21%]"        

          onClick={handleWorkoutJournalToggle}
          disabled={
            !showFoodJournal &&
            !showCompare &&
            !showForm &&
            !showBookmark &&
            !showSubstanceTracker &&
            !showMentalDiary &&
            !showDrugJournal &&
            showWorkoutJournal
          }
          style={{
            color: !showWorkoutJournal ? "#885CF6" : "white",
            backgroundColor: !showWorkoutJournal ? "white" : "#885CF6",
            border: !showWorkoutJournal ? "1px solid #885CF6" : "node",
          }}
        >
          Exercise Tracker
        </button>
      </div>
      {showForm ? (
        <PatientIntakeForm />
      ) : showBookmark ? (
        <>
          <h2 className="mb-1 text-lg font-semibold">Bookmarks:</h2>
          <Dropdown
            items={categories.map((category) => ({
              value: category.id.toString(),
              label: category.name,
            }))}
            onChange={handleFilterChange}
            label={"Category"}
            placeholder={"-"}
            value={selectedFilter}
          />
          {bookmarks.length > 0 ? (
            bookmarks.map((bookmark) => (
              <div className="mb-3" key={bookmark.id}>
                <Bookmark
                  createdAt={bookmark.createdAt}
                  id={bookmark.id}
                  notes={bookmark.notes || undefined}
                  title={bookmark.title}
                  url={bookmark.url}
                  onDelete={handleDelete}
                />
              </div>
            ))
          ) : (
            <p>Select an option from the dropdown to start comparing</p>
          )}
        </>
      ) : showCompare ? (
        <Compare />
      ) : showFoodJournal ? (
        <FoodJournal></FoodJournal>
      ) : showSubstanceTracker ? (
        <SubstanceTracker></SubstanceTracker>
      ) : showMentalDiary ? (
        <MentalHealthDiary></MentalHealthDiary>
      ) : showDrugJournal ? (
        <DrugJournal></DrugJournal>
      ) : showWorkoutJournal ? (
        <ExerciseTracker></ExerciseTracker>
      ) : (
        <h2>No content to display</h2>
      )}
    </div>
  );
};

export default ProfilePage;

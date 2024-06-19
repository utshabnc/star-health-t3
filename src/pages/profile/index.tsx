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
  const [showForm, setShowForm] = useState<boolean>(true);
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
      <div className="mb-4 flex items-center">
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
      <div className="mb-4 flex space-x-4">
        <button
          className={`} rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600`}
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
          className={`} rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600`}
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
          className={`} rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600`}
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
          className={`} rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600`}
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
          className={`} rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600`}
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
          className={`} rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600`}
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
          className={`} rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600`}
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
          className={`} rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600`}
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

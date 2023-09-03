import Image from "next/image";
import { useSession } from 'next-auth/react';
import Bookmark from "../../components/Bookmark";
import Compare from "../../components/Compare";
import { useEffect, useState } from "react";
import Dropdown from "../../components/Dropdown";
import { trpc } from "../../utils/trpc";
import LoadingStarHealth from "../../components/Loading";
import PatientIntakeForm from "../../components/PatientIntakeForm/PatientIntakeForm";
import FoodJournal from "../../components/FoodJournal/FoodJournal";
import SubstanceTracker from "../../components/SubstanceTracker/SubstanceTracker"
import { PayWall } from "../../components/PayWall/PayWall";


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
  const name = session?.user?.name || '';
  const email = session?.user?.email || '';
  const userPhoto = session?.user?.image || null;
  const [selectedFilter, setSelectedFilter] = useState<string>(() => {
    if (typeof localStorage !== 'undefined') {
      // Retrieve the selected category from local storage or set a default value
      return localStorage.getItem('selectedCategory') || 'all';
    } else {
      return 'Clinical Trials';
    }
  });
  const [bookmarks, setBookmarks] = useState<BookmarkInterface[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showBookmark, setShowBookmark] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [showFoodJournal, setShowFoodJournal] = useState(false);
  const [showSubstanceTracker, setShowSubstanceTracker] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('');
  

  const removeBookmark = trpc.db.removeBookmarkById.useMutation();
  const { data: allCategories } = trpc.db.allCategories.useQuery();
  const { data: allBookmarks, refetch } = trpc.db.bookmarks.useQuery({
    categoryId: parseInt(selectedFilter),
    userId: session?.user?.id as string || ''
  },);

  useEffect(() => {
    if (allBookmarks) {
      setBookmarks(allBookmarks)
    }
  }, [allBookmarks]);

  useEffect(() => {
    if (allCategories) {
      setCategories(allCategories);
    }
  }, [allCategories]);

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      // Update local storage when the selected category changes
      localStorage.setItem('selectedCategory', selectedFilter);
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
        bookmarkId: id
      })
      .then(() => {
        refetch();
      })
  }
  const handleFormToggle = () => {
    setShowForm(true);
    setShowFoodJournal(false);
    setShowBookmark(false);
    setShowCompare(false);
    setShowSubstanceTracker(false)
  };

  const handleBookmarkToggle = () => {
    setShowForm(false);
    setShowFoodJournal(false);
    setShowBookmark(true);
    setShowCompare(false);
    setShowSubstanceTracker(false)

  };

  const handleCompareToggle = () => {
    setShowForm(false);
    setShowFoodJournal(false);
    setShowBookmark(false);
    setShowCompare(true);
    setShowSubstanceTracker(false)

  };

  const handleFoodJournalToggle = () => {
    setShowForm(false);
    setShowFoodJournal(true);
    setShowBookmark(false);
    setShowCompare(false);
    setShowSubstanceTracker(false)

  };

  const handleSubstanceTrackerToggle = () => {
    setShowForm(false);
    setShowFoodJournal(false);
    setShowBookmark(false);
    setShowCompare(false);
    setShowSubstanceTracker(true)

  };
  return status === 'loading' ?
    (
      <LoadingStarHealth />
    ) : (
      <div className="p-16">
        <div className="flex items-center mb-4">
          <PayWall />
          {userPhoto && (
            <Image
              className="rounded-full mr-4"
              src={userPhoto}
              alt={'Profile'}
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
        <div className="flex space-x-4 mb-4">
        <button
          className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded}`}
          onClick={handleFormToggle}
          disabled={showForm && !showBookmark && !showCompare && !showFoodJournal && !showSubstanceTracker}
          style={{
            color: !showForm ? '#885CF6' : 'white',
            backgroundColor: !showForm ? 'white' : '#885CF6',
            border: !showForm ? '1px solid #885CF6' : 'node',
          }}
        >
          Patient Intake Form
        </button>
        <button
          className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded }`}
          onClick={handleBookmarkToggle}
          disabled={showBookmark && !showForm && !showCompare && !showFoodJournal && !showSubstanceTracker}
          style={{
            color: !showBookmark ? '#885CF6' : 'white',
            backgroundColor: !showBookmark ? 'white' : '#885CF6',
            border: !showBookmark ? '1px solid #885CF6' : 'node',
          }}
        >
          Bookmarks
        </button>
        <button
          className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded }`}
          onClick={handleCompareToggle}
          disabled={showCompare && !showForm && !showBookmark && !showFoodJournal && !showSubstanceTracker}
          style={{
            color: !showCompare ? '#885CF6' : 'white',
            backgroundColor: !showCompare ? 'white' : '#885CF6',
            border: !showCompare ? '1px solid #885CF6' : 'node',
          }}
        >
          Comparison Tool
        </button>
        <button
          className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded }`}
          onClick={handleFoodJournalToggle}
          disabled={showFoodJournal&&!showCompare && !showForm && !showBookmark && !showSubstanceTracker}
          style={{
            color: !showFoodJournal ? '#885CF6' : 'white',
            backgroundColor: !showFoodJournal ? 'white' : '#885CF6',
            border: !showFoodJournal ? '1px solid #885CF6' : 'node',
          }}
        >
          Food Journal
        </button>
        <button
          className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded }`}
          onClick={handleSubstanceTrackerToggle}
          disabled={!showFoodJournal&&!showCompare && !showForm && !showBookmark&& showSubstanceTracker}
          style={{
            color: !showSubstanceTracker ? '#885CF6' : 'white',
            backgroundColor: !showSubstanceTracker ? 'white' : '#885CF6',
            border: !showSubstanceTracker ? '1px solid #885CF6' : 'node',
          }}
        >
          Substance Tracker
        </button>
      </div>
      {showForm ? (
        <PatientIntakeForm />
      ) : showBookmark ? (
        <>
          <h2 className="text-lg font-semibold mb-1">Bookmarks:</h2>
          <Dropdown
            items={categories.map((category) => ({ value: category.id.toString(), label: category.name }))}
            onChange={handleFilterChange}
            label={'Category'}
            placeholder={'-'}
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
      ) :showFoodJournal ?(
        <FoodJournal></FoodJournal>
      )  
      :showSubstanceTracker ?(
        <SubstanceTracker></SubstanceTracker>
      )  
      : (
        <h2>No content to display</h2>
      )}
    </div>
  );
};

export default ProfilePage;
import Image from "next/image";
import { useSession } from 'next-auth/react';
import Bookmark from "../../components/Bookmark";
import { useEffect, useState } from "react";
import Dropdown from "../../components/Dropdown";
import { trpc } from "../../utils/trpc";
import LoadingStarHealth from "../../components/Loading";

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

  return status === 'loading' ?
    (
      <LoadingStarHealth />
    ) : (
      <div className="p-16">
        <div className="flex items-center mb-4">
          {userPhoto && (
            <Image
              className="rounded-full mr-4"
              src={userPhoto}
              alt={'Profile'}
              width={128}
              height={128}
            />
          )}
          <h1 className="text-xl font-bold">{name}</h1>
        </div>
        <hr className="my-4" />
        <div>
          <Dropdown
            items={categories.map((category) => ({ value: category.id.toString(), label: category.name }))}
            onChange={handleFilterChange}
            label={'Category'}
            placeholder={'-'}
            value={selectedFilter}
          />
          <h2 className="text-lg font-semibold mb-2">Bookmarks:</h2>
          {bookmarks.map(bookmark => (
            <Bookmark
              key={bookmark.id}
              createdAt={bookmark.createdAt}
              id={bookmark.id}
              notes={bookmark.notes || undefined}
              title={bookmark.title}
              url={bookmark.url}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    );
};

export default ProfilePage;

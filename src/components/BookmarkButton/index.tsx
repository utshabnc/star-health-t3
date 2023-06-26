import React, { useState, useEffect } from 'react';
import { trpc } from "../../utils/trpc";
import { useRouter } from 'next/router'
import { StarIcon } from '@heroicons/react/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';

interface BookmarkButtonProps {
  title: string;
  categoryId: number;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ title, categoryId }) => {
  const router = useRouter()
  const { data: session, status } = useSession();
  const authenticated = status === 'authenticated';
  const userId = session?.user?.id as string || '';
  const addBookmark = trpc.db.addBookmark.useMutation();
  const removeBookmark = trpc.db.removeBookmark.useMutation();
  const { data: bookmarkExists, refetch } = trpc.db.bookmarkExists.useQuery({ title, categoryId, userId, url: router.asPath });

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isBookmarkExisting, setIsBookmarkExisting] = useState<boolean | undefined>(bookmarkExists?.exists);

  useEffect(() => {
    if (userId) {
      refetch().then((data) => {
        setIsBookmarkExisting(data.data?.exists);
      });
    }
  }, [userId, refetch])

  const handleClick = () => {
    setIsProcessing(true);
    if (authenticated) {
      if (isBookmarkExisting) {
        removeBookmark
          .mutateAsync({
            title, categoryId, userId, url: router.asPath
          })
          .then(() => {
            setIsProcessing(false);
            setIsBookmarkExisting(false);
          })
      } else {
        addBookmark
          .mutateAsync({
            title,
            url: router.asPath,
            userId,
            categoryId,
          })
          .then(() => {
            setIsProcessing(false);
            setIsBookmarkExisting(true);
          })
      }
    }
  };

  return (
    authenticated && (
      <button
        className="ease focus:shadow-outline select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none"
        onClick={handleClick}
        disabled={!authenticated || isProcessing}
      >
        <div className="flex items-center justify-center">
          {isBookmarkExisting ? (
            <>
              <StarIcon className="w-5 h-5 mr-2" />
              Remove Bookmark
            </>) :
            (<>
              <StarOutlineIcon className="w-5 h-5 mr-2" />
              Bookmark
            </>)
          }
        </div>
      </button>)
  );
};

export default BookmarkButton;

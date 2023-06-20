import Image from "next/image";
import { useSession } from 'next-auth/react';

interface Bookmark {
  id: number;
  title: string;
  url: string;
}

interface ProfileProps {
  photoUrl: string;
  firstName: string;
  lastName: string;
  bookmarks: Bookmark[];
}

const ProfilePage: React.FC<ProfileProps> = ({ }) => {
  const { data: session, status } = useSession();
  const bookmarks: Bookmark[] = [];
  const name = session?.user?.name || '';

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  const userPhoto = session?.user?.image || null;

  return (
    <div className="profile">
      {userPhoto && (
        <Image
          src={userPhoto}
          alt={'Profile'}
        />
      )}
      <h1>{name}</h1>
      <h2>Bookmarks:</h2>
      <ul>
        {bookmarks.map(bookmark => (
          <li key={bookmark.id}>
            <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
              {bookmark.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfilePage;
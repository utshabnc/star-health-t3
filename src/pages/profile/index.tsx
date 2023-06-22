import Image from "next/image";
import { useSession } from 'next-auth/react';
import Bookmark from "../../components/Bookmark";
import { useCallback, useEffect, useState } from "react";
import Dropdown from "../../components/Dropdown";

interface BookmarkInterface {
  id: number;
  title: string;
  url: string;
  notes: string;
  date: string;
}

const ProfilePage: React.FC = () => {
  const { data: session, status } = useSession();
  const bookmarks: BookmarkInterface[] = [
    {
      id: 1,
      title: 'Effectiveness of Teleconsultation in Referring a Patient With Early Myocardial Infarction From Peripheral Hospital to Cardiac Centre in Hail, Saudi Arabia',
      url: 'starhealth.io/clinicalTrial/someId',
      notes: 'Interesting study about teleconsultation',
      date: '1/1/2010'
    }
  ];

  enum Filter {
    ClinicalTrials = 'Clinical Trials',
    Diseases = 'Diseases',
    Doctors = 'Doctors',
    Drugs = 'Drugs',
    Food = 'Food',
    Genetics = 'Genetics',
    Hospitals = 'Hospitals',
    HospitalOwners = 'Hospital Owners',
    Insurance = 'Insurance',
    Manufacturers = 'Manufacturers',
    MedicalDevices = 'Medical Devices',
    OpioidTreatment = 'Opioid Treatment',
    Transactions = 'Transactions'
  }
  const name = session?.user?.name || '';

  const userPhoto = session?.user?.image || null;

  const [selectedFilter, setSelectedFilter] = useState<Filter>(Filter.ClinicalTrials);
  const [filteredBookmarks, setFilteredBookmarks] = useState<BookmarkInterface[]>(bookmarks);

  const filterBookmarks = useCallback(() => {
    setFilteredBookmarks(filteredBookmarks);
  }, [filteredBookmarks]);

  useEffect(() => {
    filterBookmarks();
  }, [selectedFilter, filterBookmarks]);



  const handleFilterChange = (value: string | undefined) => {
    setSelectedFilter(value as Filter);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
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
          items={Object.values(Filter).map(filter => ({ value: filter, label: filter }))}
          onChange={handleFilterChange}
          label={'Category'}
          placeholder={'-'}
          value={selectedFilter}
        />
        <h2 className="text-lg font-semibold mb-2">Bookmarks:</h2>
        {filteredBookmarks.map(bookmark => (
          <Bookmark
            key={bookmark.id}
            date={bookmark.date}
            id={bookmark.id}
            notes={bookmark.notes}
            title={bookmark.title}
            url={bookmark.url}
            onDelete={() => { console.log('I clicked delete oh no') }}
          />
        ))}

      </div>
    </div>
  );
};

export default ProfilePage;

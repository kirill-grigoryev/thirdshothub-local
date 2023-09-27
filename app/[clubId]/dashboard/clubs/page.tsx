import { getAllClubs } from '@/services/ClubService';

import CreateClubForm from '@/components/CreateClubForm';

const ClubsPage = async () => {
  const clubsList = await getAllClubs();

  return (
    <>
      <h1 className="text-lg font-semibold leading-6 text-gray-900">
        Clubs page
      </h1>

      <h2 className="text-lg font-semibold leading-6 text-gray-500">
        Add new club
      </h2>

      <CreateClubForm />

      <h2 className="mt-20 text-lg font-semibold leading-6 text-gray-500">
        Clubs list
      </h2>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <tr className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <th>Name</th>
          <th>Description</th>
          <th>Location</th>
          <th>Courts count</th>
        </tr>
        {clubsList.map((club) => (
          <tr
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            key={club.id}
          >
            <td>{club.name}</td>
            <td>{club.description.substring(0, 30)}</td>
            <td>{club.location}</td>
            <td>{club.courts.length}</td>
          </tr>
        ))}
      </table>
    </>
  );
};

export default ClubsPage;

import CreateLocationForm from '@/components/CreateLocationForm';

import { getAllLocations } from '@/services/locationService';

const LocationsPage = async () => {
  const locationsList = await getAllLocations();

  return (
    <>
      <h1 className="text-lg font-semibold leading-6 text-gray-900">
        Locations page
      </h1>

      <h2 className="text-lg font-semibold leading-6 text-gray-500">
        Add new location
      </h2>

      <CreateLocationForm />

      <h2 className="mt-20 text-lg font-semibold leading-6 text-gray-500">
        Locations list
      </h2>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <tr className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <th>Name</th>
          <th>Description</th>
          <th>Location</th>
          <th>Courts count</th>
        </tr>
        {locationsList.map((location) => (
          <tr
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            key={location.id}
          >
            <td>{location.name}</td>
            <td>{location.description.substring(0, 30)}</td>
            <td>{location.location}</td>
            <td>{location.courts.length}</td>
          </tr>
        ))}
      </table>
    </>
  );
};

export default LocationsPage;

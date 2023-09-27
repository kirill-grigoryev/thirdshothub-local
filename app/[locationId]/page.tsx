import { getAllLocations } from '@/services/locationService';

export const generateStaticParams = async () => {
  const res = await (await getAllLocations());

  return res.map((location: { id: string }) => ({
    locationId: location.id,
  }));
};

const LocationHomePage = async ({
  params,
}: {
  params: { locationId: string };
}) => {
  const { locationId } = params;

  

  return (
    <>
      <h1>{`${locationId} home page`}</h1>
    </>
  );
};

export default LocationHomePage;

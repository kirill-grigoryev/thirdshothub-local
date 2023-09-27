export const generateStaticParams = async () => {
  const locations = await import('@/app/api/location/route');

  const res = await (await (locations.GET())).json();

  return res.map((location: { id: string }) => ({
    slug: location.id,
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

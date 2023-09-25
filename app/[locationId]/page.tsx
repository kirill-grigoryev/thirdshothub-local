export const generateStaticParams = async () => {
  const locations = await fetch(`${process.env.URL}/api/location`, {
    next: { revalidate: 21600 },
  });

  const res = await locations.json();

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

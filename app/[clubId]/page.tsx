import { getAllClubs } from '@/services/ClubService';

export const generateStaticParams = async () => {
  const res = await getAllClubs();

  return res.map((club: { id: string }) => ({
    clubId: club.id,
  }));
};

const ClubHomePage = async ({
  params,
}: {
  params: { clubId: string };
}) => {
  const { clubId } = params;

  

  return (
    <>
      <h1>{`${clubId} home page`}</h1>
    </>
  );
};

export default ClubHomePage;

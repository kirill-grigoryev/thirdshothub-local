import { getAllUsers } from '@/services/userService';

const Players = async () => {
  const playersList = await getAllUsers();

  return (
    <>
      <h1>Players list</h1>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <tr className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <th>Name</th>
          <th>Email</th>
        </tr>
        {playersList.map((player) => (
          <tr
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            key={player.id}
          >
            <td>{player.name}</td>
            <td>{player.email}</td>
          </tr>
        ))}
      </table>
    </>
  );
};

export default Players;

const Players = async () => {
    const playersList = await (await fetch(`${process.env.URL}/api/user`)).json();

    return (
        <>
            <h1>Players list</h1>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
                {playersList.map((player: {id: string; name: string; email: string}) => (
                    <tr key={player.id}>
                        <td>{player.name}</td>
                        <td>{player.email}</td>
                    </tr>
                ))}
            </table>
        </>
    )
}

export default Players;
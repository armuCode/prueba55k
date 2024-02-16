/* eslint-disable @typescript-eslint/indent */
import { useEffect, useState } from "react";
import "./App.css";
import { type User } from "./types.d";
import UserList from "./components/UserList";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColor, setShowColor] = useState<boolean>(false);
  const [sortByCountry, setSortByCountry] = useState<boolean>(false);

  function toggleColors() {
    setShowColor(!showColor);
  }

  function toggleSortByCountry() {
    setSortByCountry((prevState) => !prevState);
  }

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=100")
      .then(async (res) => await res.json())
      .then((res) => {
        setUsers(res.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const sortedUsers = sortByCountry
    ? users.toSorted((a, b) => {
        return a.location.country.localeCompare(b.location.country);
      })
    : users;

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email);
    setUsers(filteredUsers);
  };

  return (
    <div className="App">
      <h1>Prueba tecnica</h1>
      <header>
        <main>
          <button onClick={toggleColors}>Color</button>
          <button onClick={toggleSortByCountry}>
            {sortByCountry ? "No ordenar por pais" : "ordenar por pais"}
          </button>
        </main>
      </header>
      <UserList
        users={sortedUsers}
        showColor={showColor}
        deleteUser={handleDelete}></UserList>
    </div>
  );
}

export default App;

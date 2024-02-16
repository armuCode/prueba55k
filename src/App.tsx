/* eslint-disable @typescript-eslint/indent */
import { useEffect, useState, useRef } from "react";
import "./App.css";
import { type User } from "./types.d";
import UserList from "./components/UserList";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColor, setShowColor] = useState<boolean>(false);
  const [sortByCountry, setSortByCountry] = useState<boolean>(false);
  const originalUsers = useRef<User[]>([]);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);

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
        originalUsers.current = res.results;
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

  function handleReset() {
    setUsers(originalUsers.current);
  }

  return (
    <div className="App">
      <main>
        <h1>Prueba tecnica</h1>
        <header>
          <button onClick={toggleColors}>Color</button>
          <button onClick={toggleSortByCountry}>
            {sortByCountry ? "No ordenar por pais" : "ordenar por pais"}
          </button>
          <button onClick={handleReset}>Reset</button>
          <input
            placeholder="Buscar por pais"
            onChange={(e) => {
              setFilterCountry(e.target.value);
            }}
          />
        </header>
      </main>
      <UserList
        users={sortedUsers}
        showColor={showColor}
        deleteUser={handleDelete}></UserList>
    </div>
  );
}

export default App;

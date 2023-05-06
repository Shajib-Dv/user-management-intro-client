/** @format */

import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/user")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }, []);

  //handle add user
  const handleAddUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const user = { name, email };

    fetch("http://localhost:5000/user", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const newUsers = [...users, data];
        setUsers(newUsers);
        e.target.reset();
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="user-name" placeholder="user name" />
        <br />
        <input
          type="email"
          name="email"
          id="user-email"
          placeholder="user email"
        />
        <br />
        <input type="submit" value="Add user" />
      </form>
      <div>
        <h1>User management client site</h1>
        <h2>Available user {users.length}</h2>
        {users?.map((user) => (
          <p key={user.id}>
            {user.id}: {user.name} : {user.email}
          </p>
        ))}
      </div>
    </>
  );
}

export default App;

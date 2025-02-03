import React, { useState } from "react";
import UserTable from "./components/UserTable";
import UserDetail from "./components/UserDetail";
import { User } from "./types/type";



const App:React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div>
      <h1>User Details</h1>
      {!selectedUser ? (
        <UserTable onselect={(user) => setSelectedUser(user)} />
      ) : (
        <UserDetail user={selectedUser} backbutton={() => setSelectedUser(null)} />
      )}
    </div>
  );
};

export default App;

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { friend, userDetailProp } from "../types/type";
import { fetchUserFriends } from "../utils/fetchutil";
import Button from "../ui/Button";
import Table from "../ui/Table";


const UserDetail: React.FC<userDetailProp> = ({ user, backbutton }) => {
  const { data, error, isLoading } = useQuery<{ data: friend[] }, Error>({
    queryKey: ["userFriends", user.username],
    queryFn: () => fetchUserFriends(user.username),
  });

  const friends: friend[] = data?.data || [];

  return (
    <>
      <div>
        <img src={user.images.jpg.image_url} alt={user.username} />
        <p><strong>USERNAME:</strong> {user.username}</p>
        <p><strong>GENDER:</strong> {user.gender || "N/A"}</p>
        <p><strong>LAST ONLINE:</strong> {user.last_online}</p>
      </div>
      <Button onClick={backbutton}>Back To List</Button>

      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Failed to load data</p>}

      <Table
        data={friends}
        columns={[
          { header: "Username", render: (friend) => friend.user.username },
          { header: "Last Online", render: (friend) => friend.last_online },
          {
            header: "Image",
            render: (friend) => (
              <img src={friend.user.images.jpg.image_url} alt={friend.user.username} width="50" />
            ),
          },
          { header: "Friend Since", render: (friend) => friend.friends_since || "Unknown" },
        ]}
      />
    </>
  );
};

export default UserDetail;

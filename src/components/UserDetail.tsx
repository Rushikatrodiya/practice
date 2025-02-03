import React from "react";
import { useQuery } from "@tanstack/react-query";
import { friend, userDetailProp } from "../types/type";

const fetchUserFriends = async (username: string): Promise<{ data: friend[] }> => {
  const response = await fetch(
    `https://api.jikan.moe/v4/users/${username}/friends`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch user friends");
  }
  return response.json();
};

const UserDetail: React.FC<userDetailProp> = ({ user, backbutton }) => {
  const { data, error, isLoading } = useQuery<{ data: friend[] }, Error>({
    queryKey: ["userFriends", user.username],
    queryFn: () => fetchUserFriends(user.username),
    enabled: !!user, // Fetch only when user exists
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
      <button onClick={backbutton}>Back To List</button>

      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Failed to load data</p>}

      {friends.length > 0 ? (
        <table style={{ marginTop: "30px" }}>
          <thead>
            <tr>
              <th>Username</th>
              <th>Last Online</th>
              <th>Image</th>
              <th>Friend Since</th>
            </tr>
          </thead>
          <tbody>
            {friends.map((friend) => (
              <tr key={friend.user.username}>
                <td>{friend.user.username}</td>
                <td>{friend.last_online}</td>
                <td>
                  <img src={friend.user.images.jpg.image_url} alt="" width="50" />
                </td>
                <td>{friend.friends_since || "Unknown"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No friends found for this user.</p>
      )}
    </>
  );
};

export default UserDetail;

import { useParams, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import useUserFriend from "../hook/useUserFriend";
import useUserDetail from "../hook/useUserDetail"; // Import the new hook
import Table from "../ui/Table";

const UserDetail = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const { user, status } = useUserDetail(username!);
  const { dataList, status: friendsStatus } = useUserFriend(username!);

  if (status === "pending" || friendsStatus === "pending") {
    return <span>Loading...</span>;
  } else if (status === "error" || friendsStatus === "error") {
    return <span style={{ color: "red" }}>Failed to load data</span>;
  }

  if (!user) return null;

  return (
    <>
      <div>
        <img src={user.images.jpg.image_url} alt={user.username} />
        <p>
          <span>USERNAME : </span>
          {user.username}
        </p>
        <p>
          <span>LAST ONLINE : </span>
          {user.last_online}
        </p>
      </div>
      <Button onClick={() => navigate("/")} color="green">
        Back To UserData
      </Button>

      {dataList.length === 0 ? (
        <p>There's no friends in list</p>
      ) : (
        <Table
          data={dataList}
          type="friend"
          columns={[
            { header: "Username", render: (friend) => friend.user.username },
            { header: "Last Online", render: (friend) => friend.last_online },
            {
              header: "Image",
              render: (friend) => (
                <img
                  src={friend.user.images.jpg.image_url}
                  alt={friend.user.username}
                  width="50"
                />
              ),
            },
            {
              header: "Friend Since",
              render: (friend) => friend.friends_since || "Unknown",
            },
          ]}
        />
      )}
    </>
  );
};

export default UserDetail;

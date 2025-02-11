import useUserList from "../hook/useUserList";
import Button from "../ui/Button";
import Input from "../ui/Input";
// import { filteredData } from "../utility/filterFunction";
// import useUserList from "../hook/useUserList";
import Table from "../ui/Table";
import { useNavigate } from "react-router-dom";
import { filteredData } from "../utility/filterFunction";

const UserTable = () => {
  const navigate = useNavigate();
  const {
    page,
    handleNext,
    handlePrev,
    searchValue,
    setSearchValue,
    dataList,
    isLoading,
    isFetching,
    error,
  } = useUserList();

  const data = filteredData(dataList, searchValue);
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Failed to load data</p>}
      <Input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {data.length === 0 ? (
        <div>Data not found</div>
      ) : (
        <Table
          type="list"
          data={data}
          handleNext={handleNext}
          handlePrev={handlePrev}
          page={page}
          columns={[
            {
              header: "User Image",
              render: (user) => (
                <img
                  src={user.images.jpg.image_url}
                  alt={user.username}
                  width="50"
                />
              ),
            },
            {
              header: "Username",
              render: (user) => user.username,
            },
            {
              header: "Actions",
              render: (user) => (
                <Button
                  onClick={() => navigate(`/user/${user.username}`)}
                  color="blue"
                >
                  View Details
                </Button>
              ),
            },
          ]}
        />
      )}

      {isFetching ? <p>Loading new page...</p> : undefined}
    </>
  );
};

export default UserTable;
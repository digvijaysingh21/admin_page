import React from "react";
import { useState, useEffect } from "react";
 //act as div or a wrapper component packages all style function
import { Box} from "@mui/material"; 
//for messages in different variations for enqueueSnackbar
import { useSnackbar } from "notistack"; 
// for making http request
import axios from "axios";
//table view from material ui
import TableAction from "./TableAction";
//for pagination
import PaginationSelectiveDeletion from "./pagination_selectDeletion"; 
//act like flex container
import { Stack } from "@mui/material";
//for search
import Searchcaction from "./filterSearch"


//after fetching data from  api  
// hanlde id, name, email, role throughly

const UserList = () => {
  //for showing varios message forms like error, warning, success
  const { enqueueSnackbar } = useSnackbar();
  //after fetching data from api useState so that original data remain same 
  //and changes will be made to this staes throughly
  const [userList, setuserList] = useState([]);
  //given 10 users per page
  const [totalRow, setTotalRow] = useState(10);
  //the page on UI showing to user
  const [activePage, setActivePage] = useState(1);
  //search list
  const [searchUserList, setSearchUserList] = useState("");
  //for result based on search
  const [searchResult, setSearchResult] = useState([]);
  //select row for edit
  const [selectedRowEdit, setSelectedRowEdit] = useState(new Set());
  //edit row
  const [editRowData, setEditRowData] = useState({});
  const [rowchosed, setRowChosed] = useState(new Set());

  //for fetching the data 
  useEffect(() => {
    dataReceived();
  }, []);

  //for filtering user for search
  useEffect(() => {
    handleSearch();
  }, [searchUserList]);

  const dataReceived = async () => {
    const API_URL = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

    //if http request is success
    try {
      const response = await axios.get(API_URL);
      setuserList(response.data);
      //if http request is not success
    } catch (error) {
      console.log(error);
      setuserList([]);
    }
  };

 //function for searching on all fields
  const handleSearch = () => {
  

    //storing data from filtered data
    const filtered = userList.filter((userRecord) => {
      const serachDataList = new RegExp(searchUserList, "i");

      //applying conditions for searching basically string.search(sample)
      //search by name condition
      if (userRecord.name.search(serachDataList) !== -1) return true;
      //search by email condition
      if (userRecord.email.search(serachDataList) !== -1) return true;
      //search by role condition
      if (userRecord.role.search(serachDataList) !== -1) return true;

      return false;
    });

    setSearchResult(filtered);
  };

  
  //delete row 
  const deleteUser = (id) => {
  //delete the row of delete icon
    const userLeft = userList.filter((list) => list.id !== id);
    const outcome = searchResult.filter((list) => list.id !== id);

    try {
      setuserList(userLeft);
      setSearchResult(outcome);
      //error message
      enqueueSnackbar(`User has been deleted`, {
        variant: "error"
      });
      return;
    } catch (error) {
      console.log(error);
    }
  };

 

  const fillUpData = (id) => {
    const trackUser = userList.findIndex((list) => list.id === id);
    const list = userList[trackUser];

    setEditRowData({ ...editRowData, [id]: { ...list } });
  };

//data changed afetr edit only in memeory
  const dataAfterEdit = (id) => {
    const trackUser = userList.findIndex((list) => list.id === id);

    if (trackUser === -1) return;

    try {
      const updatedUser = [...userList];

      updatedUser[trackUser]["name"] = editRowData[id].name;
      updatedUser[trackUser]["email"] = editRowData[id].email;
      updatedUser[trackUser]["role"] = editRowData[id].role;

      setuserList(updatedUser);
    } catch (error) {
      console.log(error);
    } finally {
      const updatedRowEdit = new Set(selectedRowEdit);

      updatedRowEdit.delete(id);

      setSelectedRowEdit(updatedRowEdit);
    }
  };

 

  //handling user edit

  const editUsersDetails = (id) => {
    if (selectedRowEdit.has(id)) {
      dataAfterEdit(id);
      //warning message after edit
      enqueueSnackbar(`Record is Upto Date`, {
        variant: "warning"
      });
      return;
    }

    const newRecord= new Set( selectedRowEdit);
    newRecord.add(id);
    setSelectedRowEdit( newRecord);

    fillUpData(id);
  };

  

  const updateUsersData = (event, id, key) => {
    setEditRowData({
      ...editRowData,
      [id]: { ...editRowData[id], [key]: event.target.value }
    });
  };

  //for clicked and updation
  const checkboxClickedEvent = (event, id) => {
    let selectionMade = new Set(rowchosed);

    if (selectionMade.has(id)) {
      selectionMade.delete(id);
    } else {
      selectionMade.add(id);
    }
    setRowChosed(selectionMade);
  };

 
//select all checkbox for deletion
  const AllCheckboxEvent = (e) => {
    const start = (activePage - 1) * totalRow;
    const end = activePage * totalRow;

    let onHoldUser = [...(searchUserList.length === 0 ? userList : searchResult)];
    onHoldUser = onHoldUser.slice(start, end);

    console.log(e.target.checked);
    let recentlyUpdated = new Set(rowchosed);
    for (let i = 0; i <onHoldUser.length; i++) {
      if (e.target.checked) {
        recentlyUpdated.add(onHoldUser[i].id);
      } else {
        recentlyUpdated.delete(onHoldUser[i].id);
      }
    }

    setRowChosed(recentlyUpdated);
  };

  // delete selected

  const DeleteOfChosen = () => {
    let total = userList.length;
    const selectiveUser = userList.filter((list) => !rowchosed.has(list.id));
    total = total - selectiveUser.length;
    const selectiveTotal = searchResult.filter(
      (list) => !rowchosed.has(list.id)
    );

    try {
      setuserList(selectiveUser);
      setSearchResult(selectiveTotal);
      enqueueSnackbar(
        `user deleted`,
        {
          variant: "error"
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setRowChosed(new Set());
    }
  };

  //  Main component
  return (
    <Stack
      className="container"
      direction="column"
      justifyContent="space-between"
      spacing={2}
    >
      <Box className="searchcontainer">
        <Searchcaction searchUserList={searchUserList} setSearchUserList={setSearchUserList} />
      </Box>

      <Box className="viewtable">
        <TableAction
          data={searchUserList.length === 0 ? userList : searchResult}
          activePage={activePage}
          totalRow={totalRow}
          rowchosed={rowchosed}
          selectedRowEdit={selectedRowEdit}
          editRowData={editRowData}
          handleEdit={editUsersDetails}
          updateUsersData={updateUsersData}
          deleteUser={deleteUser}
          checkboxClickedEvent={checkboxClickedEvent}
          operationOnAllClick={AllCheckboxEvent}
        />
      </Box>

      <Box className="tablework">
        <PaginationSelectiveDeletion
          data={searchUserList.length === 0 ? userList : searchResult}
          totalRow={totalRow}
          activePage={activePage}
          setActivePage={setActivePage}
          DeleteOfChosen={DeleteOfChosen}
        />
      </Box>
    </Stack>
  );
};

export default UserList;

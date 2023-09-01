import React from "react";
import TextField from "@mui/material/TextField";

export default function Searchcaction({ searchUserList, setSearchUserList }) {
  return (
    <TextField
      id="searchtext"
      type="search"
      value={searchUserList}
      variant="outlined"
      onChange={(e) => setSearchUserList(e.target.value)}
      placeholder="Search name email or role"
      fullWidth
    />
  );
}

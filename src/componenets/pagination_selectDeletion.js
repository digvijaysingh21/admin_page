import React from "react";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import Pagination from "@mui/material/Pagination";



export default function PaginationSelectiveDeletion({
  data,
  totalRow,
  activePage,
  setActivePage,
  DeleteOfChosen
}) {
  const SelectedDeletion = ({ DeleteOfChosen }) => (
    <Button
      id="selected-deletion"
      onClick={DeleteOfChosen}
      sx={{
        color: "common.white",
        bgcolor: "button.danger.main",
        "&:hover": {
          bgcolor: "button.danger.dark"
        }
      }}
    >
      DELETE SELECTED
    </Button>
  );

  //pagination logic

  const PaginationHandle = ({  activePage,dataLength, totalRow }) => (
    <Pagination
      page={activePage}
      count={Math.ceil(dataLength / totalRow)}
      color="primary"
      //for first button
      showFirstButton
      //for last button
      showLastButton
      sx={{
        alignSelf: "center"
      }}
      onChange={(e, page) => {
      setActivePage(page);
      }}
    />
  );

  return (
    <Stack
      alignItems="strech"
      justifyContent="space-between"
      direction={{ xs: "column", md: "row" }}
      spacing={4}
      id="table-triggered"
    >
      <SelectedDeletion DeleteOfChosen={DeleteOfChosen} />

      <PaginationHandle
        dataLength={data.length}
        activePage={activePage}
        totalRow={totalRow}
      />
    </Stack>
  );
}

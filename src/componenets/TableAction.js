import React from "react";
//edit icon
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
//check icon for checkbox basically
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
//table from material ui
import {Stack,Table,TableHead,TableBody,TableContainer,TableCell,TableRow} from "@mui/material";
import { Input,Checkbox, Paper,IconButton, } from "@mui/material";
//deleteicon
import DeleteTwoTone from "@mui/icons-material/DeleteTwoTone";

 function TableAction({
  data,
  editRowData,
  totalRow,
  activePage,
  selectedRowEdit,
  rowchosed,
  handleEdit,
  updateUsersData,
  deleteUser,
 checkboxClickedEvent,
 operationOnAllClick
}) {

 
//pagination logic for page
  const startIndex = (activePage - 1) * totalRow;
  const endIndex = activePage * totalRow;

  let dataRange = data.slice(startIndex, endIndex);

  //for selecting all and diselecting all
  let currentChecked = dataRange.every((operator) => rowchosed.has(operator.id));

//return id of row selected
  const taken = (id) => {
    return rowchosed.has(id);
  };

  const revisedRow = (operator, modify) => (
    <TableCell align="center">
      {selectedRowEdit.has(operator.id) ? (
        <Input
          value={editRowData[operator.id][modify]}
          onChange={(event) => updateUsersData(event, operator.id, modify)}
        />
      ) : (
        operator[modify]
      )}
    </TableCell>
  );

 
//get that particular row for edit
  const getoperatorRow = (operator, i) => {
    const moduleChosed = taken(operator.id);
    const tagId = `operator-list-table-label-${i}`;

    return (
      <TableRow
        key={tagId}
        role="checkbox"
        className="tablerow"
        rowchosed={moduleChosed}
        aria-checked={moduleChosed}
        sx={{
          // "&.Mui-selected, &.Mui-selected:hover": {
            "&:hover": {
            backgroundColor: "secondary.main"
          }
        }}
      >
        <TableCell
          align="center"
          onClick={(event) =>checkboxClickedEvent(event, operator.id)}
        >
          <Checkbox
            color="primary"
            checked={moduleChosed}
            inputProps={{
              "aria-labelledby": { tagId }
            }}
          />
        </TableCell>

        {revisedRow(operator, "name")}
        {revisedRow(operator, "email")}
        {revisedRow(operator, "role")}

        <TableCell align="center">
          <Stack direction="row"  spacing={3} justifyContent="center" >
            <IconButton
              aria-label="edit"
              size="medium"
              sx={{ color: "#42a5f5" }}
              label={operator.id}
              onClick={() => handleEdit(operator.id)}
            >
              {selectedRowEdit.has(operator.id) ? (
                <CheckBoxOutlinedIcon fontSize="inherit" />
              ) : (
                <EditOutlinedIcon fontSize="inherit" />
              )}
            </IconButton>

            <IconButton
              aria-label="delete"
              size="medium"
              sx={{ color: "#d32f2f" }}
              onClick={() => deleteUser(operator.id)}
            >
              <DeleteTwoTone fontSize="inherit" />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>
    );
  };

  /**
   * Table of our operator List View
   */

  const TableHeader = ({
    rowchosed,
    currentChecked,
   operationOnAllClick
  }) => (
    <TableHead>
      <TableRow>
        <TableCell align="center">
          <Checkbox
            color="primary"
            indeterminate={rowchosed.size > 0 && !currentChecked}
            checked={rowchosed.size > 0 && currentChecked}
            onClick={operationOnAllClick}
            inputProps={{
              "aria-labelledby": "header"
            }}
          />
        </TableCell>

        <TableCell align="center">
          <strong>Name</strong>
        </TableCell>
        <TableCell align="center">
          <strong>Email</strong>
        </TableCell>
        <TableCell align="center">
          <strong>Role</strong>
        </TableCell>
        <TableCell align="center">
          <strong>Actions</strong>
        </TableCell>
      </TableRow>
    </TableHead>
  );

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHeader
          rowchosed={rowchosed}
          currentChecked={currentChecked}
         operationOnAllClick={operationOnAllClick}
        />

        <TableBody>{dataRange.map((d, i) => getoperatorRow(d, i))}</TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableAction;
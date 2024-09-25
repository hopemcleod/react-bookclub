import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { Button, HelixStyles } from "helix";
import { registerColumnsHelper } from "./RegisterColumnsHelper";
import { Dto } from "../../types/commonDomain.types";
import { RowData } from "../../modules/Meetings/types";
// import { RowData } from "../../modules/Meetings/types";

type RegisterProps<TData> = {
  title: string;
  description: string;
  columnsHelper: () => registerColumnsHelper<TData>;
};

export const Register = <TData extends Dto>(props: RegisterProps<TData>) => {
  const { columnsHelper, description, title } = props;
  const {
    columnDefinitions,
    objectName,
    createDrawerIsOpen,
    editDrawerIsOpen,
    renderCreateDrawer,
    renderEditDrawer,
    rows,
    setCreateDrawerIsOpen,
    setEditDrawerIsOpen,
    setClickedRow
  } = columnsHelper();
  // const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <Box
      marginTop="100px"
      marginLeft="50px"
      style={{ height: 500, width: "80%", position: "relative" }}
    >
      <Typography
        {...HelixStyles.style_01}
        {...HelixStyles.truncate}
        data-id="register-title"
        component="h1"
        lineHeight="initial"
        title={title}
        whiteSpace="nowrap"
      >
        {title}
      </Typography>
      {description > "" && (
        <Typography
          {...HelixStyles.textBase}
          data-id="register-description"
          maxWidth="80ch"
        >
          {description}
        </Typography>
      )}
      <Button
        dataId="create-button"
        label={`Create ${objectName}`}
        onClick={() => setCreateDrawerIsOpen(true)}
        size="large"
        style={{ position: "absolute", top: 0, right: 0 }}
      />
      <DataGrid
        rows={rows}
        onRowClick={(params) => {
          setClickedRow(params.row);
          setEditDrawerIsOpen(true);
        }}
        columns={columnDefinitions}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        style={{ top: 20, width: "100%" }}
      />
      {createDrawerIsOpen && renderCreateDrawer()}
      {editDrawerIsOpen && renderEditDrawer()}
      {/* {actionEditData && renderEditDrawer}  actionEditData will contain the id of the meeting to be edited in the drawer*/}
      {/* Have a state for actionDeleteData above so know which meeting record to delete */}
    </Box>
  );
};

export default Register;

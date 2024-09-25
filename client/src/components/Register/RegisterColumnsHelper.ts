import { Dispatch, SetStateAction } from "react";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { Meeting, RowData } from "../../modules/Meetings/types";

export type registerColumnsHelper<TData> = {
  columnDefinitions: GridColDef[];
  createDrawerIsOpen: boolean;
  editDrawerIsOpen: boolean;
  objectName: string;
  renderCreateDrawer: () => JSX.Element;
  renderEditDrawer: () => JSX.Element;
  rows: GridRowsProp;
  setCreateDrawerIsOpen: Dispatch<SetStateAction<boolean>>;
  setEditDrawerIsOpen: Dispatch<SetStateAction<boolean>>;
  setClickedRow: Dispatch<SetStateAction<Partial<TData>>>;
  tempList?: TData[]; // This is only here to stop the linter complaining. I think I will need TData. Could also make ESLint less strict
};

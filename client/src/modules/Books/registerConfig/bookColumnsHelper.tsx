import { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  Drawer,
  FormControlLabel,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  MenuItem,
  IconButton,
  Menu,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { Book, BookStatus } from "../types";
import { getBooksApi } from "../../../api/api";
import { registerColumnsHelper } from "../../../components";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button } from "helix";

const ActionsMenu = ({ row }: { row: Book }) => {
  // const ActionsMenu = ({ id }: { id: number | string }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    // Handle change status logic here
    // recordId > 0 && setMeetingEditActionData(recordId);
    console.log(row);
    handleMenuClose();
  };

  const handleDelete = () => {
    // Handle delete logic here
    // recordId > 0 && setMeetingDeleteActionData()
    console.log(row);
    handleMenuClose();
  };

  return (
    <div>
      <IconButton onClick={handleMenuClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </div>
  );
};
export const bookColumns = (): registerColumnsHelper<Book> => {
  const [rows, setRows] = useState<Book[]>([]);
  const [addBookDetails, setAddBookDetails] = useState<Partial<Book>>({});
  const [save, setSave] = useState<boolean>();
  const [createDrawerIsOpen, setCreateDrawerIsOpen] = useState(false);
  const [editDrawerIsOpen, setEditDrawerIsOpen] = useState(false);
  const [rowClicked, setClickedRow] = useState<Partial<Book>>({});

  const [formData, setFormData] = useState<Partial<Book>>();

  useEffect(() => {
    const getBooks = async () => {
      const { result } = await getBooksApi();
      setRows(result);
    };

    getBooks();
  }, []);

  // Write new book info to the database.
  useEffect(() => {
    setCreateDrawerIsOpen(false);
    // Do database write
    setSave(false);
  }, [save]);

  const renderCreateDrawer = () => {
    return (
      <Drawer
        anchor="right"
        open={createDrawerIsOpen}
        onClose={() => setCreateDrawerIsOpen(false)}
      >
        <Box sx={{ width: 600, height: 600, padding: 3 }}>
          <Typography variant="h6" gutterBottom>Add Book</Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Author"
            name="author"
            value={formData?.author || ""}
            onChange={(e) =>
              setAddBookDetails({ ...formData, author: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Genre"
            name="genre"
            value={formData?.genre || ""}
            onChange={(e) =>
              setAddBookDetails({ ...formData, genre: e.target.value })
            }
          />
          <InputLabel htmlFor="pages">Pages</InputLabel>
          <OutlinedInput
            id="pages"
            name="pages"
            type="number"
            value={formData?.pages ?? ""}
            onChange={(e) =>
              setAddBookDetails({
                ...formData,
                pages: parseInt(e.target.value),
              })
            }
            label="Pages"
          />
          <Box sx={{ marginTop: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData?.bookClub || false}
                onChange={(e) =>
                  setAddBookDetails({
                    ...formData,
                    bookClub: Boolean(e.target.value),
                  })
                }
                name="bookClub"
              />
            }
            label="Book Club"
          />
          </Box>
          <Button
            dataId="cancel-button"
            label="Cancel"
            onClick={() => setCreateDrawerIsOpen(false)}
            size="large"
            style={{ position: "absolute", bottom: 10, right: 100 }}
          />
          <Button
            dataId="save-button"
            label="Save"
            onClick={() => {
              setCreateDrawerIsOpen(false);
            }}
            size="large"
            style={{ position: "absolute", bottom: 10, right: 10 }}
          />
        </Box>
      </Drawer>
    );
  };

  const renderEditDrawer = () => {
    return (
      <Drawer
        anchor="right"
        open={editDrawerIsOpen}
        onClose={() => setEditDrawerIsOpen(false)}
      >
        <Box sx={{ width: 300, p: 3 }}>
          <Typography variant="h6" gutterBottom></Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Author"
            name="author"
            value={formData?.author || ""}
            onChange={(e) =>
              setAddBookDetails({ ...formData, author: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Genre"
            name="genre"
            value={formData?.genre || ""}
            onChange={(e) =>
              setAddBookDetails({ ...formData, genre: e.target.value })
            }
          />
          <InputLabel htmlFor="pages">Pages</InputLabel>
          <OutlinedInput
            id="pages"
            name="pages"
            type="number"
            value={formData?.pages ?? ""}
            onChange={(e) =>
              setAddBookDetails({
                ...formData,
                pages: parseInt(e.target.value),
              })
            }
            label="Pages"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData?.bookClub || false}
                onChange={(e) =>
                  setAddBookDetails({
                    ...formData,
                    bookClub: Boolean(e.target.value),
                  })
                }
                name="bookClub"
              />
            }
            label="Book Club"
          />
          <Button
            dataId="cancel-button"
            label="Cancel"
            onClick={() => setEditDrawerIsOpen(false)}
            size="large"
            style={{ position: "absolute", bottom: 10, right: 100 }}
          />
          <Button
            dataId="save-button"
            label="Save"
            onClick={() => {
              setEditDrawerIsOpen(false);
              // setMeetingUpdated(true);
            }}
            size="large"
            style={{ position: "absolute", bottom: 10, right: 10 }}
          />
        </Box>
      </Drawer>
    );
  };

  const renderStatus = (status: number): React.ReactNode | undefined => {
    let backgroundColor = undefined;
    let text = undefined;

    switch (status) {
      case BookStatus.Started:
        backgroundColor = "green";
        text = "Started";
        break;
      case BookStatus.NotStarted:
        backgroundColor = "grey";
        text = "Not Started";
        break;
      case BookStatus.Finished:
        backgroundColor = "brown";
        text = "Finished";
        break;
      case BookStatus.Incomplete:
        backgroundColor = "orange";
        text = "Incomplete";
        break;
      case BookStatus.Archived:
        backgroundColor = "grey";
        text = "Archived";
        break;
    }

    return (
      <Box
        sx={{
          backgroundColor: backgroundColor,
          borderRadius: "0.75rem",
          color: "white",
          padding: "5px",
        }}
      >
        {text}
      </Box>
    );
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "title",
      headerName: "Title",
      type: "string",
      width: 300,
      editable: true,
    },
    {
      field: "author",
      headerName: "Author",
      type: "string",
      width: 150,
      editable: true,
    },
    {
      field: "genre",
      headerName: "Genre",
      type: "string",
      width: 110,
      editable: true,
    },
    {
      field: "pages",
      headerName: "Total pages",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "bookClub",
      headerName: "For Book Club",
      type: "boolean",
      width: 110,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      type: "number",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      renderCell: (params) => renderStatus(params.value),
    },
  ];

  return {
    columnDefinitions: columns,
    createDrawerIsOpen,
    editDrawerIsOpen,
    objectName: "Book",
    renderCreateDrawer,
    renderEditDrawer,
    rows: rows,
    setCreateDrawerIsOpen,
    setEditDrawerIsOpen,
    setClickedRow
  };
};

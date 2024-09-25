import { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Drawer,
  TextField,
  Typography,
  Box,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Menu,
  Link,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Button, ButtonMenuItem } from "helix";
import { enGB, enUS } from "date-fns/locale";
import { Meeting, MeetingStatus, RowData } from "../types";
import { Book } from "../../Books/types";
import { getMeetingsApi, getBooksApi, postMeetingApi } from "../../../api/api";
import { registerColumnsHelper } from "../../../components";

const ActionsMenu = ({ row }: { row: Meeting }) => {
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

export const meetingColumns = (): registerColumnsHelper<Meeting> => {
  const [rows, setRows] = useState<Meeting[]>([]);
  const [createDrawerIsOpen, setCreateDrawerIsOpen] = useState(false);
  const [editDrawerIsOpen, setEditDrawerIsOpen] = useState(false);
  const [newMeeting, setNewMeeting] = useState<Partial<Meeting>>({});
  const [updatedMeeting, setUpdatedMeeting] = useState<Partial<Meeting>>({});
  const [newMeetingCreated, setNewMeetingCreated] = useState<boolean>();
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [rowClicked, setClickedRow] = useState<Partial<Meeting>>({});

  // A list of allowed locales.
  const locales: { [key: string]: Locale } = {
    "en-US": enUS,
    "en-GB": enGB,
  };

  // Constants.
  const language = navigator.language;
  const locale = locales[language] || enGB;

  // Handle the actions menu.
  useEffect(() => {}, [isOpen]);

  // Gets a list of books so can use some of the details in a meeting entry.
  useEffect(() => {
    const getBooks = async () => {
      const { result } = await getBooksApi();

      setBooks(result);
    };

    getBooks();
  }, []);

  useEffect(() => {
    const getMeetings = async () => {
      const { result } = await getMeetingsApi();
      setRows(result);
    };

    getMeetings();
  }, []);

  // Write new meeting info to the database.
  useEffect(() => {
    const createMeeting = async () => {
      const { result } = await postMeetingApi({
        date: newMeeting.date ?? new Date(),
        bookId: newMeeting.bookId,
        readUpTo: newMeeting.readUpTo,
        status: MeetingStatus.Draft,
      });
    };

    if (newMeetingCreated) {
      createMeeting();
      setNewMeetingCreated(false);
    }
  }, [newMeetingCreated]);

  const renderCreateDrawer = () => {
    return (
      <Drawer
        anchor="right"
        open={createDrawerIsOpen}
        onClose={() => {
          setCreateDrawerIsOpen(false);
        }}
      >
        <Box sx={{ width: 600, height: 600, padding: 3 }}>
          <Typography variant="h6" gutterBottom>
            Create Meeting
          </Typography>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={locale}
          >
            <DateTimePicker
              label="Date and Time"
              value={newMeeting.date}
              onChange={(newDate) =>
                setNewMeeting({ ...newMeeting, date: newDate ?? undefined })
              }
              renderInput={(params) => (
                <TextField {...params} fullWidth margin="normal" />
              )}
            />
          </LocalizationProvider>
          <InputLabel id="book-title">Title</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value=''
            value={selectedBook?.title ?? ''}
            label="Title"
            style={{ width: "100%" }}
          >
            {books.map((book) => (
              <MenuItem
                value={book.title}
                onClick={() => {
                  setSelectedBook(book);
                  setNewMeeting({
                    ...newMeeting,
                    bookId: book.id,
                    title: book.title,
                  });
                }}
              >
                {book.title}
              </MenuItem>
            ))}
          </Select>
          <TextField
            fullWidth
            label="Read Up To"
            type="number"
            value={newMeeting.readUpTo}
            onChange={(e) =>
              setNewMeeting({
                ...newMeeting,
                readUpTo: parseInt(e.target.value) || 0,
              })
            }
            margin="normal"
          />
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
              setNewMeetingCreated(true);
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
        onClose={() => {
          setEditDrawerIsOpen(false);
        }}
      >
        <Box sx={{ width: 600, height: 600, padding: 3 }}>
          <Typography variant="h6" gutterBottom>
            Edit Meeting
          </Typography>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={locale}
          >
            <DateTimePicker
              label="Date and Time"
              value={rowClicked.date} // TODO Prob can't have this because it will just match whatever the data was when the row was clicked.
              onChange={(newDate) => null
                // setUpdatedMeeting({ ...newMeeting, date: newDate ?? undefined })
              }
              renderInput={(params) => (
                <TextField {...params} fullWidth margin="normal" />
              )}
            />
          </LocalizationProvider>
          <InputLabel id="book-title">Title</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value=''
            value={rowClicked.title} // TODO Prob can't have this because it will just match whatever the data was when the row was clicked.
            label="Title"
            style={{ width: "100%" }}
          >
            {books.map((book) => (
              <MenuItem
                value={book.title}
                onClick={() => {
                  setSelectedBook(book);
                  setUpdatedMeeting({
                    ...updatedMeeting,
                    bookId: book.id,
                    title: book.title,
                  });
                }}
              >
                {book.title}
              </MenuItem>
            ))}
          </Select>
          <TextField
            fullWidth
            label="Read Up To"
            type="number"
            value={rowClicked.readUpTo} // TODO Prob can't have this because it will just match whatever the data was when the row was clicked.
            onChange={(e) =>
              setUpdatedMeeting({
                ...updatedMeeting,
                readUpTo: parseInt(e.target.value) || 0,
              })
            }
            margin="normal"
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
      case MeetingStatus.Draft:
        backgroundColor = "grey";
        text = "Draft";
        break;
      case MeetingStatus.Scheduled:
        backgroundColor = "orange";
        text = "Scheduled";
        break;
      case MeetingStatus.Cancelled:
        backgroundColor = "red";
        text = "Cancelled";
        break;
      case MeetingStatus.Completed:
        backgroundColor = "green";
        text = "Completed";
        break;
    }

    return (
      <Box
        sx={{
          backgroundColor: backgroundColor,
          borderRadius: "0.75rem",
          color: "white",
          fontWeight: "bold",
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
      headerName: "Book Title",
      width: 150,
      editable: false,
      renderCell: (params) => (
        <Link
          href={`#${params.value}`}
          onClick={(params) => {
            setEditDrawerIsOpen(true);
          }}
        >
          {params.value}
        </Link>
      ),
    },
    {
      field: "date",
      headerName: "Meeting Date",
      width: 300,
      editable: false,
    },
    {
      field: "read_up_to",
      headerName: "Read Up To",
      type: "number",
      width: 110,
      editable: false,
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
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      description: "Allows actions on the record.",
      sortable: false,
      width: 160,
      // renderCell: (params) => <ActionsMenu id={params.id} />,
      renderCell: (params) => <ActionsMenu row={params.row} />,
    },
  ];

  return {
    columnDefinitions: columns,
    createDrawerIsOpen,
    editDrawerIsOpen,
    objectName: "Meeting",
    renderCreateDrawer,
    renderEditDrawer,
    rows: rows,
    setCreateDrawerIsOpen,
    setEditDrawerIsOpen,
    setClickedRow
  };
};
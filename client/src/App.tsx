import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { HelixApp } from "helix";
import { AuthenticatedApp, Login, Logout } from "./auth";
import { Register } from "./components";
import { HomeApp } from "./home";
import { Book } from "./modules/Books/types";
import { bookColumns } from "./modules/Books/registerConfig/bookColumnsHelper";
import { meetingColumns } from "./modules/Meetings/registerConfig/meetingColumnsHelper";
import { Meeting } from "./modules/Meetings/types";

function App() {
  return (
      <Box pl={10}>
        <BrowserRouter>
          <Routes>
            {/* Login */}
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />

            {/* Landing page */}
            {/* All routes that require authentication - contains the user context. */}
            <Route path="/" element={<AuthenticatedApp />}>
              <Route path="/*" element={<HomeApp />} />
              <Route path="home/*" element={<HomeApp />} />
              <Route
                path="/meetings/*"
                element={<Register<Meeting> title='Bookclub Meetings' description='A list of Bookclub meetings.' columnsHelper={meetingColumns} />}
              />
              <Route
                path="/library/*"
                element={<Register<Book> title='Books' description='A list of available books.' columnsHelper={bookColumns} />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </Box>
  );
}

export default App;

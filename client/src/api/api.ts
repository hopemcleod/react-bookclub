import { AuthenticationResponse, Credentials } from "./api.types";
import { Book } from "../modules/Books/types";
import { MeetingStatus } from "../modules/Meetings/types";

// The baseUrl should include the end '/'.
export const checkCredentialsApi = (body: Credentials) => {
  const baseUrl = "http://localhost:8081";

  const url = `${baseUrl}/auth/check-credentials`;

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`HTTP error ${response.status}`);
      }
    })
    .then((data: AuthenticationResponse) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const getMeetingsApi = () => {
  const baseUrl = "http://localhost:8081";

  const url = `${baseUrl}/meetings/meetings`;

  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`HTTP error ${response.status}`);
      }
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const postMeetingApi = (data: {
  date: Date;
  bookId: number | undefined;
  readUpTo: number | undefined;
  status: MeetingStatus;
}) => {
  const baseUrl = "http://localhost:8081";

  const url = `${baseUrl}/meetings/meetings`;

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`HTTP error ${response.status}`);
      }
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

export const getBooksApi = () => {
  const baseUrl = "http://localhost:8081";

  const url = `${baseUrl}/books/books`;

  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`HTTP error ${response.status}`);
      }
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const postBookApi = (data: Book) => {
  const baseUrl = "http://localhost:8081";

  const url = `${baseUrl}/books/books`;

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`HTTP error ${response.status}`);
      }
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

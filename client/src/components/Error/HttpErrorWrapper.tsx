import { Box, Typography } from "@mui/material";
import { HelixStyles, Hyperlink } from "helix";
import Http401 from "../../assets/images/Http401.png";
import Http403 from "../../assets/images/Http403.png";
import Http404 from "../../assets/images/Http404.png";
import Http500 from "../../assets/images/Http500.png";

/**
 * Props interface for HttpError.
 */
export interface HttpErrorProps {
  /**
   * The Http status code.
   */
  code: "401" | "403" | "404" | "500";
}

/**
 * Wrapper component to allow a "back to" link based on current location to be passed to the HttpError component.
 * This also supports errors when the translations might not be available (i.e. user session expired).
 */
export const HttpErrorWrapper = ({ code }: HttpErrorProps) => {

  // Calculate whether to show a link
  let header: string = "";
  let subHeader: string = "";

  // // Handle translations if not authenticated
  // // This is the reason we use our own and not the Helix+ component
  // // Text copied from the Helix+ docs
  // const translationsUnavailable = header === MISSING_PLACEHOLDER;

  let imgSrc = "";

  switch (code) {
    case "401":
      imgSrc = Http401;
      header = "Unauthorised error";
      subHeader = "Sorry, your request could not be processed.";
      break;
    case "403":
      imgSrc = Http403;
      header = "Access denied";
      subHeader = "Sorry, you don't have permission to view this page.";
      break;
    case "404":
      imgSrc = Http404;
      header = "Oops! It looks like you are lost!";
      subHeader = "Sorry, we couldn't find the page you are looking for.";
      break;
    case "500":
    default:
      imgSrc = Http500;
      header = "Something has gone wrong";
      subHeader = "Please contact your system administrator.";
      break;
  }

  // Calculate the hyperlink to provide to the user to attempt to return to a usable screen
  let url = "",
    linkLabel = "";
  // If 401, must go back to login regardless of entity info provided - they might be logged in but not licensed, so go via Logout
  if (code === "401")  
    url = "/login";

  // Constants.
  const dataIdPrefix = `http-error-${code}`;

  return (
    <Box
      data-id={dataIdPrefix}
      alignItems="center"
      display="flex"
      height="100%"
      justifyContent="center"
      width="100%"
    >
      <Box mb="1.5rem">
        <Typography
          data-id={`${dataIdPrefix}-header`}
          {...HelixStyles.style_01}
          component="h1"
        >
          {header}
        </Typography>
        <Typography
          data-id={`${dataIdPrefix}-sub-header`}
          {...HelixStyles.style_06}
          component="h2"
        >
          {subHeader}
        </Typography>
        <Hyperlink a={<a href={url}>{linkLabel}</a>} />
      </Box>
      <img
        data-id={`${dataIdPrefix}-image`}
        src={imgSrc}
        alt={header}
        height={500}
      />
    </Box>
  );
};

export default HttpErrorWrapper;

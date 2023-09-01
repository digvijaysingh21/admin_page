import { createTheme } from "@mui/material/styles";
import { red, green, grey } from "@mui/material/colors";

const Theme = createTheme({
  palette: {
    secondary: {
      main: grey[200]
    },
    button: {
      success: {
        main: green[700],
        dark: green[900]
      },
      danger: {
        main: red[600],
        dark: red[800]
      }
    }
  }
});

export default Theme;

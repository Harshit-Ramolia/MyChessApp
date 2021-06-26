import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1A1A1D",
      light: "#F9F9F9",
    },
    secondary: {
      main: "#E98074",
      light: "#fffff",
    },
    error: {
      main: red.A400,
    },
  },
  spacing: 10,
});

export default theme;

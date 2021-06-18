import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#008080',
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;

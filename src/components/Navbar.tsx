import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

function isGoogleLoginResponse(object: any): object is GoogleLoginResponse {
  return "profileObj" in object;
}

const responseGoogle = (
  response: GoogleLoginResponse | GoogleLoginResponseOffline
) => {
  if (isGoogleLoginResponse(response)) console.log(response.profileObj);
};

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    color: theme.palette.secondary.light,
    background: theme.palette.primary.main,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    fontSize: "18px",
    fontWeight: 800,
    [theme.breakpoints.up("sm")]: {
      display: "block",
      fontSize: "22px",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

interface NavbarProps {
  setOpen: Function;
}

export default function PrimarySearchAppBar({ setOpen }: NavbarProps) {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.appBar} elevation={0}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={() => {
              setOpen((prev: Boolean) => !prev);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/">
            <Typography className={classes.title} variant="h6" noWrap>
              MYCHESSAPP
            </Typography>
          </Link>
          <div className={classes.grow} />
          <GoogleLogin
            clientId="343751366568-6gqpsmkdmb2d8oh0ghkkohhirgmrjge6.apps.googleusercontent.com"
            buttonText="Login"
            // onFailure={()=>()}
            onSuccess={responseGoogle}
            cookiePolicy={"single_host_origin"}
            render={(renderProps) => (
              <Button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                // disabled={true}
                variant="outlined"
                color="secondary"
                startIcon={
                  <img
                    src="icons/Google_'G'.png"
                    style={{ width: "18px" }}
                    alt=""
                  />
                }
              >
                Login
              </Button>
            )}
          />
          <div style={{ width: "100px" }}></div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

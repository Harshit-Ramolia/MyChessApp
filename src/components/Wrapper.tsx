import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useInvalidateQueryMutation } from "../generated/graphql";

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(5),
    [theme.breakpoints.up("lg")]: {
      paddingLeft: theme.spacing(30),
      paddingRight: theme.spacing(30),
    },
  },
}));

interface WrapperProps {}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const classes = useStyles();
  const location = useLocation();
  const [, invalidateQuery] = useInvalidateQueryMutation();
  useEffect(() => {
    invalidateQuery();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  return (
    <React.Fragment>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </React.Fragment>
  );
};

export default Wrapper;

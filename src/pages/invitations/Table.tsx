import React from "react";
import { withStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Button } from "@material-ui/core";
import { useAcceptInvitationMutation } from "../../generated/graphql";
import { useHistory } from "react-router-dom";

const StyledTableCell = withStyles((theme: Theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme: Theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.primary.light,
    },
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  accept: {
    color: "green",
    margin: "0 5px",
  },
  decline: {
    color: "red",
  },
});

export interface RowType {
  name: string;
  HostID: string;
}

interface CustomizedTablesProp {
  rows: Array<RowType>;
}

const CustomizedTables: React.FC<CustomizedTablesProp> = ({ rows }) => {
  const classes = useStyles();
  const history = useHistory();
  const [, accept] = useAcceptInvitationMutation();
  return (
    <TableContainer>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Sr. No.</StyledTableCell>
            <StyledTableCell align="center">Invited From</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell align="center" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button
                  onClick={() => {
                    accept({ hostID: row.HostID });
                    history.push("/game");
                  }}
                  variant="outlined"
                  size="small"
                  className={classes.accept}
                >
                  Accept
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomizedTables;

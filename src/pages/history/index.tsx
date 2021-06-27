import { Typography } from "@material-ui/core";
import React from "react";
import { useHistoryQuery, useMeQuery } from "../../generated/graphql";
import { useIsAuth } from "../../utils/useIsAuth";
import CustomizedTables, { RowType } from "./Table";

interface HistoryProps {}

const History: React.FC<HistoryProps> = () => {
  const [{ data, fetching }] = useHistoryQuery();
  const [{ data: me }] = useMeQuery();
  const isAuth = useIsAuth();
  let body = null;
  let rows: Array<RowType> = [];

  if (!fetching && data?.historyGames) {
    rows = data?.historyGames?.map((obj) => {
      let name = "";
      if (me?.me?._id === obj.white._id) {
        name = `${obj.black.username} (${obj.black.email}) as White`;
      } else {
        name = `${obj.white.username} (${obj.white.email}) as Black`;
      }
      return {
        name: name,
        positions: obj?.listOfPositions || [],
      };
    });
  }
  if (!isAuth) {
    body = (
      <Typography align="center">
        Please Login to see your Game History
      </Typography>
    );
  } else {
    body = <CustomizedTables rows={rows} />;
  }
  return <React.Fragment>{body}</React.Fragment>;
};

export default History;

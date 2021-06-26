import { Typography } from "@material-ui/core";
import React from "react";
import {
  useInvitationsQuery,
  useMeQuery,
  useNewInvitationSubscription,
} from "../../generated/graphql";
import { useIsAuth } from "../../utils/useIsAuth";
import CustomizedTables, { RowType } from "./Table";

const Playground: React.FC = () => {
  const [{ data, fetching }] = useInvitationsQuery();
  const [{ data: me }] = useMeQuery();
  const isAuth = useIsAuth();
  let body = null;
  let rows: Array<RowType> = [];

  const [rows2] = useNewInvitationSubscription({
    variables: {
      id: me?.me?._id || "",
    },
  });
  if (!fetching && data?.invitationsOfUser) {
    rows = data?.invitationsOfUser?.map((obj) => ({
      name: `${obj.host.username} (${obj.host.email})`,
      HostID: `${obj.host._id}`,
    }));
  }
  if (rows2.data?.newInvitation) {
    rows.push({
      name: `${rows2.data?.newInvitation.host.username} (${rows2.data?.newInvitation.host.email})`,
      HostID: `${rows2.data?.newInvitation.host._id}`,
    });
  }
  if (!isAuth) {
    body = (
      <Typography align="center">
        Please Login to see your Invitations
      </Typography>
    );
  } else {
    body = <CustomizedTables rows={rows} />;
  }
  return <React.Fragment>{body}</React.Fragment>;
};

export default Playground;

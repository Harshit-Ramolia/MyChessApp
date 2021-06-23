import React from "react";
import { Button } from "@material-ui/core";
import { useLogoutMutation } from "../generated/graphql";

const LogoutComponent = () => {
  const [, logout] = useLogoutMutation();
  return (
    <Button onClick={async () => {
      let logoutResponse = await logout();
      if (!logoutResponse.data?.logout) {
        console.log("Error")
      }
    }} color="secondary">
      Logout
    </Button>
  );
};

export default LogoutComponent;

import { Button } from "@material-ui/core";
import React from "react";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { useLoginMutation } from "../generated/graphql";

const GoogleLoginComponent = () => {
  const [, login] = useLoginMutation();

  function isGoogleLoginResponse(object: any): object is GoogleLoginResponse {
    return "profileObj" in object;
  }

  const responseGoogle = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if (isGoogleLoginResponse(response)) {
      let graphqlResponse = await login({ token: response.tokenId });
      if (graphqlResponse.data?.login.errors) {
        //   Error
        console.log(graphqlResponse.data?.login.errors)
      } else {
        //   Login successful
      }
    }
  };

  return (
    <GoogleLogin
      clientId="343751366568-6gqpsmkdmb2d8oh0ghkkohhirgmrjge6.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogle}
      cookiePolicy={"single_host_origin"}
      render={(renderProps) => (
        <Button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          variant="outlined"
          color="secondary"
          startIcon={
            <img src="icons/Google_'G'.png" style={{ width: "18px" }} alt="" />
          }
        >
          Login
        </Button>
      )}
    />
  );
};

export default GoogleLoginComponent;

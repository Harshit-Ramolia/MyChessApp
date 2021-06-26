import {
  Button,
  CircularProgress,
  FormControl,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import React from "react";
import { useInviteMutation } from "../../generated/graphql";

const useStyles = makeStyles((theme:Theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    margin: "20px",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    color: theme.palette.secondary.main,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const InvitationForm = () => {
  const classes = useStyles();
  const [, Invite] = useInviteMutation();
  return (
    <Formik
      initialValues={{ friend: "" }}
      onSubmit={async (values, actions) => {
        let response = await Invite({ email: values.friend });
        if (response.data?.invite.errors) {
          actions.setErrors({
            friend: response.data.invite.errors[0].message,
          });
        } else {
          actions.setValues({ friend: "" });
        }
        actions.setSubmitting(false);
      }}
    >
      {({ values, errors, handleChange, isSubmitting }) => (
        <Form>
          <FormControl>
            <div className={classes.root}>
              <TextField
                error={!!errors["friend"]}
                id="friend"
                name="friend"
                label="Friend's Email"
                helperText={errors["friend"]}
                variant="outlined"
                onChange={handleChange}
                value={values.friend}
              />
              <div className={classes.wrapper}>
                <Button
                  variant="contained"
                  color="secondary"
                  disabled={isSubmitting}
                  type="submit"
                >
                  Invite
                </Button>
                {isSubmitting && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            </div>
          </FormControl>
        </Form>
      )}
    </Formik>
  );
};

export default InvitationForm;

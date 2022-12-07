import {
  Grid,
  Modal,
  Paper,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Box, useTheme } from "@mui/system";

import { Formik } from "formik";
import useScriptRef from "hooks/useScriptRef";
import { useState } from "react";
import AnimateButton from "ui-component/extended/AnimateButton";
import * as Yup from "yup";
import React from "react";
import { checkout } from "api/api";
import Team from "./team";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  maxHeight: "60vh",
  overflow: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const Contact = () => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [price, setPrice] = useState(1);
  const handleChange = (event, newValue) => {
    setPrice(newValue);
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={style}>
          <Typography id="modal-modal-title" variant="h2" component="h2">
            Contact Us
          </Typography>
          <Box>
            <Formik
              initialValues={{
                name: "",
                email: "",
                message: "",
              }}
              enableReinitialize
              validationSchema={Yup.object().shape({
                name: Yup.string().min(3).max(255).required("Name is required"),
                email: Yup.string().email().required("Email is required"),
              })}
              onSubmit={async (
                values,
                { setErrors, setStatus, setSubmitting }
              ) => {
                try {
                  if (scriptedRef.current) {
                    setStatus({ success: true });
                    setSubmitting(false);
                    console.log(values);
                    handleClose();
                  }
                } catch (err) {
                  console.error(err);
                  if (scriptedRef.current) {
                    setStatus({ success: false });
                    setErrors({ submit: err.message });
                    setSubmitting(false);
                  }
                }
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values,
              }) => (
                <form noValidate onSubmit={handleSubmit}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.name && errors.name)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-adornment-email-register">
                      Name
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email-register"
                      type="text"
                      defaultValue={values.name}
                      name="name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.name && errors.name && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text--register"
                      >
                        {errors.name}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-adornment-email-register">
                      Email
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email-register"
                      type="email"
                      defaultValue={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.email && errors.email && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text--register"
                      >
                        {errors.email}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <br />
                  <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    label="Message"
                    multiline
                    rows={4}
                    type="text"
                    defaultValue={values.message}
                    name="message"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />

                  {errors.submit && (
                    <Box sx={{ mt: 3 }}>
                      <FormHelperText error>{errors.submit}</FormHelperText>
                    </Box>
                  )}

                  <Box sx={{ mt: 2 }}>
                    <AnimateButton>
                      <Button
                        disableElevation
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="secondary"
                      >
                        Send
                      </Button>
                    </AnimateButton>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </Paper>
      </Modal>
      <Box className="contact">
        <Typography
          variant="h1"
          sx={{
            color: "#fff",
            fontSize: "4rem",
          }}
        >
          Welcome To Travel Diaries
        </Typography>
      </Box>
      <Box
        sx={{
          textAlign: "center",
          margin: "auto",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            my: 2,
          }}
          color="primary"
          gutterBottom
        >
          About Us!
        </Typography>
        <Typography
          sx={{
            fontSize: "1rem",
            textAlign: "justify",
          }}
        >
          Travel Diaries is a Professional travel, blog, trip, Platform. Here we
          will provide you only interesting content, which you will like very
          much. We're dedicated to providing you the best of travel, blog, trip,
          , with a focus on dependability and Travel Diaries brings people,
          passions and places together. We aim to help make you a better
          traveller, from travel planning. We're working to turn our passion for
          travel, blog, trip, into a booming online website. We hope you enjoy
          our travel, blog, trip, as much as we enjoy offering them to you
        </Typography>
        <Team />
        <Box className="donate">
          <Typography
            variant="h2"
            color="white"
            sx={{
              my: 1,
            }}
          >
            Buy us a coffee
          </Typography>
          <Slider
            getAriaLabel={() => "Price range"}
            value={price}
            onChange={handleChange}
            valueLabelDisplay="off"
            min={1}
            max={5}
          />
          <Button
            sx={{
              my: 1,
              color: "white",
              fontWeight: "bold",
              borderRadius: "100px",
            }}
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {
              checkout(price);
            }}
          >
            Support ${price * 5}
          </Button>
        </Box>
      </Box>
      <Typography variant="h1" gutterBottom>
        Contact Us
      </Typography>
      <Typography
        sx={{
          fontSize: "1rem",
        }}
        component={"p"}
        gutterBottom
      >
        We love to hear from our users! If you have suggestions, comments or
        ideas, please let us know. There are several ways to communicate with
        us, and you should feel free to use whichever method you are most
        comfortable with.
      </Typography>
      <Typography variant="h3" gutterBottom>
        General Contact Information
      </Typography>{" "}
      <Typography gutterBottom>
        Mailing address: Information about your mailing list 02494
      </Typography>{" "}
      <Typography gutterBottom>
        General company phone number: Information about your company
      </Typography>
      <br />
      <Box className="contact-box" sx={{ pt: 2 }}>
        <Typography variant="h3" color="white" gutterBottom>
          Message Us
        </Typography>
        <Typography
          sx={{
            fontSize: "1rem",
            my: 2,
          }}
          component={"p"}
        >
          Perhaps the easiest way to contact Us is by clicking on the button
          below. If you would like a reply, please remember to include your
          email address. We usually reply within two business days.
        </Typography>
        <p>
          <button
            className="btn btn-large btn-orange text-uppercase scrollto"
            onClick={handleOpen}
          >
            Contact Us
          </button>
        </p>
      </Box>
    </>
  );
};
export default Contact;

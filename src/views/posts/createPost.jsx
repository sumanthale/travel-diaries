// material-ui
import {
  Alert,
  Button,
  Collapse,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  LinearProgress,
  OutlinedInput,
  Paper,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box, useTheme } from "@mui/system";
import { AuthContext } from "context/AuthContext";
import { Formik } from "formik";
import useScriptRef from "hooks/useScriptRef";
import { useState } from "react";
import { useContext } from "react";
import AnimateButton from "ui-component/extended/AnimateButton";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Drop from "./Drop";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import { CloseOutlined } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { PostContext } from "context/PostContext";
import { createPost, removeSpamWords, updatePost } from "api/api";
import { Autocomplete } from "@react-google-maps/api";

// ==============================|| SAMPLE PAGE ||============================== //
const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["link", "video"],
    ["clean"],
  ],
};
const CreatePost = () => {
  const { user } = useContext(AuthContext);
  const [value, setValue] = useState("");
  const [rating, setRating] = useState(3);
  const [location, setLocation] = useState(null);

  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [error, setError] = useState(false);
  const [images, setImages] = useState([]);
  const { postId } = useParams();
  const { posts } = useContext(PostContext);

  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const handelFormSubmit = async (values) => {
    setLoading(true);
    try {
      const content = await removeSpamWords(value);
      console.log(content);
      const postObj = {
        ...values,
        content: content || value,
        rating,
        location,
      };
      delete postObj.submit;
      const uploadingImages = [];
      const pics = [];
      for (let _ = 0; _ < images.length; _++) {
        const element = images[_];
        if (element.file) {
          uploadingImages.push(element);
        } else {
          pics.push(element.src);
        }
      }
      for await (const key of uploadingImages) {
        try {
          const url = await onSubmitFile(key);
          pics.push(url);
        } catch (error) {
          console.log(error);
        }
      }
      postObj.images = pics;
      postObj.uid = user.uid;
      console.log(postObj, uploadingImages);
      if (postId) {
        postObj._id = post._id;
        await updatePost(postObj);
      } else {
        await createPost(postObj);
      }
      setUpdated(true);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
    setUpdated(true);
  };
  const onSubmitFile = async ({ file, id }) => {
    let url = null;
    try {
      if (file) {
        let storageRef = ref(storage, `posts/${id}`);
        await uploadBytes(storageRef, file);

        console.log("Uploaded a blob or file!");
        url = await getDownloadURL(storageRef);
        console.log(url);
      }
    } catch (error) {
      console.log(error);
    }
    return url;
  };
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autoC) => {
    setAutocomplete(autoC);
  };

  const onPlaceChanged = () => {
    setLocation(autocomplete.getPlace().formatted_address);
    // const lat = autocomplete.getPlace().geometry.location.lat();
    // const lng = autocomplete.getPlace().geometry.location.lng();
  };
  useEffect(() => {
    if (postId && posts.length > 0) {
      console.log("Update Post Page");
      const post = posts.find((post) => post._id === postId);
      if (post) {
        if (user?.uid !== post?.user?.uid) {
          navigate("/");
        } else {
          setPost(post);
          setRating(post.rating);
          setValue(post.content);
          setImages(
            post.images.map((image, idx) => ({
              src: image,
              id: idx,
              file: null,
            }))
          );
          setLocation(post.location);
        }
      } else {
        navigate("/");
      }
    } else {
      setPost(null);
      setRating(3);
      setValue("");
      setImages([]);
      setLocation(null);
      console.log("Create Post Page");
    }
  }, [posts, postId]);
  return (
    <Box
      sx={{
        minHeight: "500px",
        p: "20px",
      }}
    >
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography
          sx={{
            textAlign: "center",
          }}
          variant="h1"
          className="test"
          gutterBottom
        >
          {!!postId ? "Update" : "Create"} Post
        </Typography>
        <Formik
          initialValues={{
            title: post?.title || "",
            price: post?.price || "",
            // country: "",
            // city: "",
            submit: null,
          }}
          enableReinitialize
          validationSchema={Yup.object().shape({
            title: Yup.string().min(3).max(50).required("Title is required"),
            // date: Yup.date().required("Date is required"),
            price: Yup.number().required("Price is required"),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              if (scriptedRef.current) {
                setStatus({ success: true });
                setSubmitting(true);
                handelFormSubmit(values);
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
                error={Boolean(touched.title && errors.title)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-email-register">
                  Title
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-email-register"
                  type="text"
                  value={values.title}
                  name="title"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  inputProps={{}}
                />
                {touched.title && errors.title && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text--register"
                  >
                    {errors.title}
                  </FormHelperText>
                )}
              </FormControl>

              <Typography variant="h3" sx={{ my: 1 }} component="legend">
                Content
              </Typography>
              <ReactQuill
                modules={modules}
                theme="snow"
                onChange={setValue}
                placeholder="Content goes here..."
                value={value}
              />
              <Grid
                container
                columnSpacing={4}
                sx={{
                  my: 2,
                  justifyContent: "flex-start",
                }}
              >
                <Grid
                  item
                  xs={12}
                  md={4}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h4" component="legend">
                    Rating
                  </Typography>

                  <Rating
                    sx={{ width: "100%", ml: 2 }}
                    value={rating}
                    size="large"
                    onChange={(event, newValue) => {
                      setRating(newValue);
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                    <FormControl
                      fullWidth
                      sx={{ ...theme.typography.customInput }}
                    >
                      <InputLabel htmlFor="outlined-adornment-email-register">
                        Location
                      </InputLabel>
                      <OutlinedInput
                        value={location}
                        onChange={(e) => {
                          setLocation(e.target.value);
                        }}
                        type="text"
                        name="search"
                      />
                    </FormControl>
                  </Autocomplete>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.price && errors.price)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-adornment-email-register">
                      $ Price
                    </InputLabel>
                    <OutlinedInput
                      type="number"
                      value={values.price}
                      name="price"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.price && errors.price && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text--register"
                      >
                        {errors.price}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
              <br />

              {/* <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <Typography
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    Map Comes Here...
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Stack spacing={2}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      variant="outlined"
                      label="Country"
                      type="text"
                    />
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      variant="outlined"
                      type="text"
                      label="State"
                    />
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      variant="outlined"
                      type="text"
                      label="City"
                    />
                  </Stack>
                </Grid>
              </Grid> */}

              <Drop setImages={setImages} images={images} />
              {errors.submit && (
                <Box sx={{ mt: 3 }}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Box>
              )}
              {!!error && (
                <Box sx={{ mt: 2 }}>
                  <FormHelperText
                    sx={{
                      textAlign: "center",
                    }}
                    error
                  >
                    {error}
                  </FormHelperText>
                </Box>
              )}
              {loading ? (
                <LinearProgress sx={{ my: 2 }} color="secondary" />
              ) : null}
              <Collapse in={updated}>
                <Alert
                  color="info"
                  action={
                    <IconButton
                      aria-label="close"
                      color="info"
                      size="small"
                      onClick={() => {
                        setUpdated(false);
                      }}
                    >
                      <CloseOutlined fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  Post Created Successfully!!
                </Alert>
              </Collapse>
              {!updated ? (
                <Stack
                  sx={{ mt: 2, justifyContent: "center" }}
                  spacing={3}
                  direction="row"
                >
                  <AnimateButton>
                    <Button
                      disableElevation
                      // disabled
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      color="secondary"
                    >
                      {!!postId ? "Update" : "Create"} Post
                    </Button>
                  </AnimateButton>
                  <AnimateButton>
                    <Button
                      disableElevation
                      // disabled
                      fullWidth
                      size="large"
                      type="button"
                      variant="contained"
                      color="warning"
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      Cancel
                    </Button>
                  </AnimateButton>
                </Stack>
              ) : (
                <Stack
                  sx={{ mt: 2, justifyContent: "center" }}
                  spacing={3}
                  direction="row"
                >
                  <AnimateButton>
                    <Button
                      disableElevation
                      // disabled
                      fullWidth
                      size="large"
                      type="button"
                      variant="contained"
                      color="info"
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      Go Back
                    </Button>
                  </AnimateButton>
                </Stack>
              )}
            </form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default CreatePost;

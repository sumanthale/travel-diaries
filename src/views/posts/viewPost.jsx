// material-ui
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Chip,
  Grid,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import { Box, Stack, useTheme } from "@mui/system";
import { AuthContext } from "context/AuthContext";
import { useState } from "react";
import { useContext } from "react";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { PostContext } from "context/PostContext";
import dayjs from "dayjs";
import Images from "ui-component/cards/ImagesCarousel";
import { findColor } from "ui-component/cards/Post";
import { AccessTime, Favorite, Place, Star } from "@mui/icons-material";
var relativeTime = require("dayjs/plugin/relativeTime");

dayjs.extend(relativeTime);

// ==============================|| SAMPLE PAGE ||============================== //
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  maxHeight: "60vh",
  overflow: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const ViewPost = () => {
  const { user } = useContext(AuthContext);

  const { postId } = useParams();
  const { posts } = useContext(PostContext);

  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    if (postId && posts.length > 0) {
      const post = posts.find((post) => post._id === postId);
      if (post) {
        console.log("Post Found");
        setPost(post);
      } else {
        navigate("/");
      }
    } else {
      setPost(null);
      console.log("Searching...");
    }
  }, [posts, postId]);
  return (
    <>
      {!!post ? (
        <Box
          sx={{
            minHeight: "500px",
            p: "20px",
          }}
        >
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Paper sx={style}>
              <Typography id="modal-modal-title" variant="h2" component="h2">
                Content
              </Typography>

              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </Paper>
          </Modal>
          <Card sx={{ maxWidth: "90%", margin: "auto", mb: 2 }}>
            <CardHeader
              sx={{
                px: 2,
                py: 2,
                pb: 1,
              }}
              avatar={
                <Avatar aria-label="recipe" src={post?.user?.photoUrl}>
                  R
                </Avatar>
              }
              title={post?.user?.username}
              subheader={`${dayjs(post.createdAt).fromNow()}`}
            />

            <Grid container>
              {post.images.length > 0 ? (
                <Grid item xs={12} sm={5}>
                  <Images images={post.images} />
                </Grid>
              ) : null}
              <Grid item xs={12} sm={post.images.length > 0 ? 7 : 12}>
                <Box
                  sx={{
                    px: 2,
                    pt: 1,
                  }}
                >
                  <Typography variant="h2" component="div">
                    {post.title}
                  </Typography>
                  <Stack
                    direction={"row"}
                    sx={{
                      alignItems: "center",
                      my: 2,
                    }}
                    spacing={1}
                  >
                    <span
                      className="rating-button"
                      style={{
                        backgroundColor: `${findColor(post.rating)}`,
                      }}
                    >
                      <span>{post.rating}.0</span>
                      <Star
                        sx={{
                          fontSize: "14px",
                        }}
                      />
                    </span>
                    {post.rating >= 4 && (
                      <>
                        <span
                          style={{
                            backgroundColor: "#fcc",
                            padding: "3px",
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Favorite
                            sx={{
                              color: "#ff5d5d",
                              fontSize: "14px",
                            }}
                          />
                        </span>

                        <Typography>
                          Recommended by 100% of travellers
                        </Typography>
                      </>
                    )}
                  </Stack>
                  <Stack
                    direction={"row"}
                    sx={{ my: 2, flexWrap: "wrap" }}
                    spacing={1}
                  >
                    <Chip
                      icon={<Place />}
                      label={post?.location}
                      variant="outlined"
                      color="secondary"
                    />
                    <Chip
                      icon={<AccessTime />}
                      label="1 hour 30 min"
                      variant="outlined"
                      color="primary"
                    />
                  </Stack>
                  <div
                    className="truncate"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                  {post.content.length > 500 ? (
                    <Typography
                      component={"span"}
                      onClick={handleOpen}
                      sx={{
                        fontWeight: "bold",
                        display: "flex",
                        marginLeft: "auto",
                        textDecoration: "underline",
                        cursor: "pointer",
                        width: "fit-content",
                      }}
                    >
                      ...Read More
                    </Typography>
                  ) : null}{" "}
                  <Box
                    sx={{
                      mt: 3,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "35px",
                        fontWeight: "bold",
                        color: "#000",
                      }}
                    >
                      ${Number(post.price)}.00
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Box>
      ) : null}
    </>
  );
};

export default ViewPost;

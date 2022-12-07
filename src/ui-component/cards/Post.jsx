import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Images from "./ImagesCarousel";
import { Box, Button, Chip, Grid, Menu, MenuItem } from "@mui/material";
import { Stack } from "@mui/system";
import PlaceIcon from "@mui/icons-material/Place";
import dayjs from "dayjs";
import { AccessTime, Favorite, Star } from "@mui/icons-material";
import { useNavigate } from "react-router";
var relativeTime = require("dayjs/plugin/relativeTime");

dayjs.extend(relativeTime);
export default function Post({ post, uid, deltePostByID }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card sx={{ maxWidth: 960, margin: "auto", mb: 2 }}>
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
        action={
          uid === post?.user?.uid ? (
            <div>
              <IconButton aria-label="settings" onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={() => {
                    navigate(`/edit/${post?._id}`);
                    handleClose();
                  }}
                >
                  Edit Post
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    deltePostByID({ _id: post?._id });
                    handleClose();
                  }}
                >
                  Delete
                </MenuItem>
              </Menu>
            </div>
          ) : null
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

                  <Typography>Recommended by 100% of travellers</Typography>
                </>
              )}
            </Stack>
            <Stack
              direction={"row"}
              sx={{ my: 2, flexWrap: "wrap" }}
              spacing={1}
            >
              <Chip
                icon={<PlaceIcon />}
                label={post?.location}
                variant="outlined"
                color="secondary"
              />
            </Stack>
            <div
              className="truncate"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

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
              <Button
                onClick={() => {
                  navigate(`/view/${post?._id}`);
                }}
                variant="outlined"
              >
                View Details
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

export const findColor = (color) => {
  switch (color) {
    case 1:
      return "#ff4545";
    case 2:
      return "#ffa534";
    case 3:
      return "#ffe234";
    case 4:
      return "#b7dd29";
    case 5:
      return "#57e32c";
    default:
      break;
  }
};

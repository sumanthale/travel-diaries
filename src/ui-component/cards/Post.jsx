import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Images from "./ImagesCarousel";
import { Button, Chip, Rating } from "@mui/material";
import { Stack } from "@mui/system";
import PlaceIcon from "@mui/icons-material/Place";
export default function Post() {
  return (
    <Card sx={{ maxWidth: 860, margin: "auto" }}>
      <CardHeader
        avatar={
          <Avatar sx={{}} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="John Doe"
        subheader="September 14, 2022"
      />
      <Images />
      <CardContent>
        <Stack direction={"row"}>
          <Typography gutterBottom variant="h2" component="div">
            Title Goes Here...
          </Typography>
          <Rating
            sx={{
              marginLeft: "auto",
            }}
            name="size-medium"
            defaultValue={2}
          />
        </Stack>
        <Stack direction={"row"}>
          <PlaceIcon />
          <Typography variant="body2" color="text.secondary">
            Location1, Location2, Location3
          </Typography>
        </Stack>
        <Stack direction={"row"} sx={{ my: 2 }} spacing={1}>
          <Chip label="Chip 1" />
          <Chip label="Chip 2" />
          <Chip label="Chip 3" />
        </Stack>

        <Typography variant="body1">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad
          architecto dicta earum inventore dolorem reprehenderit odio officia,
          consequatur totam. Dolorum, aliquam omnis.amet consectetur adipisicing
          elit. Ad architecto dicta earum inventore dolorem reprehenderit odio
          officia, consequatur totam. Dolorum, aliquam omnis.
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          pt: 0,
        }}
      >
        <Button size="small" color="error">
          View More
        </Button>
      </CardActions>
    </Card>
  );
}

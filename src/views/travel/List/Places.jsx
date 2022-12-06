import {
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState, useEffect, createRef } from "react";
import PlaceDetails from "./PlaceDetails";

const Places = ({
  places,
  type,
  setType,
  rating,
  setRating,
  childClicked,
  isLoading,
  toggleFilter,
}) => {
  const [elRefs, setElRefs] = useState([]);
  useEffect(() => {
    setElRefs((refs) =>
      Array(places.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [places]);

  return (
    <>
      {isLoading ? (
        <Stack
          spacing={1}
          sx={{
            mt: 3,
            p: 1,
          }}
        >
          {/* For variant="text", adjust the height via font-size */}
          {/* For other variants, adjust the size with `width` and `height` */}
          <Skeleton variant="rounded" width={"100%"} height={"25vh"} />
          <Skeleton variant="rectangle" width={"100%"} height={"3vh"} />
          <Skeleton />
          <br />
          <Skeleton variant="rounded" width={"100%"} height={"25vh"} />
          <Skeleton variant="rectangle" width={"100%"} height={"3vh"} />
          <Skeleton />
        </Stack>
      ) : (
        <>
          {!!places.length && toggleFilter && (
            <Stack
              direction={"row"}
              spacing={2}
              sx={{ mt: 2, justifyContent: "center", alignItems: "center" }}
            >
              <FormControl
                fullWidth
                sx={{
                  margin: 1,
                  minWidth: 120,
                }}
              >
                <InputLabel id="type">Type</InputLabel>
                <Select
                  id="type"
                  value={type}
                  label="Type"
                  onChange={(e) => setType(e.target.value)}
                >
                  <MenuItem value="restaurants">Restaurants</MenuItem>
                  <MenuItem value="hotels">Hotels</MenuItem>
                  <MenuItem value="attractions">Attractions</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                fullWidth
                sx={{
                  margin: 1,
                  minWidth: 120,
                }}
              >
                <InputLabel id="rating">Rating</InputLabel>
                <Select
                  id="rating"
                  label="Rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="3">Above 3.0</MenuItem>
                  <MenuItem value="4">Above 4.0</MenuItem>
                  <MenuItem value="4.5">Above 4.5</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          )}

          <Grid
            container
            sx={{
              minHeight: {
                xs: `${toggleFilter ? "38vh" : "48vh"}`,
                md: `${toggleFilter ? "68vh" : "78vh"}`,
              },
              maxHeight: {
                xs: `${toggleFilter ? "38vh" : "48vh"}`,
                md: `${toggleFilter ? "68vh" : "78vh"}`,
              },
              overflow: "auto",
              mt: 2,
            }}
          >
            {places?.map((place, i) => (
              <Grid ref={elRefs[i]} key={i} item xs={12}>
                <PlaceDetails
                  selected={Number(childClicked) === i}
                  refProp={elRefs[i]}
                  place={place}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default Places;

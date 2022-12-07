import React from "react";
import GoogleMapReact from "google-map-react";

import {
  Box,
  Chip,
  Paper,
  Rating,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { LocationOnOutlined } from "@mui/icons-material";
import mapStyles from "../mapStyles";
import { useState } from "react";
import { Stack } from "@mui/system";
// import Search from "@mui/icons-material/Search";

const Map = ({
  coords,
  places,
  setCoords,
  setBounds,
  setChildClicked,
  drag,
  setDrag,
  weatherData,
}) => {
  const matches = useMediaQuery("(min-width:600px)");

  // const [move, setMove] = useState(false);
  // const handelChange = (e) => {
  //   if (drag) {
  //     setMove({
  //       cords: { lat: e.center.lat, lng: e.center.lng },
  //       bounds: { ne: e.marginBounds.ne, sw: e.marginBounds.sw },
  //     });
  //   } else {
  //     setCoords({ lat: e.center.lat, lng: e.center.lng });
  //     setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
  //     setDrag(true);
  //   }
  // };
  const handelChange = (e) => {
    //  if (drag) {
    //    setMove({
    //      cords: { lat: e.center.lat, lng: e.center.lng },
    //      bounds: { ne: e.marginBounds.ne, sw: e.marginBounds.sw },
    //    });
    //  } else {
    setCoords({ lat: e.center.lat, lng: e.center.lng });
    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
    //    setDrag(true);
    //  }
  };
  // const handelClick = () => {
  //   setCoords(move.cords);
  //   setBounds(move.bounds);
  //   console.log(move);
  //   setMove(false);
  // };

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      {/* {move && (
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            top: "8%",
            zIndex: 2,
          }}
        >
          <Chip
            className="search-area"
            sx={{
              backgroundColor: "#fff",
              "&:hover": {
                backgroundColor: "#fff",
              },
            }}
            icon={<Search />}
            label="Search this area"
            onClick={handelClick}
          />
        </Box>
      )} */}
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBalXCTucOUllRZc6zSbc2I_PM1dZ-Tjss" }}
        defaultCenter={{
          lat: 17.4227456,
          lng: 78.4990208,
        }}
        center={coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
        }}
        onChange={handelChange}
        onChildClick={(child) => setChildClicked(child)}
      >
        {!!places.length &&
          places.map((place, i) => (
            <Box
              sx={{
                position: "absolute",
                transform: "translate(-50%, -50%)",
                zIndex: 1,
                "&:hover": { zIndex: 2 },
              }}
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
              key={i}
            >
              {!matches ? (
                <LocationOnOutlined color="primary" fontSize="large" />
              ) : (
                <Paper
                  elevation={3}
                  sx={{
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: "100px",
                  }}
                >
                  <Typography
                    className="truncate-map"
                    variant="subtitle2"
                    gutterBottom
                  >
                    {place.name}
                  </Typography>
                  <img
                    style={{
                      cursor: "pointer",
                      width: "100%",
                    }}
                    src={
                      place.photo
                        ? place.photo.images.large.url
                        : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                    }
                    alt="img"
                  />
                  <Rating
                    name="read-only"
                    size="small"
                    value={Number(place.rating)}
                    readOnly
                  />
                </Paper>
              )}
            </Box>
          ))}

        {!!weatherData && (
          <div lat={weatherData?.coord.lat} lng={weatherData?.coord.lon}>
            <img
              src={`http://openweathermap.org/img/w/${weatherData?.weather[0].icon}.png`}
              height="70px"
              alt="weather"
            />
          </div>
        )}

        {!!weatherData && (
          <Box
            sx={{
              position: "absolute",
              transform: "translate(-50%, -50%)",
              zIndex: 1,
              "&:hover": { zIndex: 2 },
            }}
            lat={weatherData?.coord.lat}
            lng={weatherData?.coord.lon}
          >
            <Paper
              elevation={3}
              sx={{
                padding: "3px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "100px",
                textAlign: "center",
              }}
            >
              <Typography className="truncate-map" variant="h5" gutterBottom>
                {weatherData?.name}
              </Typography>
              <Stack
                direction={"row"}
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">
                  {weatherData?.main?.temp} °C{" "}
                </Typography>
                <img
                  src={`http://openweathermap.org/img/w/${weatherData?.weather[0].icon}.png`}
                  alt="weather"
                />
              </Stack>

              <Typography variant="subtitle2">
                {weatherData?.weather[0].description}
              </Typography>
            </Paper>
          </Box>
        )}
      </GoogleMapReact>
    </div>
  );
};

export default Map;

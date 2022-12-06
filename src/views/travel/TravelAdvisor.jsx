import { Grid } from "@mui/material";

import { Autocomplete } from "@react-google-maps/api";

import { Box } from "@mui/system";
import { getPlacesData, getWeatherData } from "api/api";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Places from "./List/Places";
import Map from "./Map/Map";
import AutoSearch from "./AutoSearch";

const TravelAdvisor = () => {
  const [type, setType] = useState("attractions");
  const [rating, setRating] = useState("");
  const [drag, setDrag] = useState(false);

  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [places, setPlaces] = useState([]);

  const [autocomplete, setAutocomplete] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toggleFilter, setToggleFilter] = useState(false);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    const filtered = places.filter((place) => Number(place.rating) > rating);

    setFilteredPlaces(filtered);
  }, [rating]);

  useEffect(() => {
    if (bounds) {
      setIsLoading(true);

      getWeatherData(coords.lat, coords.lng)
        .then((data) => {
          console.log(data);
          setWeatherData(data);
        })
        .catch((err) => console.log(err));

      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
          if (data) {
            setPlaces(
              data.filter((place) => place.name && place.num_reviews > 0)
            );
            setFilteredPlaces([]);
            setRating("");
          }
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [bounds, type]);

  const onLoad = (autoC) => {
    setAutocomplete(autoC);
  };

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoords({ lat, lng });
    // setDrag(false);
  };

  return (
    <Box>
      <Grid
        container
        sx={{
          flexDirection: "row-reverse",
        }}
      >
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            minHeight: { xs: "30vh", md: "calc(100vh - 88px)" },
            maxHeight: { xs: "30vh", md: "calc(100vh - 88px)" },
          }}
        >
          <Map
            drag={drag}
            setDrag={setDrag}
            setChildClicked={setChildClicked}
            setBounds={setBounds}
            setCoords={setCoords}
            coords={coords}
            places={filteredPlaces.length ? filteredPlaces : places}
            weatherData={weatherData}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            p: 1,
          }}
        >
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <AutoSearch setToggleFilter={setToggleFilter} />
          </Autocomplete>
          <Places
            isLoading={isLoading}
            childClicked={childClicked}
            places={filteredPlaces.length ? filteredPlaces : places}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
            toggleFilter={toggleFilter}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TravelAdvisor;

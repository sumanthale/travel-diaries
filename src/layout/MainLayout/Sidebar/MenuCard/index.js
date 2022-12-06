// material-ui
import { styled } from "@mui/material/styles";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Slider,
  Typography,
} from "@mui/material";

// assets
import { Box, Stack } from "@mui/system";
import { FilterAlt } from "@mui/icons-material";
import { useState } from "react";
import { PostContext } from "context/PostContext";
import { useContext } from "react";

const CardStyle = styled(Card)(({ theme }) => ({
  background: theme.palette.primary.light,
  marginBottom: "22px",
  overflow: "hidden",
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    width: "157px",
    height: "157px",
    background: theme.palette.primary[200],
    borderRadius: "50%",
    top: "-105px",
    right: "-96px",
  },
}));

const MenuCard = () => {
  const { filterPosts, reset } = useContext(PostContext);
  const [price, setPrice] = useState([1, 9999]);
  const [checked, setChecked] = useState(1);

  const handelReset = () => {
    reset();
    setPrice([1, 9999]);
    setChecked(1);
  };

  const handleChange = (event, newValue) => {
    setPrice(newValue);
  };

  const handelSubmit = () => {
    filterPosts(price, checked);
  };

  return (
    <CardStyle>
      <CardContent sx={{ p: 2 }}>
        <Stack
          direction="row"
          sx={{
            mt: 1,
            alignItems: "center",
          }}
          className="filter-posts"
        >
          <FilterAlt />
          <Typography
            sx={{
              mx: "auto",
            }}
            variant="h4"
          >
            Filter
          </Typography>
          <Button onClick={handelReset} color="error">
            Reset
          </Button>
        </Stack>
        <Box
          sx={{
            p: 1,
          }}
        >
          <Typography variant="h5" gutterBottom>
            By Price
          </Typography>
          <Slider
            sx={{
              my: 1,
            }}
            getAriaLabel={() => "Price range"}
            value={price}
            onChange={handleChange}
            valueLabelDisplay="off"
            getAriaValueText={valuetext}
            min={1}
            max={9999}
            disableSwap
            step={100}
          />
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount">
                min price
              </InputLabel>
              <OutlinedInput
                size="small"
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                onChange={(e) => {
                  setPrice([+e.target.value, price[1]]);
                }}
                type="number"
                label="min price"
                value={price[0]}
              />
            </FormControl>
            -
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount">
                min price
              </InputLabel>
              <OutlinedInput
                size="small"
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                onChange={(e) => {
                  setPrice([price[0], +e.target.value]);
                }}
                type="number"
                label="min price"
                value={price[1]}
              />
            </FormControl>
          </Stack>

          <Stack
            sx={{
              justifyContent: "space-between",
              mt: 1,
            }}
          >
            <Typography variant="h5" gutterBottom>
              By Rating
            </Typography>

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked === 4}
                    onChange={() => setChecked(4)}
                  />
                }
                label="4★ &amp; above"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked === 3}
                    onChange={() => setChecked(3)}
                  />
                }
                label="3★ &amp; above"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked === 2}
                    onChange={() => setChecked(2)}
                  />
                }
                label="2★ &amp; above"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked === 1}
                    onChange={() => setChecked(1)}
                  />
                }
                label="1★ &amp; above"
              />
            </FormGroup>
          </Stack>

          <Stack
            sx={{
              justifyContent: "space-between",
              mt: 2,
            }}
            direction={"row"}
            onClick={handelSubmit}
          >
            <Button fullWidth variant="contained">
              Apply
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </CardStyle>
  );
};

export default MenuCard;
function valuetext(value) {
  return `$${value}`;
}

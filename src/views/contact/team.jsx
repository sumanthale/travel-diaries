import React from "react";
import prashanth from "../../assets/images/prashanth.jpeg";
import likitha from "../../assets/images/likitha.jpg";
import sumanth from "../../assets/images/sumanth.jpeg";
import himani from "../../assets/images/himani.png";
import { Typography } from "@mui/material";
import { Email, GitHub } from "@mui/icons-material";
const Team = () => {
  return (
    <div className="team-container">
      <div className="grid">
        <div className="card">
          <div className="card_img">
            <img src={likitha} alt="dd" />
          </div>
          <div className="card_body">
            <Typography
              variant="h2"
              sx={{
                textAlign: "center",
                my: 2,
              }}
            >
              Likhitha Sreeramula
            </Typography>
            <Typography
              sx={{
                display: "flex",
                // justifyContent: "center",
                alignItems: "center",
              }}
              gutterBottom
              variant="body1"
            >
              likhitha24reddy@gmail.com
            </Typography>
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <GitHub />: &nbsp;
              <a href="https://github.com/likhithareddy24">likhithareddy24</a>
            </Typography>
          </div>
        </div>
        <div className="card">
          <div className="card_img">
            <img src={prashanth} alt="dd" />
          </div>
          <div className="card_body">
            <Typography
              variant="h2"
              sx={{
                textAlign: "center",
                my: 2,
              }}
            >
              Gurijala Prashanth
            </Typography>
            <Typography
              sx={{
                display: "flex",
                // justifyContent: "center",
                alignItems: "center",
              }}
              gutterBottom
              variant="body1"
            >
              gurijalaprashanth4@gmail.com
            </Typography>
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <GitHub />: &nbsp;
              <a href="https://github.com/gurijalaprashanth4">
                gurijalaprashanth4
              </a>
            </Typography>
          </div>
        </div>
        <div className="card">
          <div className="card_img">
            <img src={himani} alt="dd" />
          </div>
          <div className="card_body">
            <Typography
              variant="h2"
              sx={{
                textAlign: "center",
                my: 2,
              }}
            >
              Himani Patel
            </Typography>
            <Typography
              sx={{
                display: "flex",
                // justifyContent: "center",
                alignItems: "center",
              }}
              gutterBottom
              variant="body1"
            >
              himanicapstone@gmail.com
            </Typography>
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <GitHub />: &nbsp;
              <a href="https://github.com/HimaniCapstone">HimaniCapstone</a>
            </Typography>
          </div>
        </div>
        <div className="card">
          <div className="card_img">
            <img src={sumanth} alt="dd" />
          </div>
          <div className="card_body">
            <Typography
              variant="h2"
              sx={{
                textAlign: "center",
                my: 2,
              }}
            >
              Sumanth
            </Typography>
            <Typography
              sx={{
                display: "flex",
                // justifyContent: "center",
                alignItems: "center",
              }}
              gutterBottom
              variant="body1"
            >
              sumanth4023@gmail.com
            </Typography>
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <GitHub />: &nbsp;
              <a href="https://github.com/sumanth4023">sumanth4023</a>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;

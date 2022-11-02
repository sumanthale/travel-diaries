import React, { useState, useEffect } from "react";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "dcd9d99848msh7df1a7380d83f1ap10e381jsne8d7894acd13",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};
function Countrystatecity() {
  const [country, setCountry] = useState([]);
  const [countryid, setCountryid] = useState("");
  const [st, setSt] = useState([]);
  const [stateid, setStateid] = useState("");
  const [city, setCity] = useState([]);

  useEffect(() => {
    const getcountry = async (pre) => {
      const rescountry = await fetch(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/countries?limit=10&namePrefix=${pre}`,
        options
      );
      const { data } = await rescountry.json();
      console.log(data);
      //   setCountry(data);
    };
    setTimeout(() => {
      getcountry("IND");
    }, 1000);
  }, []);

  const handlecountry = (event) => {
    const getcountryid = event.target.value;
    setCountryid(getcountryid);
  };

  useEffect(() => {
    const getstate = async (code, pre) => {
      const resstate = await fetch(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${code}/regions?limit=10&namePrefix=${pre}`,
        options
      );
      const { data } = await resstate.json();
      console.log(data);
      //   setSt(data);
    };
    setTimeout(() => {
      getstate("IN", "Tel");
    }, 2000);
  }, [countryid]);

  const handlestate = (event) => {
    const getstateid = event.target.value;
    setStateid(getstateid);
  };

  useEffect(() => {
    const getcity = async (code, regionCode, pre) => {
      const rescity = await fetch(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${code}/regions/${regionCode}/cities?limit=10&namePrefix=${pre}`,
        options
      );
      const { data } = await rescity.json();
      console.log(data);
      //   setCity(data);
    };
    setTimeout(() => {
      getcity("IN", "AP", "");
    }, 3000);
  }, [stateid]);

  return (
    <React.Fragment>
      <div className="content">
        <div className="row">
          <div className="col-sm-12">
            <h2 className="mt-4 mb-4 fw-bold">
              Select Country, State and City ReactJs{" "}
            </h2>

            <form className="row g-3">
              <div className="col-md-3">
                <label className="form-label">Country </label>
                <select
                  name="country"
                  className="form-control p-2"
                  onChange={(e) => handlecountry(e)}
                >
                  <option value="">--Select Country--</option>
                  {country.map((getcon, index) => (
                    <option key={index} value={getcon.code}>
                      {getcon.name}{" "}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label">State</label>
                <select
                  className="form-select"
                  name="state"
                  onChange={(e) => handlestate(e)}
                >
                  <option value="">--Select State--</option>
                  {st.map((getst, index) => (
                    <option key={index} value={getst.state_id}>
                      {getst.state_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label">City</label>
                <select className="form-select" name="city">
                  <option value="">--Select City--</option>
                  {city.map((gcity, index) => (
                    <option key={index} value={gcity.city_id}>
                      {gcity.city_name}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Countrystatecity;

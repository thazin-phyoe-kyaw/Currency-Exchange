import { Button, Container, Grid, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import axios from "axios";
import { CurrencyRow, InputAmount } from "../components/index.js";
function CurrencyExchange() {
  const boxStyles = {
    background: "#fdfdfd",
    marginTop: "10%",
    textAlign: "center",
    color: "#222",
    minHeight: "20rem",
    borderRadius: 2,
    padding: "4rem 2rem",
    boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
    position: "relative",
  };
  const [countries, setCountries] = useState("");
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [data, setData] = useState("Test");
  useEffect(() => {
    axios
      .get(
        `http://api.currencylayer.com/list?access_key=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        setCountries(Object.keys(response.data.currencies));
      })
      .catch((error) => {
        return "There is an Error";
      });
  }, []);
  return (
    <Container sx={boxStyles} maxWidth="md">
      <Typography variant="h5" sx={{ marginBottom: "2rem" }}>
        Stay Ahead With Accurate Conversion
      </Typography>
      <Grid container spacing={2}>
        <CurrencyRow
          countries={countries}
          label="Currency"
          selectCurrency={fromCurrency}
          onChangeCurrency={(event, newValue) => setFromCurrency(newValue)}
        ></CurrencyRow>
        <InputAmount
          onChageAmount={(e) => setAmount(e.target.value)}
        ></InputAmount>
        <Grid item md={2}>
          <Button variant="contained">Submit</Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CurrencyExchange;

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { CurrencyRow, InputAmount, Loading } from "../components/index.js";

function CurrencyExchange() {
  const [countries, setCountries] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [exchangeRates, setExchangeRates] = useState({});
  const [error, setError] = useState(null);
  console.log(exchangeRates);
  console.log(fromCurrency);
  const fetchData = async () => {
    try {
      const listResponse = await axios.get(
        `http://api.currencylayer.com/list?access_key=${process.env.REACT_APP_API_KEY}`
      );
      const liveResponse = await axios.get(
        `http://api.currencylayer.com/live?access_key=${process.env.REACT_APP_API_KEY}`
      );

      const currencies = listResponse.data.currencies;
      const quotes = liveResponse;
      // const quotes = liveResponse.data.quotes;
      setCountries(Object.keys(currencies));
      setExchangeRates(quotes);
      setError(null);
      setLoading(false);
    } catch (err) {
      setError("Error fetching data. Please check your API key and try again.");
    }
  };
  const convertedAmount = amount * exchangeRates[`USD${fromCurrency}`];
  useEffect(() => {
    fetchData();
  }, []);
  if (loading) return <Loading />;
  return (
    <Container
      sx={{
        background: "#fdfdfd",
        marginTop: "10%",
        textAlign: "center",
        color: "#222",
        minHeight: "20rem",
        borderRadius: 2,
        padding: "4rem 2rem",
        boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
        position: "relative",
      }}
      maxWidth="md"
    >
      <Typography variant="h5" sx={{ marginBottom: "2rem" }}>
        Stay Ahead With Accurate Conversion
      </Typography>
      <Grid container spacing={2}>
        <InputAmount onChageAmount={(e) => setAmount(e.target.value)} />
        <CurrencyRow
          countries={countries}
          label="Currency"
          selectCurrency={fromCurrency}
          onChangeCurrency={(event, newValue) => setFromCurrency(newValue)}
        />

        <Grid item md={2}>
          <Button variant="contained">Submit</Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table aria-label="Exchange Rates">
          <TableBody>
            {Object.entries(exchangeRates).map(([currencyCode, rate]) => (
              <TableRow key={currencyCode}>
                <TableCell>{`1 USD = ${rate} ${currencyCode.substring(
                  3
                )}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {error && <Typography color="error">{error}</Typography>}
      <Typography>
        {`${amount} USD = ${convertedAmount} ${fromCurrency}`}
      </Typography>
    </Container>
  );
}

export default CurrencyExchange;

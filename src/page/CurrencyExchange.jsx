import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import {
  CurrencyRow,
  InputAmount,
  Loading,
  CurrencyVirtualizeTable,
} from "../components/index.js";

import styled from "@emotion/styled";

const columns = [
  {
    label: "No",
    dataKey: "id",
  },
  {
    label: "Country Name",
    dataKey: "country_name",
  },
  {
    label: "Currency Code",
    dataKey: "currency_code",
    numeric: true,
  },
  {
    label: "Rate per 1 USD",
    dataKey: "rate",
    numeric: true,
  },
];
function CurrencyExchange() {
  const [countries, setCountries] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [convertAmount, setConvertAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [exchangeRates, setExchangeRates] = useState({});
  const [error, setError] = useState(null);
  const fetchCountriesHandler = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}list?access_key=${process.env.REACT_APP_API_KEY}`
      );
      const currencies = response.data.currencies;
      if (currencies) {
        setCountries(currencies);
        setError(null);
      }
    } catch (err) {
      console.log(err, "error");
      setError("Error fetching data.reload the page and try again.");
    } finally {
      setLoading(false);
    }
  };
  const fetchExchageRateHandler = async () => {
    try {
      const liveResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}live?access_key=${process.env.REACT_APP_API_KEY}`
      );
      setExchangeRates(liveResponse.data.quotes);
      setError(null);
    } catch (err) {
      setError("Error fetching data.reload the page and try again.");
      setLoading(false);
    } finally {
      // set timeout for rating limiting problem
      setTimeout(() => {
        fetchCountriesHandler();
      }, 1000);
    }
  };
  const handleConvertedAmount = () => {
    if (!amount || !fromCurrency) {
      setConvertAmount(0);
      return;
    }
    setConvertAmount(
      `${amount} USD = ${
        amount * exchangeRates[`USD${fromCurrency}`].toFixed(2)
      } ${fromCurrency}`
    );
  };

  useEffect(() => {
    fetchExchageRateHandler();
    return () => {
      setCountries([]);
      setExchangeRates({});
      setError(null);
      setLoading(true);
    };
  }, []);
  if (loading) return <Loading />;
  return (
    <Box>
      <CalculatorContainer maxWidth="md">
        <Typography variant="h5" sx={{ marginBottom: "2rem" }}>
          Money Exchange Rate Calculator
        </Typography>

        <Grid container spacing={2} alignItems="center">
          <InputAmount
            onChageAmount={(e) => {
              setAmount(e.target.value);
            }}
          />
          <CurrencyRow
            countries={countries}
            label="Currency"
            selectCurrency={fromCurrency}
            onChangeCurrency={(event, newValue) => {
              setFromCurrency(newValue);
            }}
          />

          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              sx={{
                width: "100%",
              }}
              onClick={handleConvertedAmount}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
        {convertAmount ? (
          <Typography
            sx={{
              marginTop: "2rem",
              marginBottom: "2rem",
            }}
          >
            {convertAmount}
          </Typography>
        ) : null}
      </CalculatorContainer>
      {error && <Typography color="error">{error}</Typography>}
      <ExchangeRateContainer>
        <Typography
          variant="h5"
          sx={{ marginBottom: "2rem", marginTop: "2rem" }}
        >
          Exchange Rates Table
        </Typography>
        {exchangeRates && Object.keys(exchangeRates).length > 0 ? (
          <CurrencyVirtualizeTable
            exchangeRates={exchangeRates}
            country={countries}
            columns={columns}
          />
        ) : (
          "No data found"
        )}
      </ExchangeRateContainer>
    </Box>
  );
}
const CalculatorContainer = styled(Container)`
  background: #fdfdfd;
  margin-top: 20px;
  text-align: center;
  color: #222;
  min-height: 12rem;
  border-radius: 10px;
  padding: 2rem 2rem;
  overflow: hidden;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
  position: relative;
`;
const ExchangeRateContainer = styled(Container)`
  background: #fdfdfd;
  margin-top: 20px;
  text-align: center;
  color: #222;
  min-height: 12rem;
  border-radius: 10px;
  padding: 2rem 2rem;
  overflow: hidden;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
  position: relative;
  @media (max-width: 768px) {
    padding: 0rem 0rem;
    min-height: 8rem;
  }
`;
export default CurrencyExchange;

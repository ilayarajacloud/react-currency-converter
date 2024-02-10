import React, { useEffect, useState } from 'react'
import './App.css';
import axios from 'axios';

const RATES = {
  "USD": 1,
  "AED": 3.67,
  "AFN": 73.81,
  "ALL": 96.87,
  "AMD": 405.1,
  "ANG": 1.79,
  "AOA": 837.12,
  "ARS": 831.25,
  "AUD": 1.53,
  "AWG": 1.79,
  "AZN": 1.7,
  "BAM": 1.81,
  "BBD": 2,
  "BDT": 109.74,
  "BGN": 1.81,
  "BHD": 0.376,
  "BIF": 2844.1,
  "BMD": 1,
  "BND": 1.35,
  "BOB": 6.94,
  "BRL": 4.97,
  "BSD": 1,
  "BTN": 83.04,
  "BWP": 13.73,
  "BYN": 3.25,
  "BZD": 2,
  "CAD": 1.35,
  "CDF": 2695.96,
  "CHF": 0.875,
  "CLP": 963.96,
  "CNY": 7.21,
  "COP": 3957.58,
  "CRC": 517.78,
  "CUP": 24,
  "CVE": 102.31,
  "CZK": 23.38,
  "DJF": 177.72,
  "DKK": 6.92,
  "DOP": 58.61,
  "DZD": 134.79,
  "EGP": 30.9,
  "ERN": 15,
  "ETB": 56.76,
  "EUR": 0.928,
  "FJD": 2.25,
  "FKP": 0.792,
  "FOK": 6.92,
  "GBP": 0.792,
  "GEL": 2.66,
  "GGP": 0.792,
  "GHS": 12.51,
  "GIP": 0.792,
  "GMD": 65.45,
  "GNF": 8595.81,
  "GTQ": 7.82,
  "GYD": 209.54,
  "HKD": 7.82,
  "HNL": 24.7,
  "HRK": 6.99,
  "HTG": 131.99,
  "HUF": 359.71,
  "IDR": 15625.63,
  "ILS": 3.69,
  "IMP": 0.792,
  "INR": 83.04,
  "IQD": 1310.85,
  "IRR": 42074.16,
  "ISK": 137.52,
  "JEP": 0.792,
  "JMD": 156.43,
  "JOD": 0.709,
  "JPY": 149.32,
  "KES": 160.14,
  "KGS": 89.34,
  "KHR": 4091.24,
  "KID": 1.53,
  "KMF": 456.46,
  "KRW": 1331.32,
  "KWD": 0.308,
  "KYD": 0.833,
  "KZT": 451.93,
  "LAK": 20760.43,
  "LBP": 15000,
  "LKR": 312.72,
  "LRD": 192.22,
  "LSL": 19.02,
  "LYD": 4.84,
  "MAD": 10.04,
  "MDL": 17.82,
  "MGA": 4536.69,
  "MKD": 57.32,
  "MMK": 2100.23,
  "MNT": 3418.56,
  "MOP": 8.05,
  "MRU": 39.59,
  "MUR": 45.34,
  "MVR": 15.46,
  "MWK": 1695.76,
  "MXN": 17.09,
  "MYR": 4.77,
  "MZN": 63.91,
  "NAD": 19.02,
  "NGN": 1428.48,
  "NIO": 36.69,
  "NOK": 10.57,
  "NPR": 132.86,
  "NZD": 1.63,
  "OMR": 0.384,
  "PAB": 1,
  "PEN": 3.87,
  "PGK": 3.75,
  "PHP": 55.95,
  "PKR": 279.47,
  "PLN": 4.01,
  "PYG": 7306.65,
  "QAR": 3.64,
  "RON": 4.62,
  "RSD": 108.85,
  "RUB": 91.81,
  "RWF": 1292.69,
  "SAR": 3.75,
  "SBD": 8.49,
  "SCR": 13.22,
  "SDG": 545.49,
  "SEK": 10.46,
  "SGD": 1.35,
  "SHP": 0.792,
  "SLE": 22.59,
  "SLL": 22587.69,
  "SOS": 571.79,
  "SRD": 36.61,
  "SSP": 1111.24,
  "STN": 22.73,
  "SYP": 12961.89,
  "SZL": 19.02,
  "THB": 35.92,
  "TJS": 10.94,
  "TMT": 3.5,
  "TND": 3.13,
  "TOP": 2.35,
  "TRY": 30.68,
  "TTD": 6.75,
  "TVD": 1.53,
  "TWD": 31.35,
  "TZS": 2529.92,
  "UAH": 37.64,
  "UGX": 3842.13,
  "UYU": 39.21,
  "UZS": 12426.7,
  "VES": 36.32,
  "VND": 24386.76,
  "VUV": 120.94,
  "WST": 2.75,
  "XAF": 608.62,
  "XCD": 2.7,
  "XDR": 0.754,
  "XOF": 608.62,
  "XPF": 110.72,
  "YER": 250.52,
  "ZAR": 19.02,
  "ZMW": 26.96,
  "ZWL": 11218.22
}

const App = () => {
  const [loading, setLoading] = useState(false)
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState('INR');
  const [convertedAmount, setConvertedAmount] = useState(null);

  // const [exchangeRate, setExchangeRate] = useState(null)

  useEffect(() => {
    getCurrencyApi();
  }, [amount, fromCurrency, toCurrency]);

  // useEffect(() => {
  //   if (exchangeRate !== null) {
  //     setConvertedAmount((amount * exchangeRate))
  //   }
  // }, [amount, exchangeRate])

  const getCurrencyApi = async () => {
    try {
      setLoading(true)
      let url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
      const response = await axios.get(url)
      const exchangeRate = response.data.rates[toCurrency];
      // 1 USD -> 83 INR
      if (exchangeRate !== null) {
        setConvertedAmount((amount * exchangeRate))
      }
      setLoading(false)
      // setExchangeRate(RATES[toCurrency])
    } catch (error) {
      console.log(error);
    }
  }
  const onHandleAmountChange = (e) => {
    setAmount(parseInt(e.target.value));
  }

  const handleFromAmout = (e) => {
    setFromCurrency(e.target.value)
  }

  const handleToAmount = (e) => {
    setToCurrency(e.target.value)
  }
  return (

    <div className='corency-convertor'>
      <div className='box'></div>
      <div className='data'>
        <h1>Currency Convertor</h1>
        <div className='input-container'>
          <label htmlFor='amt'>Amount:</label>
          <input type='number' id='amt' value={amount} onChange={onHandleAmountChange} />
        </div>
        <div className='input-container'>
          <label htmlFor='fromCurrency'>From Currency</label>
          <select id='fromCurrency' value={fromCurrency} onChange={handleFromAmout}>
            {
              Object.keys(RATES).map((item)=> <option key={item} value={item}>{item}</option>)
            }
          
            {/* <option value="ZAR">ZAR South African Rand</option>  */}
          </select>
        </div>
        <div className='input-container'>
          <label htmlFor="tocurrency">To Currency</label>
          <select id='tocurrency' value={toCurrency} onChange={handleToAmount}>
            {
              Object.keys(RATES).map((currency) => <option key={currency} value={currency}>{currency}</option>)
            }
          
          </select>
        </div>
        <div className='result'>
          {
            loading ? <p>Loading...</p> : (
              <p>{amount} {fromCurrency} is qual to {convertedAmount?.toFixed(2)} {toCurrency}</p>
            )
          }
        </div>
      </div>
    </div>

  )
}

export default App
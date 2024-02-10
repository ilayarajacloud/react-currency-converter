import React, { useEffect, useState } from 'react'
import './App.css';
import axios from 'axios';
const App = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [tocurrency, setToCurrency] = useState("INR");
  const [convertdAmount, setConvertedAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null)

  useEffect(() => {
    getCurrencyApi()
  }, [fromCurrency, tocurrency])

  const getCurrencyApi = async () => {
    try {
      const { data } = await axios.get("https://api.exchangerate-api.com/v4/latest/USD");
      // console.log(data.rates);
      setExchangeRate(data.rates[tocurrency])
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
   if(exchangeRate!==null){
    setConvertedAmount((amount*exchangeRate).toFixed(2))
   }
  },[amount, exchangeRate])

  const onInputChange=(e)=>{
    const value = parseFloat(e.target.value);
    // console.log(typeof(value));
    setAmount(isNaN(value) ? 0 : value)
  }

  const handleFromAmout=(e)=>{
    setFromCurrency(e.target.value)
  }

  const handleToAmount=(e)=>{
    setToCurrency(e.target.value)
  }

  return (
    <>
      <div className='corency-convertor'>
        <div className='box'></div>
        <div className='data'>
          <h1>Currency Convertor</h1>
          <div className='input-container'>
            <label htmlFor='amt'>Amount:</label>
            <input type='number' id='amt' value={amount}  onChange={onInputChange}/>
          </div>
          <div className='input-container'>
            <label htmlFor='fromCurrency'>From Currency</label>
            <select id='fromCurrency' value={fromCurrency} onChange={handleFromAmout}>
              <option value="USD">USD - Doller</option>
              <option value="ERU">ERU</option>
              <option value="GBA">GBA</option>
              <option value="JPY">JPY</option>
              <option value="AUD">AUD</option>
              <option value="CNY">CNY</option>
              <option value="INR">INR</option>
              <option value="BRL">BRL</option>
              <option value="ZAR">ZAR</option>
            </select>
          </div>
          <div className='input-container'>
            <label htmlFor="tocurrency">To Currency</label>
            <select id='tocurrency' value={tocurrency} onChange={handleToAmount}>
              <option value="USD">USD</option>
              <option value="ERU">ERU</option>
              <option value="GBA">GBA</option>
              <option value="JPY">JPY</option>
              <option value="AUD">AUD</option>
              <option value="CNY">CNY</option>
              <option value="INR">INR - Price</option>
              <option value="BRL">BRL</option>
              <option value="ZAR">ZAR</option>
            </select>
          </div>
          <div className='result'>
            <p>{amount} {fromCurrency} equal to {convertdAmount} {tocurrency}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
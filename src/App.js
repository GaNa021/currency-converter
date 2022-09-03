import { useEffect, useState } from "react";

function App() {
  // Supported Currencies
  const [currenciesList, setcurrenciesList] = useState(["USD", "INR"]);

  // States for base and converting currency
  const [baseCurrency, setBaseCurrency] = useState();
  const [convertedCurrency, setConvertedCurrency] = useState();

  // States for selected base and converting currency
  const [selectedbaseCurrency, setSelectedbaseCurrency] = useState("USD");
  const [selectedconvertedCurrency, setSelectedConvertedCurrency] =
    useState("INR");

  useEffect(() => {
    getCurrencysList(setcurrenciesList);
  }, []);

  // Converting base cuurency
  // called when base currency value is changed
  useEffect(() => {
    if (!convertedCurrency && baseCurrency !== "")
      convertCurrency(
        selectedbaseCurrency,
        selectedconvertedCurrency,
        baseCurrency,
        setConvertedCurrency
      );
    return;
  }, [baseCurrency, convertedCurrency]);

  // Converting converting cuurency
  // called when converting currency value is changed
  useEffect(() => {
    if (!baseCurrency && convertedCurrency !== "")
      convertCurrency(
        selectedconvertedCurrency,
        selectedbaseCurrency,
        convertedCurrency,
        setBaseCurrency
      );
    return;
  }, [baseCurrency, convertedCurrency]);

  // Converting when base currency is changed
  useEffect(() => {
    convertCurrency(
      selectedconvertedCurrency,
      selectedbaseCurrency,
      convertedCurrency,
      setBaseCurrency
    );
    return;
  }, [selectedbaseCurrency]);

  // Converting when converting currency is changed
  useEffect(() => {
    convertCurrency(
      selectedbaseCurrency,
      selectedconvertedCurrency,
      baseCurrency,
      setConvertedCurrency
    );
    return;
  }, [selectedconvertedCurrency]);

  //Main container
  return (
    <div className="bg-slate-600 flex min-h-screen justify-center items-center">
      <div className="grid gap-y-4">
        <div className="">
          <input
            className="text-white border-b-2 border-slate-500 outline-none bg-transparent"
            id="baseCurrency"
            value={baseCurrency}
            onChange={(e) => {
              setBaseCurrency(e.target.value);
              setConvertedCurrency("");
            }}
          ></input>
          <select
            className="p-3 text-m text-slate-400 bg-slate-600 outline-none"
            value={selectedbaseCurrency}
            onChange={(e) => {
              setSelectedbaseCurrency(e.target.value);
            }}
          >
            {currenciesList != null
              ? currenciesList.map((currency, index) => (
                  <option key={index} value={currency}>
                    {currency}
                  </option>
                ))
              : null}
          </select>
        </div>
        <div>
          <input
            className="text-white border-b-2 border-slate-500 outline-none bg-transparent"
            id="convertedCurrency"
            value={convertedCurrency}
            onChange={(e) => {
              setConvertedCurrency(e.target.value);
              setBaseCurrency("");
            }}
          ></input>

          <select
            className="p-3 text-m text-slate-400 bg-slate-600 border-0 outline-none"
            value={selectedconvertedCurrency}
            onChange={(e) => {
              setSelectedConvertedCurrency(e.target.value);
            }}
          >
            {currenciesList != null
              ? currenciesList.map((currency, index) => (
                  <option key={index} value={currency}>
                    {currency}
                  </option>
                ))
              : null}
          </select>
        </div>
      </div>
    </div>
  );
}

// Function calls api and sets converted currency value to respective state provied
function convertCurrency(_fromCurrency, _toCurrency, _amount, setResultField) {
  fetch(
    `https://api.exchangerate.host/convert?from=${_fromCurrency}&to=${_toCurrency}&amount=` +
      _amount
  )
    .then((response) => response.json())
    .then((data) => {
      setResultField(data.result);
    });
}

// Function calls api, gets all currency symbols and sets to respective state provied
function getCurrencysList(setcurrenciesList) {
  fetch(`https://api.exchangerate.host/symbols`)
    .then((response) => response.json())
    .then((data) => {
      setcurrenciesList(Object.keys(data.symbols));
    });
}
export default App;

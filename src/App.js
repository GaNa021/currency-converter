import { useEffect, useState } from "react";

function App() {
  const options = ["USD", "INR", "EUR"];

  const [baseCurrency, setBaseCurrency] = useState();
  const [convertedCurrency, setConvertedCurrency] = useState();

  const [selectedbaseCurrency, setSelectedbaseCurrency] = useState(options[0]);
  const [selectedconvertedCurrency, setSelectedConvertedCurrency] = useState(
    options[0]
  );

  const [valueORCurrenyChanged, setValueORCurrenyChanged] = useState(false);
  const [amount, setAmount] = useState();
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [resultField, setResultField] = useState();

  useEffect(() => {
    if (baseCurrency) {
      setAmount(baseCurrency);
      setFromCurrency(selectedbaseCurrency);
      setToCurrency(selectedconvertedCurrency);
      setResultField("base");
      return;
    }

    setAmount(convertedCurrency);
    setFromCurrency(selectedconvertedCurrency);
    setToCurrency(selectedbaseCurrency);
    setResultField("converted");

    console.log(resultField);
  }, [baseCurrency, convertedCurrency]);

  useEffect(() => {
    let _amount = baseCurrency ? baseCurrency : convertedCurrency;
    let _fromCurrency = baseCurrency
      ? selectedbaseCurrency
      : selectedconvertedCurrency;
    let _toCurrency = baseCurrency
      ? selectedconvertedCurrency
      : selectedbaseCurrency;
    if (amount === 0) return;
    fetch(
      `https://api.exchangerate.host/convert?from=${_fromCurrency}&to=${_toCurrency}&amount=` +
        _amount
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.result);
        baseCurrency
          ? setConvertedCurrency(data.result)
          : setBaseCurrency(data.result);
      });

    setValueORCurrenyChanged(false);
  }, [baseCurrency, valueORCurrenyChanged]);
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
              setValueORCurrenyChanged(true);
            }}
          ></input>
          <select
            className="p-3 text-m text-black bg-transparent border-0 dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200"
            value={selectedbaseCurrency}
            onChange={(e) => {
              setSelectedbaseCurrency(e.target.value);
              setValueORCurrenyChanged(true);
            }}
          >
            {options != null
              ? options.map((currency, index) => (
                  <option className="" key={index} value={currency}>
                    {currency}
                  </option>
                ))
              : null}
          </select>
        </div>
        <div className="">
          <input
            className="text-white border-b-2 border-slate-500 outline-none bg-transparent"
            id="convertedCurrency"
            value={convertedCurrency}
            onChange={(e) => {
              setConvertedCurrency(e.target.value);
              setValueORCurrenyChanged(true);
            }}
          ></input>

          <select
            className="p-3 text-m text-black bg-transparent border-0 dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200"
            value={selectedconvertedCurrency}
            onChange={(e) => {
              setSelectedConvertedCurrency(e.target.value);
              setValueORCurrenyChanged(true);
            }}
          >
            {options != null
              ? options.map((currency, index) => (
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

export default App;

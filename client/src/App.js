import React, { useState, useEffect } from "react";
import "font-awesome/css/font-awesome.min.css";
import "./App.css";

import openSocket from "socket.io-client";

const ErrorMonkey = "/assets/errormonkey.svg";
const LoadingMonkey = "/assets/loadingmonkey.svg";
const HappyMonkey = "/assets/happymonkey.svg";

const configPort = 8080;

function App() {
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  const [err, setError] = useState("");

  const [logo, setLogo] = useState(LoadingMonkey);

  const socket = openSocket(`http://localhost:${configPort}`);

  socket.on("new keyvalue result", data => {
    if (data.status > 201) {
      setLogo(ErrorMonkey);
      setError(data.details);
    } else {
      setLogo(HappyMonkey);
    }
  });

  socket.on("get keyvalue result", data => {
    if (data.status > 200) {
      setLogo(ErrorMonkey);
      setError(data.details);
    } else {
      setLogo(HappyMonkey);
      setValue(data.value);
    }
  });

  const handleSubmitNewPair = event => {
    socket.emit("new keyvalue", { key: newKey, value: newValue });

    setNewKey("");
    setNewValue("");
    setError("");
    setKey("");
    setValue("");
    setLogo(LoadingMonkey);
    event.preventDefault();
  };

  const handleSubmitGetKeyValue = event => {
    socket.emit("get keyvalue", { key });

    setError("");
    setNewKey("");
    setNewValue("");
    setLogo(LoadingMonkey);
    event.preventDefault();
  };

  useEffect(() => {
    if (key === "") {
      setLogo(LoadingMonkey);
      setValue("");
    }
  }, [key]);

  return (
    <div className="App">
      <header className="App-header">
        <img
          src={process.env.PUBLIC_URL + logo}
          className="App-logo"
          alt="logo"
        />
        <div>
          {err ? <p>{err}</p> : null}
          <h4>New Key-Value Pair</h4>
          <form onSubmit={handleSubmitNewPair}>
            <label>
              Key:
              <input
                type="text"
                name="key"
                onChange={e => setNewKey(e.target.value)}
                value={newKey}
              />
            </label>
            <label>
              Value:
              <input
                type="text"
                name="value"
                onChange={e => setNewValue(e.target.value)}
                value={newValue}
              />
            </label>
            <button type="submit" className="submitBtn">
              Submit
            </button>
          </form>
        </div>
        <div>
          <h4>Get Key-Value Pair</h4>
          <form onSubmit={handleSubmitGetKeyValue}>
            <label>
              Key:
              <input
                type="text"
                name="key"
                onChange={e => setKey(e.target.value)}
                value={key}
              />
            </label>
            <button type="submit" className="submitBtn">
              Submit
            </button>
          </form>
          {value && key ? (
            <div>
              <p>
                key: {key} | value: {value}
              </p>
            </div>
          ) : null}
        </div>
      </header>
    </div>
  );
}

export default App;

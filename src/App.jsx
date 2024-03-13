import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [lenght, setLenght] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "01123456789";
    if (charAllowed) str += "!@#$%^&*?";

    for (let i = 1; i <= lenght; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [lenght, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 12);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [lenght, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full shadow-md rounded-lg max-w-md mx-auto pb-4 text-orange-500 bg-gray-800">
        <h1 className="text-white text-2xl text-center mt-10">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg mt-4 mx-4 my-20 overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          ></input>
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex item-center gap-x-1 pl-4 pr-2">
            <input
              type="range"
              min={6}
              max={100}
              value={lenght}
              className="cursor-pointer"
              onChange={(e) => {
                setLenght(e.target.value);
              }}
            ></input>
            <label>Lenght: {lenght}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            ></input>
            <label>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="numberInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            ></input>
            <label>Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

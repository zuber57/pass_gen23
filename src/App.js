import React from 'react';
import { useState, useCallback, useEffect, useRef } from 'react';
import './style.css';
import 'tailwindcss/tailwind.css';

export default function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  //useRef hook
  const passRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*-_+=[]{}~`';

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);
  const copypass = useCallback(() => {
    passRef.current?.select();
  }, [password]);
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);
  return (
    <div id="main">
      <div className="iy">
        <h2 className="mt-2">Password Generator</h2>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            ref={passRef}
            readOnly
          />
          <button onClick={copypass} className="bg-blue-400 m-0 px-1 py-1">
            Copy
          </button>
        </div>
        <div className="flex items-center mt-5  ml-3 gap-x-3 mb-10">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer it"
            onChange={(e) => setLength(e.target.value)}
          />
          <label className=" text-red-300">Length : ({length})</label>
          <div className="flex gap-x-2 ">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label className=" text-red-300">Number</label>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => setcharAllowed((prev) => !prev)}
            />
            <label className=" text-red-300">Character</label>
          </div>
        </div>
      </div>
    </div>
  );
}

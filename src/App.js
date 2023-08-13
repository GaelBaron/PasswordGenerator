import './App.css';
import React, { useState, useEffect } from 'react';

const generatePassword = (length, params) => {
  const password = [];
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
  const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
  const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let generatedPassword = '';

  if (!params.numbers && !params.symbols && !params.lowerCase && !params.upperCase) return ('')
  if (params.numbers) password.push(...numbers);
  if (params.symbols) password.push(...symbols);
  if (params.lowerCase) password.push(...lowerCase);
  if (params.upperCase) password.push(...upperCase);
  for (let i = 0; i < length; i++) {
    generatedPassword += password[Math.floor(Math.random() * password.length)];
  }
  return generatedPassword;
}

function App() {
  const [password, setPassword] = useState('');
  const [requiredLength, setRequireLength] = useState(10);
  const [strength, setStrength] = useState(4);
  const [updatedStrengthCases, setStrengthCases] = useState(null);
  const [requiredLengthPer, setRequireLengthPer] = useState(50);
  const [copied, setCopied] = useState(false);
  const [greenArrow, setGreenArrow] = useState(true);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useState({
    numbers: true, symbols: true,
    lowerCase: true, upperCase: true,
  });

  const strengthCalc = () => {
    let strength = 0;
    if (params.numbers) strength += 1;
    if (params.symbols) strength += 1;
    if (params.lowerCase) strength += 1;
    if (params.upperCase) strength += 1;
    return strength;
  }

  const passwordGenerator = (length, params) => {
    setCopied(false);
    setRequireLength(parseInt(length));
    setRequireLengthPer(parseInt(length) * 5);
    setPassword(generatePassword(parseInt(length), params));
  }

  const handleChangeCheckbox = (field, value) => {
    let tmpParams = params
    tmpParams[field] = !tmpParams[field]
    setParams(tmpParams)
    setPassword(generatePassword(requiredLength, tmpParams));
    setStrength(strengthCalc());
  }

  const copyToClipboard = () => {
    setCopied(true);
    navigator.clipboard.writeText(password);
  }

  const strengthCases = () => {
    switch (strength) {
      case 0:
        return (
          <div className='Square-holder'>
            <div className='SettingsText'>TOO WEAK !</div> <div className="Empty-square"></div> <div className="Empty-square"></div> <div className="Empty-square"></div> <div className="Empty-square"></div>
          </div>)
      case 1:
        return (
          <div className='Square-holder'>
            <div className='SettingsText'>TOO WEAK !</div> <div className="Red-square"></div> <div className="Empty-square"></div> <div className="Empty-square"></div> <div className="Empty-square"></div>
          </div>)
      case 2:
        return (
          <div className='Square-holder'>
            <div className='SettingsText'>WEAK</div> <div className="Orange-square"></div> <div className="Orange-square"></div> <div className="Empty-square"></div> <div className="Empty-square"></div>
          </div>)
      case 3:
        return (
          <div className='Square-holder'>
            <div className='SettingsText'>MEDIUM</div> <div className="Yellow-square"></div> <div className="Yellow-square"></div> <div className="Yellow-square"></div> <div className="Empty-square"></div>
          </div>)
      case 4:
        return (
          <div className='Square-holder'>
            <div className='SettingsText'>STRONG</div> <div className="Green-square"></div> <div className="Green-square"></div> <div className="Green-square"></div> <div className="Green-square"></div>
          </div>)
      default:
        return null
    }
  }

  if (loading) {
    setPassword(generatePassword(requiredLength, params));
    setLoading(false);
    setStrengthCases(strengthCases());
  }

  const handleMouseEnter = () => { console.log('yeeee');setGreenArrow(true); };

  const handleMouseLeave = () => { console.log('nooo');setGreenArrow(false); };

  useEffect(() => {
    setStrengthCases(strengthCases())

  }, [strength]);

  return (
    <div className="App-style">
      <div className="Title-container">
        Password Generator
      </div>
      <div className="Password-container">
        <div className="Text-container">
          {
            password.length === 0 ?
              <p className='Password-default-text'>P4$5W0rD</p> :
              <p className='Password-edited-text'>{password}</p>
          }
        </div>
        {
          copied ?
            <div className='Password-copied-text'>COPIED</div>
            : null
        }
        <button className='Password-button' onClick={copyToClipboard}><svg width="21" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M20.341 3.091 17.909.659A2.25 2.25 0 0 0 16.319 0H8.25A2.25 2.25 0 0 0 6 2.25V4.5H2.25A2.25 2.25 0 0 0 0 6.75v15A2.25 2.25 0 0 0 2.25 24h10.5A2.25 2.25 0 0 0 15 21.75V19.5h3.75A2.25 2.25 0 0 0 21 17.25V4.682a2.25 2.25 0 0 0-.659-1.591ZM12.469 21.75H2.53a.281.281 0 0 1-.281-.281V7.03a.281.281 0 0 1 .281-.281H6v10.5a2.25 2.25 0 0 0 2.25 2.25h4.5v1.969a.282.282 0 0 1-.281.281Zm6-4.5H8.53a.281.281 0 0 1-.281-.281V2.53a.281.281 0 0 1 .281-.281H13.5v4.125c0 .621.504 1.125 1.125 1.125h4.125v9.469a.282.282 0 0 1-.281.281Zm.281-12h-3v-3h.451c.075 0 .147.03.2.082L18.667 4.6a.283.283 0 0 1 .082.199v.451Z" fill="#A4FFAF" /></svg></button>
      </div>
      <div className="Input-container">
        <div className='SettingsText'>Character length<div className="Big-number">{requiredLength}</div></div><br />
        <input style={{ background: `linear-gradient(to right, #A4FFAF 0%, #A4FFAF ${requiredLengthPer}%, #18171F ${requiredLengthPer}%, #18171F 100%)` }} min="0" max="20" value={requiredLength} onChange={(val) => passwordGenerator(val.target.value, params)} type="range" />

        <div style={{ display: 'flex', width: '100%', marginTop: '20px' }}>
          {params.lowerCase ?
            <button style={{ marginLeft: '18px', width: '18px', height: '18px', background: '#A4FFAF', border: '2px solid #A4FFAF' }} onClick={() => handleChangeCheckbox("lowerCase", params)} >
              <svg style={{ position: 'absolute', marginLeft: '-7', marginTop: '-5' }} width="14" height="12" xmlns="http://www.w3.org/2000/svg"><path stroke="#18171F" stroke-width="3" fill="none" d="M1 5.607 4.393 9l8-8" /></svg>
            </button> :
            <button style={{ marginLeft: '18px', width: '18px', height: '18px', background: '#24232C', border: '2px solid #FFFFFF' }} onClick={() => handleChangeCheckbox("lowerCase", params)} >
              <svg style={{ position: 'absolute', marginLeft: '-7', marginTop: '-5' }} width="0" height="0" xmlns="http://www.w3.org/2000/svg"><path stroke="#18171F" stroke-width="3" fill="none" d="M1 5.607 4.393 9l8-8" /></svg>
            </button>
          }
          <div className='SettingsText'>Include Lowercase Letters</div>
        </div>

        <div style={{ display: 'flex', width: '100%', marginTop: '20px' }}>
          {params.upperCase ?
            <button style={{ marginLeft: '18px', width: '18px', height: '18px', background: '#A4FFAF', border: '2px solid #A4FFAF' }} onClick={() => handleChangeCheckbox("upperCase", params)} >
              <svg style={{ position: 'absolute', marginLeft: '-7', marginTop: '-5' }} width="14" height="12" xmlns="http://www.w3.org/2000/svg"><path stroke="#18171F" stroke-width="3" fill="none" d="M1 5.607 4.393 9l8-8" /></svg>
            </button> :
            <button style={{ marginLeft: '18px', width: '18px', height: '18px', background: '#24232C', border: '2px solid #FFFFFF' }} onClick={() => handleChangeCheckbox("upperCase", params)} >
              <svg style={{ position: 'absolute', marginLeft: '-7', marginTop: '-5' }} width="0" height="0" xmlns="http://www.w3.org/2000/svg"><path stroke="#18171F" stroke-width="3" fill="none" d="M1 5.607 4.393 9l8-8" /></svg>
            </button>
          }
          <div className='SettingsText'>Include Uppercase Letters</div>
        </div>

        <div style={{ display: 'flex', width: '100%', marginTop: '20px' }}>
          {params.numbers ?
            <button style={{ marginLeft: '18px', width: '18px', height: '18px', background: '#A4FFAF', border: '2px solid #A4FFAF' }} onClick={() => handleChangeCheckbox("numbers", params)} >
              <svg style={{ position: 'absolute', marginLeft: '-7', marginTop: '-5' }} width="14" height="12" xmlns="http://www.w3.org/2000/svg"><path stroke="#18171F" stroke-width="3" fill="none" d="M1 5.607 4.393 9l8-8" /></svg>
            </button> :
            <button style={{ marginLeft: '18px', width: '18px', height: '18px', background: '#24232C', border: '2px solid #FFFFFF' }} onClick={() => handleChangeCheckbox("numbers", params)} >
              <svg style={{ position: 'absolute', marginLeft: '-7', marginTop: '-5' }} width="0" height="0" xmlns="http://www.w3.org/2000/svg"><path stroke="#18171F" stroke-width="3" fill="none" d="M1 5.607 4.393 9l8-8" /></svg>
            </button>
          }
          <div className='SettingsText'>Include Numbers</div>
        </div>

        <div style={{ display: 'flex', width: '100%', marginTop: '20px' }}>
          {params.symbols ?
            <button style={{ marginLeft: '18px', width: '18px', height: '18px', background: '#A4FFAF', border: '2px solid #A4FFAF' }} onClick={() => handleChangeCheckbox("symbols", params)} >
              <svg style={{ position: 'absolute', marginLeft: '-7', marginTop: '-5' }} width="14" height="12" xmlns="http://www.w3.org/2000/svg"><path stroke="#18171F" stroke-width="3" fill="none" d="M1 5.607 4.393 9l8-8" /></svg>
            </button> :
            <button style={{ marginLeft: '18px', width: '18px', height: '18px', background: '#24232C', border: '2px solid #FFFFFF' }} onClick={() => handleChangeCheckbox("symbols", params)} >
              <svg style={{ position: 'absolute', marginLeft: '-7', marginTop: '-5' }} width="0" height="0" xmlns="http://www.w3.org/2000/svg"><path stroke="#18171F" stroke-width="3" fill="none" d="M1 5.607 4.393 9l8-8" /></svg>
            </button>
          }
          <div className='SettingsText'>Include Symbols</div>
        </div>

        <div className='Strength-container'>
          <div className='Password-default-text'>STRENGTH </div>
          {updatedStrengthCases}
        </div>

        <button className='Generate-button' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => passwordGenerator(requiredLength, params)}>
          GENERATE
          <div style={{ marginLeft: 10 }}>
            {
              !greenArrow ?
                <img width="12" height="12" src={require("./icon-arrow-right.png")} />
                :
                <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><path fill="#24232C" d="m5.106 12 6-6-6-6-1.265 1.265 3.841 3.84H.001v1.79h7.681l-3.841 3.84z" /></svg>
            }
          </div>
        </button>
      </div>
    </div>
  );
}

export default App;

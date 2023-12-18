import axios from 'axios';
import React, { useState } from 'react'

const initialEmail = ''

export default function AppFunctional(props) {
  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.
  const [index, setIndex] = useState(4);
  const [errorMessage, setErrorMessage] = useState("");
  const [steps, setSteps] = useState(0);
  const [email, setEmail] = useState("");


  function getXY(index) {
    let x = (index % 3) + 1;
    let y = Math.floor(index / 3) + 1;
    return { x, y };
  }

  function getXYMesaj() {

    const XY = getXY(index);
    return `Koordinatlar (${[XY.x, XY.y]})`;
  }

  function reset() {
    setIndex(4);
    setErrorMessage("");
    setSteps(0);
    setEmail(" ");
  }

  function clickHandler(event) {

    const XY = getXY(index);
    setErrorMessage("");

    if (event.target.id === "up") {
      if (XY.y != 1) {
        setIndex(index - 3);
        setSteps(steps + 1);
      } else
        setErrorMessage("Yukarıya gidemezsiniz");
    }

    else if (event.target.id === "down") {
      if (XY.y != 3) {
        setIndex(index + 3);
        setSteps(steps + 1);
      } else
        setErrorMessage("Aşağıya gidemezsiniz");
    }

    else if (event.target.id === "right") {
      if (XY.x != 3) {
        setIndex(index + 1);
        setSteps(steps + 1);
      } else
        setErrorMessage("Sağa gidemezsiniz");
    }

    else if (event.target.id === "left") {
      if (XY.x != 1) {
        setIndex(index - 1);
        setSteps(steps + 1);
      } else
        setErrorMessage("Sola gidemezsiniz");
    }
  }

  function onSubmit(event) {
    event.preventDefault();
    const { x, y } = getXY(index);
    axios.post("http://localhost:9000/api/result", { x, y, steps, email })
      .then(res => {
        setErrorMessage(res.data.message)
        setEmail("");
      })
      .catch(err => {
        setErrorMessage(err.response.data.message)
      })
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMesaj()}</h3>
        <h3 id="steps">{steps} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{errorMessage}</h3>
      </div>
      <div id="keypad">
        <button onClick={clickHandler} id="left">SOL</button>
        <button onClick={clickHandler} id="up">YUKARI</button>
        <button onClick={clickHandler} id="right">SAĞ</button>
        <button onClick={clickHandler} id="down">AŞAĞI</button>
        <button onClick={reset} id="reset">reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="email girin" onChange={(e) => setEmail(e.target.value)} value={email}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div >
  )
}

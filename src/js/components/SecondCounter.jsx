import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

import {
  faPause,
  faPlay,
  faRotateLeft,
  faHourglassStart,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons";


function SecondCounter() {
  const [seconds, setSeconds] = useState(0);
  const [initial, setInitial] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("up"); // "up" o "down"
  const intervalRef = useRef(null);
  const [target, setTarget] = useState(null); // Crea la alerta

  // Efecto del contador
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (mode === "down") {
            if (prev <= 0) {
              clearInterval(intervalRef.current);
              setIsRunning(false);
              alert("¡Tiempo terminado!");
              return 0;
            }
            return prev - 1;
          } else {
            const newVal = prev + 1;
            if (target !== null && newVal === target) {
              alert(`¡Has alcanzado los ${target} segundos!`);
            }
            return newVal;
          }
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, mode, target]);

  const formatNumber = (num) => {
    return Math.max(0, num)
      .toString()
      .padStart(6, "0")
      .split("");
  };

  const startCountdown = () => {
    setMode("down");
    setSeconds(initial);
    setIsRunning(true);
  };

  const startCountup = () => {
    setMode("up");
    setSeconds(0);
    setIsRunning(true);
  };

  const pause = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const resume = () => {
    if (!isRunning) setIsRunning(true);
  };

  const reset = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setSeconds(mode === "down" ? initial : 0);
  };

  const digits = formatNumber(seconds);

  // Estilos
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "#111",
      color: "#fff",
    },
    counterBox: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "#222",
      padding: "20px 40px",
      borderRadius: "12px",
      marginTop: "20px",
    },
    icon: {
      fontSize: "2rem",
      marginRight: "30px",
    },
    digitsContainer: {
      display: "flex",
      gap: "15px",
    },
    digit: {
      fontSize: "2.5rem",
      padding: "10px 18px",
      backgroundColor: "#333",
      borderRadius: "10px",
      minWidth: "40px",
      textAlign: "center",
    },
    input: {
      padding: "10px",
      fontSize: "1rem",
      margin: "10px",
      borderRadius: "5px",
      border: "none",
    },
    button: {
      padding: "10px 15px",
      margin: "5px",
      fontSize: "1rem",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
    },
    controls: {
      marginTop: "20px",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    },
  };

  return (
    <div style={styles.container}>
      <h1>SIMPLE COUNTER</h1>

      <input
        type="number"
        placeholder="Tiempo inicial o meta"
        value={initial}
        onChange={(e) => setInitial(Number(e.target.value))}
        style={styles.input}
      />

      <input
        type="number"
        placeholder="Alert at X seconds "
        value={target ?? ""}
        onChange={(e) => setTarget(Number(e.target.value))}
        style={styles.input}
      />

      <div style={styles.counterBox}>
        <FontAwesomeIcon icon={faClock} style={styles.icon} />
        <div style={styles.digitsContainer}>
          {digits.map((digit, index) => (
            <span key={index} style={styles.digit}>
              {digit}
            </span>
          ))}
        </div>
      </div>

      <div style={styles.controls}>
        <button style={styles.button} onClick={startCountup}>
  <FontAwesomeIcon icon={faStopwatch} /> Count Up
</button>

<button style={styles.button} onClick={startCountdown}>
  <FontAwesomeIcon icon={faHourglassStart} /> Countdown
</button>

<button style={styles.button} onClick={pause}>
  <FontAwesomeIcon icon={faPause} /> Pause
</button>

<button style={styles.button} onClick={resume}>
  <FontAwesomeIcon icon={faPlay} /> Resume
</button>

<button style={styles.button} onClick={reset}>
  <FontAwesomeIcon icon={faRotateLeft} /> Reset
</button>

      </div>
    </div>
  );
}

export default SecondCounter;

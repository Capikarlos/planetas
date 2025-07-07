import React, { useState, useEffect, useMemo } from "react";
import Planeta from "./Planeta";

function App() {
  const [distancia, setDistancia] = useState(0);
  const [combustible, setCombustible] = useState(100);
  const [estadoNave, setEstadoNave] = useState("En órbita");
  const [planetasVisitados, setPlanetasVisitados] = useState([]);
  const [vueloActivo, setVueloActivo] = useState(true); // Nuevo estado

  useEffect(() => {
    console.log("¡El panel está listo!");

    const intervalo = setInterval(() => {
      if (vueloActivo && combustible > 0) {
        setCombustible((c) => c - 10);
        setDistancia((d) => d + 50);
      }

      if (combustible <= 10) {
        clearInterval(intervalo);
        setVueloActivo(false);
        setEstadoNave("Combustible agotado");
        console.log("🚨 Combustible agotado. Misión terminada.");
      }
    }, 1000);

    return () => {
      clearInterval(intervalo);
      console.log("El panel se ha apagado.");
    };
  }, [vueloActivo, combustible]);

  useEffect(() => {
    console.log("¡Combustible actualizado!");
  }, [combustible]);

  const mensajeEstado = useMemo(() => {
    return `Estado de la Nave: ${estadoNave}`;
  }, [estadoNave]);

  const aterrizar = () => {
    const planeta = `Planeta-${planetasVisitados.length + 1}`;
    setEstadoNave("Aterrizando");
    setPlanetasVisitados([...planetasVisitados, planeta]);
  };

  const reiniciarMision = () => {
    console.log("🧑‍🚀 Lanzando nueva misión...");
    setDistancia(0);
    setCombustible(100);
    setEstadoNave("En órbita");
    setPlanetasVisitados([]);
    setVueloActivo(true);
  };

  return (
    <div style={styles.panel}>
      <h1>🛰️ Panel de Control del Explorador Espacial</h1>

      {vueloActivo ? (
        <>
          <p>📏 Distancia recorrida: {distancia} km</p>
          <p>⛽ Combustible restante: {combustible} %</p>
          <p>📡 {mensajeEstado}</p>

          <button onClick={aterrizar} style={styles.button}>
            Aterrizar en planeta
          </button>

          <h2>🪐 Planetas Visitados</h2>
          {planetasVisitados.map((nombre, index) => (
            <Planeta key={index} nombre={nombre} />
          ))}
        </>
      ) : (
        <>
          <h2 style={{ color: "red" }}>🚨 Combustible agotado</h2>
          <p>Tu misión ha terminado. Puedes lanzar otra nave.</p>
          <button onClick={reiniciarMision} style={styles.button}>
            🚀 Lanzar otro cohete
          </button>
        </>
      )}
    </div>
  );
}

const styles = {
  panel: {
    backgroundColor: "#0d1117",
    color: "#c9d1d9",
    padding: "2rem",
    borderRadius: "12px",
    maxWidth: "600px",
    margin: "2rem auto",
    fontFamily: "monospace",
    boxShadow: "0 0 20px rgba(0,255,255,0.2)",
  },
  button: {
    backgroundColor: "#238636",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "1rem",
  },
};

export default App;

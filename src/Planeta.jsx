import React, { useEffect } from "react";

function Planeta({ nombre }) {
  useEffect(() => {
    console.log(`🪐 ¡El planeta ${nombre} ha aparecido!`);

    return () => {
      console.log(`🪐 ¡El planeta ${nombre} ha desaparecido!`);
    };
  }, [nombre]);

  return <div style={styles.planeta}>{nombre}</div>;
}

const styles = {
  planeta: {
    backgroundColor: "#1f6feb",
    color: "white",
    padding: "8px",
    borderRadius: "6px",
    marginBottom: "5px",
    textAlign: "center",
  },
};

export default Planeta;

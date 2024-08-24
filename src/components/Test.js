import React, { useState, useEffect } from 'react';


const App = () => {

  useEffect(() => {

    fetch('http://localhost:5000/image-generation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: "Descreva a imagem que você deseja gerar"
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
        ola
    </div>
  );
};

export default App;

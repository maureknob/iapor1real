import React, { useState } from 'react';
import { TextField, Button, Container, Grid } from '@mui/material';
import logo from '../assets/logo.png';
import scientist from '../assets/iaporumreal.png';
import { useNavigate } from 'react-router-dom'
import EMediaType from '../enums/EMediaType';

const Prompt = () => {
    const navigate = useNavigate()
    const [text, setText] = useState('')

    const handleChange = (event) => {
        console.log(event)
        setText(event.target.value)
    }

    const handleClick = () => {
        fetch(process.env.REACT_APP_API_URL+'/text-generation', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: text
              }),
          })
            .then((response) => response.json())
            .then((response) => {
              console.log(response);
              navigate('/prompt-result', { state: { resultType: EMediaType.TEXT, resultContent: response.text } });
            })
            .catch((error) => {
              console.error(error);
            });
    }

  return (
    <div>
      <Container>
      <Grid
      container
      spacing={2}
      direction="column"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
      <TextField
          label="Insira o prompt aqui"
          variant="outlined"
          value={text}
          onChange={handleChange}
          fullWidth
          multiline
          maxRows={4}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '9999px',
            },
          }}
        />
      </Grid>
      <Grid item xs={4} sm={4} md={4} lg={4}>
      <Button variant="contained" color="primary" onClick={handleClick} sx={{ height: '60px', borderRadius: '20px', backgroundColor: '#F4F100', color: '#372A28' }}>
          Capturar Texto
        </Button>
      </Grid>
    </Grid>
    </Container>
    </div>
  );
};

export default Prompt;

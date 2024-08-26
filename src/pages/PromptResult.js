import React, { useState } from 'react';
import { Container, Grid } from '@mui/material';
import logo from '../assets/logo.png';
import scientist from '../assets/iaporumreal.png';
import TextareaWithCopy from '../components/TextAreaWithCopy';
import EMediaType from '../enums/EMediaType'
import { useLocation } from 'react-router-dom';

const PromptResult = () => {
    const location = useLocation()
    const {resultType = "", resultContent = ""} = location.state || {};
    const [result, setResult] = useState(resultType)
    const [content, setContent] = useState(resultContent)

    const handleType = () =>{
        console.log(result)
        switch(result){
            case EMediaType.TEXT:
                return <TextareaWithCopy initialText={content} />;
            default:
                return <div>Tipo de mídia não suportado.</div>;
        }
    }

    return(
        <div>
        <Container maxWidth="lg">
        <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
            {
                handleType()
            }
      </Grid>
        </Container>
      </div>
    )
}

export default PromptResult
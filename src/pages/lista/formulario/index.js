import { Container, TextField, MenuItem  } from "@mui/material";
import Card from "../../../components/Card";
import { Button, Row } from "react-bootstrap";
import * as React from 'react';
import Box from '@mui/material/Box';

const tipoLista = [
    {
        value:"0",
        label:"Presença"
    },{
        value:"1",
        label:"Itens"
    }
]

const Formulario = () =>{
    return<>
    <Container>
        <Card title="Cadastro de Lista">
        <Box
            component="form"
            noValidate
            autoComplete="off"
            >
            <Row className="">
                <Row className="col-6 mr-2 ml-2">
                    <TextField id="nome" label="Nome" type="search" variant="standard"/>
                </Row>
                <Row className="col-6">
                    <TextField id="tipoLista" select label="Tipo Lista" defaultValue="0" 
                            helperText="Selecione o tipo da lista" variant="standard"
                            >
                            {tipoLista.map((tipo) => (
                                <MenuItem key={tipo.value} value={tipo.value}>
                                {tipo.label}
                                </MenuItem>
                            ))}
                        </TextField>
                </Row>
                <Row className="col-8 mr-2 ml-2">
                    <TextField id="descricao" placeholder="Descrição sobre a lista" label="Descrição" type="search" variant="standard"/>                    
                </Row>
                <Row className="col-2">
                    <TextField id="inicio" label="Inicio" type="date" variant="standard"
                        InputLabelProps={{shrink: true}}/>
                </Row>
                <Row className="col-2 ml-2">
                    <TextField id="fim" label="Fim" type="date" variant="standard"
                        InputLabelProps={{shrink: true}}/>
                </Row>
            </Row>
            <div className="float-right mr-4 mt-4">
                <Button variant='danger' href='/formulario/lista' size='sm'>Cancelar</Button>
                <Button variant='primary' href='/formulario/lista' size='sm'>Cadastrar</Button>
            </div>
            </Box>    
        </Card>
    </Container>
    </>
}

export default Formulario;
import { Container, TextField, MenuItem  } from "@mui/material";
import Card from "../../../components/Card";
import { Button, Row } from "react-bootstrap";
import * as React from 'react';
import Box from '@mui/material/Box';
import useContainer from "./container";

const Formulario = () =>{

    const { functions, values, tipoLista, titulo } = useContainer();

    return<>
    <Container>
        <Card title={titulo}>
        <Box
            component="form"
            noValidate
            autoComplete="off"
            >
            <Row className="">
                <Row className="col-6 mr-2 ml-2">
                    <TextField id="nome" label="Nome" value={values.nome} type="search" variant="standard" onChange={e => functions.setValues(prevState => {return { ...prevState, nome: e.target.value }})}/>
                </Row>
                <Row className="col-6">
                    <TextField id="tipoLista" select label="Tipo Lista" value={values.tipoLista} 
                            helperText="Selecione o tipo da lista" variant="standard"
                            onChange={e => functions.setValues(prevState => {return { ...prevState, tipoLista: e.target.value }})}
                            >
                            {tipoLista.map((tipo) => (
                                <MenuItem key={tipo.value} value={tipo.value}>
                                {tipo.label}
                                </MenuItem>
                            ))}
                        </TextField>
                </Row>
                <Row className="col-8 mr-2 ml-2">
                    <TextField id="descricao" placeholder="Descrição sobre a lista" label="Descrição" value={values.descricao} type="search" 
                    variant="standard" onChange={e => functions.setValues(prevState => {return { ...prevState, descricao: e.target.value }})}/>                    
                </Row>
                <Row className="col-2">
                    <TextField id="inicio" label="Inicio" value={values.inicio} type="date" variant="standard" onChange={e => functions.setValues(prevState => {return { ...prevState, inicio: e.target.value }})}
                        InputLabelProps={{shrink: true}}/>
                </Row>
                <Row className="col-2 ml-2">
                    <TextField id="fim" label="Fim" value={values.fim} type="date" variant="standard" onChange={e => functions.setValues(prevState => {return { ...prevState, fim: e.target.value }})}
                        InputLabelProps={{shrink: true}}/>
                </Row>
            </Row>
            <div className="float-right mr-4 mt-4">
                <Button variant='danger' href='/lista' size='sm'>Cancelar</Button>
                <Button variant='primary' size='sm' onClick={e => functions.salvar()}>Cadastrar</Button>
            </div>
            </Box>    
        </Card>
    </Container>
    </>
}

export default Formulario;
import { Container, TextField, MenuItem  } from "@mui/material";
import Card from "../../../components/Card";
import DataTable from "../../../components/DataTable";
import { Button, Col, Row } from "react-bootstrap";
import * as React from 'react';
import Box from '@mui/material/Box';
import useContainer from "./container";

const Formulario = () =>{

    const { functions, values, tipoLista, aberta, titulo, data } = useContainer();

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
                    <TextField id="nome" label="Titulo" value={values.nome} type="search" variant="standard" onChange={e => functions.setValues(prevState => {return { ...prevState, nome: e.target.value }})}/>
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
                <Row className="col-6 mr-2 ml-2">
                    <TextField id="descricao" placeholder="Descrição sobre a lista" label="Descrição" value={values.descricao} type="search" 
                    variant="standard" onChange={e => functions.setValues(prevState => {return { ...prevState, descricao: e.target.value }})}/>                    
                </Row>
                <Row className="col-2">
                    <TextField id="tipoLista" select label="Lista Aberta" value={values.aberta} 
                                helperText="Selecione o tipo da lista" variant="standard"
                                onChange={e => functions.setValues(prevState => {return { ...prevState, aberta: e.target.value }})}
                                >
                                {aberta.map((tipo) => (
                                    <MenuItem key={tipo.value} value={tipo.value}>
                                    {tipo.label}
                                    </MenuItem>
                                ))}
                    </TextField>
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
                <Button variant='primary' size='sm' onClick={e => functions.salvar()}>salvar</Button>
            </div>
            </Box>    
        </Card>
        <Row className="mr-2 ml-2">
            <TextField className="mt-3 col-4" id="nomeItem" placeholder="Nome e sobrenome" label="Nome" defaultValue={""} onChange={e => functions.setItem(prevState => {return { ...prevState, nome: e.target.value }})} type="search" 
            variant="standard"/>   
            { values.tipoLista == 1 &&
                <TextField className="mt-3 ml-2 col-4" id="nomeProduto" placeholder="Nome do Item" label="Item" defaultValue={""} onChange={e => functions.setItem(prevState => {return { ...prevState, produto: e.target.value }})} type="search" 
                variant="standard"/>   
            }
            <Col>
                <Button className="mt-4" variant='primary' size='sm' onClick={e => functions.criarItem()}>Assinar</Button>                 
            </Col>
        </Row>
        <div className="mt-5">
            <DataTable datatable={data} />
        </div>
    </Container>
    </>
}

export default Formulario;
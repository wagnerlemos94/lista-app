
import { Container, TextField, MenuItem  } from "@mui/material";
import Card from "../../../components/Card";
import { Button, Col, Row } from "react-bootstrap";
import * as React from 'react';
import Box from '@mui/material/Box';
import useContainer from "./container";
import DataTable from "../../../components/DataTable";

const ListaPublica = () => {
    const { lista, data, nome, functions } = useContainer();
  return (
    <Container className="mt-4">
        <h1 className="text-center">Lista de Presença</h1>
        <Card title={`${lista.nome}`} className="mt-5">
        <Box
            component="form"
            noValidate
            autoComplete="off"
            >
            <Row className="mr-2 ml-2">
                <TextField id="descricao" className="col-9 mr-2" label="Descrição do evento" value={`${lista.descricao}`} type="search" 
                variant="standard" disabled/>                    
                <TextField id="descricao" className="col-2" label="Dia do Evento" value={`${lista.fim}`} type="search" 
                variant="standard" disabled/>                    
            </Row>
            </Box>    
        </Card>
        <Row className="mr-2 ml-2">
            <TextField className="mt-3 col-4" id="nome" placeholder="Nome e sobrenome" label="Nome" defaultValue={""} onChange={e => functions.setNome(e.target.value)} type="search" 
            variant="standard"/>   
            <Col>
            <Button className="mt-4" variant='primary' size='sm' onClick={e => functions.assinar()}>Assinar</Button>                 
            </Col>
        </Row>
        <div className="mt-5">
            <DataTable datatable={data} />
        </div>
    </Container>  
  )
}

export default ListaPublica;
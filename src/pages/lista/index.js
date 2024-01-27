import React from 'react';
import useContainer from "./container";
import DataTable from "../../components/DataTable";
import { Button, Container } from 'react-bootstrap';

const Lista = () => {
    const { lista, data } = useContainer();
  return (
    <Container>
      <Button variant='primary' href='/formulario/lista' size='sm'>Cadastro</Button>
        <DataTable datatable={data} />
    </Container>  
  )
}

export default Lista;
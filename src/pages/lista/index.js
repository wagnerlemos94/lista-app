import React from 'react';
import useContainer from "./container";
import DataTable from "../../components/DataTable";
import { Container } from 'react-bootstrap';

const Lista = () => {
    const { lista, data } = useContainer();
  return (
    <Container>
        <DataTable datatable={data} />
    </Container>  
  )
}

export default Lista;
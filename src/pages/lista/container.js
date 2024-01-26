
import ListaResource from '../../services/controllers/ListaResource';
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from "react";

import { error, warning } from '../../components/Toast';

const useContainer = () => {
    
    const navigate = useNavigate();
    const service = new ListaResource();
    const [lista, setLista] = useState();

    const colunms = [
        {
            label: "Num",
            field: "id"
        },{
            label: "Nome",
            field: "nome"
        },
        {
            label: "Tipo Lista",
            field: "tipoLista"
        }
    ]

    const listar = () => {
        service.listar().then( response => {
            setLista(response.data);
            console.log(lista)
        }).catch( erro => {
            warning(erro.response)
        })
    }

    useEffect(()=> {
        listar();
    },[]);

    return {
        lista:lista,
        data:{
            columns:colunms,
            rows:lista
        },
        functions: {
        } 
    }
}

export default useContainer;
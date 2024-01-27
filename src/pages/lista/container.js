
import ListaResource from '../../services/controllers/ListaResource';
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from "react";
import EditIcon from '@mui/icons-material/Edit';

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
        },        {
            label: "Tipo Lista",
            field: "tipoLista"
        },{
            label: "Ações",
            field: "acoes"
        }
    ]

    const listar = () => {
        service.listar().then( response => {
            const data = response.data;
            Object.values(data).map( lista => {
                lista.acoes =   
                <>
                    <a className="mr-2" id={lista.id}
                    onClick={e => editar(lista)}>
                        <EditIcon/>
                    </a>
                  </>      
                       
                });
            setLista(data);
        }).catch( erro => {
            warning(erro.response)
        })
    }

    const editar = (lista) => {
        lista.acoes = null;
        navigate("/formulario/lista", {state:lista})
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

import ListaResource from '../../../services/controllers/ListaResource';
import { useNavigate, useParams } from 'react-router-dom';
import {useState, useEffect} from "react";
import EditIcon from '@mui/icons-material/Edit';

import { error, success, warning } from '../../../components/Toast';

const useContainer = () => {
    
    const navigate = useNavigate();
    const {id} = useParams();
    const service = new ListaResource();
    const [lista, setLista] = useState({descricao:""});
    const [nome, setNome] = useState(null);

    const colunms = [
        {
            label: "Num",
            field: "id"
        },{
            label: "Nome",
            field: "nome"
        }
    ]

    const listar = () => {
        service.buscar(id).then( response => {
            const data = response.data;
            for(let i=0; data.itens.length > i; i++){
                data.itens[i].id = i+1
            }
            setLista(data);
        }).catch( erro => {
            warning(erro.response)
        })
    }

    const assinar = () => {
        if(nome !== null){
            const item = {
                produto:null,
                nome:nome
            }
            service.assinar(id,item).then( response => {
                const data = response.data;
                setNome(null)
                listar();
                success("Nome incluido com sucesso!");
            }).catch( erro => {
                warning(erro.response)
            })
            navigate(`/public/lista/${id}`);
        }else{
            error("Nome é Obrigatório")
        }
    }

    useEffect(()=> {
        listar();
    },[]);

    return {
        lista:lista,
        nome,nome,
        data:{
            columns:colunms,
            rows:lista.itens
        },
        functions: {
            assinar,
            setNome
        } 
    }
}

export default useContainer;
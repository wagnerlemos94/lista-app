
import ListaResource from '../../../services/controllers/ListaResource';
import { useNavigate, useParams } from 'react-router-dom';
import {useState, useEffect} from "react";
import EditIcon from '@mui/icons-material/Edit';

import { error, success, warning } from '../../../components/Toast';

const useContainer = () => {
    
    const navigate = useNavigate();
    const {id} = useParams();
    const service = new ListaResource();
    const [lista, setLista] = useState({descricao:"", fim:null});
    const [nome, setNome] = useState(null);

    const colunmsNormal = [
        {
            label: "Num",
            field: "id"
        },{
            label: "Nome",
            field: "nome"
        }
    ]

    const [colunms, setColunms] = useState(colunmsNormal);

    const colunmsItens = [
        {
            label: "Num",
            field: "id"
        },{
            label: "Item",
            field: "produto"
        },{
            label: "Nome",
            field: "nome"
        }
    ]

    const listar = () => {
        service.buscar(id).then( response => {
            const {data} = response;
            if(data.tipoLista == "ITENS" ){
                setColunms(colunmsItens);
            }
            for(let i=0; data.itens.length > i; i++){
                data.itens[i].id = i+1
            }
            setLista(data);
        }).catch( erro => {
            warning(erro.response.data.mensagemUsuario)
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
                warning(erro.response.data.mensagemUsuario)
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
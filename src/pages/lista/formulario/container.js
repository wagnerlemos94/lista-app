
import ListaResource from '../../../services/controllers/ListaResource';
import { useNavigate, useLocation } from 'react-router-dom';
import {useState, useEffect} from "react";

import { error, warning, success } from '../../../components/Toast';

const useContainer = () => {
    
    const navigate = useNavigate();
    const location = useLocation();
    const service = new ListaResource();
    const [lista, setLista] = useState();
    
    const inicialValues = {
        nome:"",
        descricao:"",
        tipoLista:0,
        inicio:null,
        fim:null
    }
    const [ values, setValues ] = useState(inicialValues);

    const tipoLista = [
        {
            value:"0",
            label:"Presença"
        },{
            value:"1",
            label:"Itens"
        }
    ]

    function validacoes(){
        let validacoes = true;
        if(values.nome === ""){
            validacoes = false;
            error("Nome é obrigatório!")
        }
        return validacoes;
    }

    const cadastrar = () => {
        if(validacoes()){
            service.cadastrar(values).then(response => {
                success("Lista cadastrada com sucesso!")
                navigate('/lista');
            }).catch(erro => {
                error("Erro ao cadastrar!")
            })
        }
    }

    const listar = () => {
        service.listar().then( response => {
            setLista(response.data);
            console.log(lista)
        }).catch( erro => {
            warning(erro.response)
        })
    }

    useEffect(()=> {
        console.log(location.state)
    },[]);

    return {
        tipoLista:tipoLista,
        values:values,
        functions: {
            cadastrar,
            setValues
        } 
    }
}

export default useContainer;
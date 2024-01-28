
import ListaResource from '../../../services/controllers/ListaResource';
import { useNavigate, useLocation } from 'react-router-dom';
import {useState, useEffect} from "react";

import { error, warning, success } from '../../../components/Toast';

const useContainer = () => {
    
    const navigate = useNavigate();
    const location = useLocation();
    const service = new ListaResource();
    const [titulo, setTitulo] = useState();
    
    const inicialValues = {
        id:null,
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

    const salvar = () => {
        if(values.id === null ){
            cadastrar();
        }else{
            atualizar();
        }
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
    const atualizar = () => {
        if(validacoes()){
            service.atualizar(values.id,values).then(response => {
                success("Lista cadastrada com sucesso!")
                navigate('/lista');
            }).catch(erro => {
                error("Erro ao cadastrar!")
            })
        }
    }

    function montarLista(lista){
        lista = {
            id:lista.id,
            nome:lista.nome,
            descricao:lista.descricao,
            tipoLista:lista.tipoLista === "PRESENCA" ? 0 : 1,
            inicio:lista.inicio,
            fim:lista.fim
        }
        setValues(lista)
        console.log(lista)
        console.log(values)
    }

    useEffect(()=> {
        if(location.state){
            console.log(location.state)
            setTitulo('Editar Lista')
            montarLista(location.state)
        }else{            
            setTitulo('Criar Lista')
        }
    },[]);

    return {
        tipoLista:tipoLista,
        values:values,
        titulo:titulo,
        functions: {
            salvar,
            setValues
        } 
    }
}

export default useContainer;
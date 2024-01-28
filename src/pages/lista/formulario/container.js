
import ListaResource from '../../../services/controllers/ListaResource';
import { useNavigate, useLocation } from 'react-router-dom';
import {useState, useEffect} from "react";
import EditIcon from '@mui/icons-material/Edit';

import { error, warning, success } from '../../../components/Toast';
import ItemResource from '../../../services/controllers/ItemResource';
import { TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const useContainer = () => {
    
    const navigate = useNavigate();
    const location = useLocation();
    const service = new ListaResource();
    const itemService = new ItemResource();
    const [titulo, setTitulo] = useState();
    const [nomeItem, setNomeItem] = useState();
    const [item, setItem] = useState({
        produto:null,
        nome:""
    });
    const [itens, setItens] = useState([]);
    
    const inicialValues = {
        id:null,
        nome:"",
        descricao:"",
        tipoLista:0,
        inicio:null,
        fim:null
    }

    const colunms = [
        {
            label: "Num",
            field: "id"
        },{
            label: "Nome",
            field: "nome"
        },{
            label: "Ações",
            field: "acoes"
        }
    ]

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

    function validacoes(nome){
        let validacoes = true;
        if(nome === ""){
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
        if(validacoes(values)){
            service.cadastrar(values).then(response => {
                success("Lista cadastrada com sucesso!")
                navigate('/lista');
            }).catch(erro => {
                error("Erro ao cadastrar!")
            })
        }
    }
    const atualizar = () => {
        if(validacoes(values)){
            values.itens = removeAcoesEImput(itens);
            service.atualizar(values.id,values).then(response => {
                success("Lista atualizada com sucesso!")
                navigate('/lista');
            }).catch(erro => {
                error("Erro ao cadastrar!")
            })
        }
    }
    function removeAcoesEImput(itens){
        const listaItens = new Array();
        itens.map(item => {
            listaItens.push({
                id:item.id,
                produto:item.produto,
                nome:item.nome.props.defaultValue
            })
        })
        return listaItens;
    }
    const atualizarItem = (item) => {
        if(validacoes(item.nome)){
            itemService.atualizar(item.id,item).then(response => {
                success("Lista atualizada com sucesso!")
            }).catch(erro => {
                error("Erro ao cadastrar!")
            })
        }
    }
    const deletar = (item) => {
        if(validacoes(item.nome)){
            itemService.deletar(item.id,item).then(response => {
                success("Item deletado com sucesso!")
            }).catch(erro => {
                error("Erro ao cadastrar!")
            })
        }
    }
    const criarItem = () => {
        if(validacoes(item.nome)){
            itemService.cadastrar(values.id,item).then(response => {
                console.log(itens)
                montarItem(response.data);
                console.log(itens)
                success("Lista atualizada com sucesso!")
            }).catch(erro => {
                error("Erro ao cadastrar!")
            })
        }
    }

    function montarLista(lista){
        setTitulo('Editar Lista')
        lista = {
            id:lista.id,
            nome:lista.nome,
            descricao:lista.descricao,
            tipoLista:lista.tipoLista === "PRESENCA" ? 0 : 1,
            inicio:lista.inicio,
            fim:lista.fim
        }
        setValues(lista)
    }
    
    function montarItens(itens){
        const listaItens = new Array();
        itens.map(item => {
            listaItens.push({
                id:item.id,
                produto:item.produto,
                nome:<TextField id="nome" label="" defaultValue={item.nome} type="search" variant="standard" onChange={e => item.nome = e.target.value}/>,
                acoes:   
                <>
                    <a className="mr-2" id={item.id}
                    onClick={e => atualizarItem(item)}>
                        <EditIcon />
                    </a>
                    <a className="mr-2" id={item.id}
                    onClick={e => deletar(item)}>
                        <DeleteIcon />
                    </a>
                  </>  
            });
        })
        setItens(listaItens)
    }

    function montarItem(item){
        itens.push({
            id:item.id,
            produto:item.produto,
            nome:<><TextField id="nome" label="" defaultValue={item.nome} type="search" variant="standard" onChange={e => item.nome = e.target.value}/></>,
            acoes:   
                <a className="mr-2" id={item.id}
                onClick={e => atualizarItem(item)}>
                    <EditIcon />
                </a> 
        });
        setItens(itens)
    }

    useEffect(()=> {
        if(location.state){
            montarItens(location.state.itens)
            montarLista(location.state)
        }else{            
            setTitulo('Criar Lista')
        }
    },[]);

    return {
        tipoLista:tipoLista,
        values:values,
        titulo:titulo,
        data:{
            columns:colunms,
            rows:itens
        },
        functions: {
            salvar,
            setValues,
            setItem,
            criarItem
        } 
    }
}

export default useContainer;
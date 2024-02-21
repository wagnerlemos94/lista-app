
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
    const [item, setItem] = useState({
        produto:null,
        nome:""
    });
    
    const inicialValues = {
        id:null,
        nome:"",
        descricao:"",
        tipoLista:0,
        inicio:null,
        fim:null,
        itens:new Array(),
        aberta: false
    }
    
    const aberta = [
        {
            value:true,
            label:"Sim"
        },{
            value:false,
            label:"Não"
        }
    ]
    const colunmsNormal = [
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
        },{
            label: "Ações",
            field: "acoes"
        }
    ]

    const [ values, setValues ] = useState(inicialValues);

    const tipoLista = [
        {
            value:"0",
            label:"NORMAL"
        },{
            value:"1",
            label:"ITENS"
        }
    ]

    function validacoes(nome, msg){
        let validacoes = true;
        
        if(values.tipoLista == 0 && nome === ""){
            validacoes = false;
            error(msg);
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
        if(validacoes(values.nome, "Titulo é obrigatório!")){
            service.cadastrar(values).then(response => {
                success("Lista cadastrada com sucesso!")
                navigate('/lista');
            }).catch(erro => {
                if(erro.response.data.mensagemUsuario){
                    error(erro.response.data.mensagemUsuario)
                }else{
                    error("Erro ao cadastrar!")
                }
            })
        }
    }
    const setTipoLista = (tipoList) => {
        let retorno = null;
        tipoLista.map( tipo => {
            if(typeof  tipoList === "string" && tipo.label === tipoList){
                retorno = tipo.value;
            }else if(typeof  tipoList !== "string" && tipo.value === tipoList){
                retorno = tipo.label;
            }
        })
        return retorno;
    }
    const atualizar = () => {
        if(validacoes(values.nome)){
            // alert(values.tipoLista)
            // values.tipoLista = setTipoLista(values.tipoLista);
            values.itens = removeAcoesEImput(values.itens);
            service.atualizar(values.id,values).then(response => {
                success("Lista atualizada com sucesso!")
                navigate('/lista');
            }).catch(erro => {
                if(erro.response.data.mensagemUsuario){
                    error(erro.response.data.mensagemUsuario)
                }else{
                    error("Erro ao cadastrar!")
                }
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

    const buscar = (id) => {
        service.buscar(id).then(response => {
            const { data } = response;
            if(data.tipoLista == "ITENS" ){
                setColunms(colunmsItens);
            }
            data.tipoLista = setTipoLista(data.tipoLista);
            data.itens = montarItens(id,data.itens);
            setValues(data);
        }).catch(erro => {
            console.log(erro.response.data)
            if(erro.response.data.mensagemUsuario){
                error(erro.response.data.mensagemUsuario)
            }else{
                error("Erro ao cadastrar!")
            }
        })
    }

    const atualizarItem = (idLista,item) => {
        if(validacoes(item.nome)){
            itemService.atualizar(item.id,item).then(response => {
                buscar(idLista)
                success("Lista atualizada com sucesso!")
            }).catch(erro => {
                if(erro.response.data.mensagemUsuario){
                    error(erro.response.data.mensagemUsuario)
                }else{
                    error("Erro ao cadastrar!")
                }
            })
        }
    }
    const deletar = (idLista,item) => {
        if(validacoes(item.nome)){
            itemService.deletar(item.id,item).then(response => {
                buscar(idLista)
                success("Item deletado com sucesso!")
            }).catch(erro => {
                if(erro.response.data.mensagemUsuario){
                    error(erro.response.data.mensagemUsuario)
                }else{
                    error("Erro ao cadastrar!")
                }
            })
        }
    }
    const criarItem = () => {
        if(validacoes(item.nome, "Nome é obrigatório!")){
            if(values.id == null){
                if(validacoes(values.nome, "Titulo é obrigatório!")){
                    service.cadastrar(values).then(response => {
                        const idLista = response.data.id;
                        // montarLista(response.data)
                        itemService.cadastrar(idLista,item).then(response => {
                            buscar(idLista);
                            success("Lista atualizada com sucesso!")
                        }).catch(erro => {
                            if(erro.response.data.mensagemUsuario){
                                error(erro.response.data.mensagemUsuario)
                            }else{
                                error("Erro ao cadastrar!")
                            }
                        })
                    }).catch(erro => {
                        if(erro.response.data.mensagemUsuario){
                            error(erro.response.data.mensagemUsuario)
                        }else{
                            error("Erro ao cadastrar!")
                        }
                    });
                }
            }else{
                itemService.cadastrar(values.id,item).then(response => {
                    buscar(values.id);
                    success("Lista atualizada com sucesso!")
                }).catch(erro => {
                    if(erro.response.data.mensagemUsuario){
                        error(erro.response.data.mensagemUsuario)
                    }else{
                        error("Erro ao cadastrar!")
                    }
                })
            }

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
    
    const montarItens = (idLista,itens) => {
        const listaItens = new Array();
        itens.map(item => {
            listaItens.push({
                id:item.id,
                nome:<TextField id="nome" label="" defaultValue={item.nome} type="search" variant="standard" onChange={e => item.nome = e.target.value}/>,
                produto:<TextField id="produto" label="" defaultValue={item.produto} type="search" variant="standard" onChange={e => item.produto = e.target.value}/>,
                acoes:   
                <>
                    <a className="mr-2" id={item.id}
                    onClick={e => atualizarItem(idLista,item)}>
                        <EditIcon />
                    </a>
                    <a className="mr-2" id={item.id}
                    onClick={e => deletar(idLista,item)}>
                        <DeleteIcon />
                    </a>
                  </>  
            });
        });
        return listaItens;
    }

    const iniciar = () => {
        if(location.state){
            setTitulo('Editar Lista');
            buscar(location.state.id)
        }else{            
            setTitulo('Criar Lista')
        }
    }

    useEffect(()=> {
        iniciar();
    },[]);

    return {
        aberta:aberta,
        tipoLista:tipoLista,
        values:values,
        titulo:titulo,
        data:{
            columns:colunms,
            rows:values.itens
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
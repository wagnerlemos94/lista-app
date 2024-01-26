
import qs from 'qs';
import UsuarioResource from '../../services/controllers/UsuarioResource';
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from "react";

import { error } from '../../components/Toast';

const useContainer = () => {
    
    const navigate = useNavigate();
    const service = new UsuarioResource();


    const inicialState = {
        login:"",
        senha:""
    }

    const [value, setValue] = useState(inicialState); 

    const login = (form) => {
        const username = form.login.replace(/[^\d]+/g,'');
        const body = {
            grant_type:"password",
            username: username,
            password: form.senha,
        }

        service.login(body).then(response => {
            const data = response.data;
            console.log(data)
            localStorage.setItem('usuarioLogado', JSON.stringify(data));
            localStorage.setItem('token', JSON.stringify(data.access_token));
            navigate('/lista');
        }).catch(erro => {
            error("Usuario ou senha inválido");
        });        
    }

    const cadastroUsuario = () => {
        navigate('/usuarios/formulario', {cadastrese: true});
    }

    useEffect(()=> {
        setValue(inicialState);
    },[]);

    return {
        form:value,
        functions: {
            login,
            setValue,
            cadastroUsuario
        } 
    }
}

export default useContainer;
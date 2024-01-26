import React from "react";
import InputMask from 'react-input-mask';
import "./index.css";

import { Typography, TextField, Button, Container, Box } from '@mui/material/';

import useContainer from "./container";  

const Login = () => {
    const {
        functions,
        form
    } = useContainer();

   
    return (
        <>
            <div className="body">
                <Container sx={{ width: '40%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Container sx={{ width: '590px', padding: '60px 55px 33px 55px', border: 'none', borderRadius: '5px', display: 'grid', backgroundColor: '#fff' }}>
                        <Typography sx={{ textAlign: "center", mt: "10px", mb: "10px", alignItems: "center", backgroundColor: '#fff', fontSize: '20px' }}  ><strong>Bem - Vindo</strong></Typography>
                        <InputMask mask="999.999.999-99" value={form.login} onChange={e => functions.setValue(prevState => {return { ...prevState, login: e.target.value }})}>{() =><TextField sx={{ mb: '15px'}} fullWidth id="outlined-basic" label="000.000.000-00" variant="outlined"
                        />}</InputMask>
                        <TextField fullWidth id="outlined-basic" label="Senha do Portal da Rede" type="password" variant="outlined" onChange={e => functions.setValue(prevState => {return { ...prevState, senha: e.target.value }})}  />                        
                        <Button variant="contained" color="info" fullWidth sx={{ mt: '15px', mb: '15px', backgroundColor: '#0073AE' }} onClick={(e) => functions.login(form)} >Logar</Button>
                    </Container>
                </Container>
            </div>
        </>
    );
}

export default Login;
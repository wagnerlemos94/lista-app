import { Button, Container, Typography } from "@mui/material";
import { botao, container1, container2, container3e4, texto1, texto2 } from "./style";

const AccessDenied = () => {    

    const redirectHome = () => {
        window.location.href = '/'
    }
    return (
        <div>
            <Container sx={container1}>
                <Container sx={container2}>
                    <Container sx={container3e4}>
                    </Container>
                    <Typography sx={texto1} variant="h4">
                        404
                    </Typography>
                    <Typography sx={texto2} variant="h6"><b>Acesso negado! Clique no botão abaixo e faça login novamente.</b></Typography>
                    <Container sx={container3e4}>
                        <Button variant="contained" color="info" fullWidth sx={botao} onClick={() => redirectHome()} >Acessar</Button>
                    </Container>
                </Container>
            </Container>
        </div>
    );

}




export default AccessDenied;
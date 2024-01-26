import ApiResource from "./apiResource";

class UsuarioResource extends ApiResource{
    constructor(){
        super('/usuario');
    }

    login(body){
        return this.logar(body);
    }

    listar(){
        return this.get("/",``);
    }

    buscarPorLogin(urlParam){
        return this.get(`/login?login=${urlParam}`,``);
    }

    atualizar(id,body){
        return this.put(`/${id}`,body);
    }

    cadastrar(body){
        return this.post(`/`,body);
    }

    cadastrarUsuarioCadastro(body){
        return this.postUsuarioCadastro(``,body);
    }

    atualizarStatus(urlParam){
        return this.put(`/atualizarStatus${urlParam}`,"");
    }
}

export default UsuarioResource;
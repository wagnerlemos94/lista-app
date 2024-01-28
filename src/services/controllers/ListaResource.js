import ApiResource from "./apiResource";

class UsuarioResource extends ApiResource{
    constructor(){
        super('/lista');
    }

    listar(){
        return this.get("/",``);
    }

    buscar(id){
        return this.get(`/${id}`,``);
    }

    assinar(id, body){
        return this.put(`/assinar/${id}`,body);
    }

    atualizar(id,body){
        return this.put(`/${id}`,body);
    }

    cadastrar(body){
        return this.post(`/`,body);
    }

    atualizarStatus(urlParam){
        return this.put(`/atualizarStatus${urlParam}`,"");
    }
}

export default UsuarioResource;
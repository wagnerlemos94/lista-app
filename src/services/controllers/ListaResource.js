import ApiResource from "./apiResource";

class ListaResource extends ApiResource{
    constructor(){
        super('/lista');
    }

    listar(){
        return this.get("/",``);
    }

    buscar(id){
        return this.getpublic(`/${id}`,``);
    }

    assinar(id, body){
        return this.putpublic(`/assinar/${id}`,body);
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

export default ListaResource;
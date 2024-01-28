import ApiResource from "./apiResource";

class ItemResource extends ApiResource{
    constructor(){
        super('/item');
    }

    listar(){
        return this.get("/",``);
    }

    buscar(id){
        return this.get(`/${id}`,``);
    }
    
    atualizar(id,body){
        return this.put(`/${id}`,body);
    }
    
    cadastrar(idLista,body){
        return this.post(`/${idLista}`,body);
    }
    deletar(id){
        return this.delete(`/${id}`,``);
    }
}

export default ItemResource;
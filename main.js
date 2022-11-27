class Nodo{
    constructor(simbolo){
        this.simbolo = simbolo;
        this.hijoDerecha = null;
        this.hijoIzquierda = null;
        this.next = null;
        this.before = null;
    }
}
class Arbol{
    constructor(){
        this.raiz = null;
        this.resultado = "";
    }

    preOrder(){
        this.resultado= "";
        if(this.raiz == null)
            console.log("");
        else
            this.preOrderRecursiva(this.raiz);
        return this.lista;
    }

    preOrderRecursiva(nodoX){
        this.resultado += `${nodoX.simbolo}`;
        if(nodoX.hijoIzquierda != null)
            this.preOrderRecusiva(nodoX.hijoIzquierda);
        if(nodoX.hijoDerecha != null)
            this.preOrderRecursiva(nodoX.hijoDerecha);
    }

    postOrder(){
        this.resultado= "";
        if(this.raiz == null)
            console.log("");
        else
            this.postOrderRecursiva(this.raiz);
        return this.resultado;
    }

    postOrderRecursiva(nodoX){
        this.resultado += `${nodoX.simbolo}`;
        if(nodoX.hijoIzquierda != null)
            this.postOrderRecursiva(nodoX.hijoIzquierda);
        if(nodoX.hijoDerecha != null)
            this.postOrderRecursiva(nodoX.hijoDerecha);
    }
}






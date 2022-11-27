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
        return this.resultado;
    }

    preOrderRecursiva(nodoX){
        this.resultado += `${nodoX.simbolo}`;
        if(nodoX.hijoIzquierda != null)
            this.preOrderRecursiva(nodoX.hijoIzquierda);
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

class Lista{
    constructor(){
        this.first = null;
        this.last = null;
    }

    agregar(nuevo){
        if(this.first == null){
            this.first = nuevo;
            this.last = nuevo;
        }
        else{
            nuevo.before = this.last;
            this.last.next = nuevo;
            this.last = nuevo
        }
    }

    crearArbol(){ //Creación del arbol
        let aux = this.first;
        while(aux){
            //Condición de jerarquía con potencia.
            if((aux != null) && ((aux.simbolo == "^"))){
                aux.hijoIzquierda = aux.before;
                aux.hijoDerecha = aux.next;
                aux.next = aux.next.next;
                aux.before = aux.before.before;
                if(aux.before != null)
                    aux.before.next = aux;
                if(aux.next != null)
                    aux.next.before=aux
            }
            aux = aux.next;
        }
        aux = this.first;
        while(aux){
            //Condición de jerarquía con divisón y multiplicación.
            if((aux.simbolo == "/") || (aux.simbolo == "*")){
                aux.hijoIzquierda = aux.before;
                aux.hijoDerecha = aux.next;
                aux.next = aux.next.next;
                aux.before = aux.before.before;
                if(aux.before != null)
                    aux.before.next = aux;
                if(aux.next != null)
                    aux.next.before=aux
            }
            aux = aux.next;
        }
        aux = this.first;
        while(aux){
            // Condición de jerarquía con resta y suma.
            if((aux.simbolo == "-") || (aux.simbolo == "+")){
                aux.hijoIzquierda = aux.before;
                aux.hijoDerecha = aux.next;
                aux.next = aux.next.next;
                aux.before = aux.before.before;
                if(aux.before != null)
                    aux.before.next = aux;
                if(aux.next != null)
                    aux.next.before = aux;    
            }
            if(aux.next == null)
                return aux;
            aux = aux.next;
        }
    }
}





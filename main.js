class Nodo{
    constructor(simbolo){
        this.simbolo = simbolo;
        this.hijoDerecha = null;
        this.hijoIzquierda = null;
        this.next = null;
        this.before = null;
    }
}
class ArbolBinario{
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
        if(nodoX.hijoIzquierda != null)
            this.postOrderRecursiva(nodoX.hijoIzquierda);
        if(nodoX.hijoDerecha != null)
            this.postOrderRecursiva(nodoX.hijoDerecha);
        this.resultado += `${nodoX.simbolo}`;
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

class Analisis{
    convertirResultado(exp,resultado){
        for (let i=0; i<exp.length ;i++) {
            let nodo = new Nodo(exp[i])
            resultado.agregar(nodo)
        }
    }
}

//Expresión que deseee.
let expresion = "3-1";

//NO MOVER, NECESARIO PARA FUNCIONAR
let arbolbinario = new ArbolBinario(); // Creamos el arbol binario.
let lista = new Lista(); // Creamos la lista.
let analisis = new Analisis(); // Creamos el analisis.
analisis.convertirResultado(expresion,lista); // Convertimos la expresión a una lista doble enlazada.
arbolbinario.raiz = lista.crearArbol(); // La raíz del arbol binario es igual a crear arbol, empezamos la creación del arbol desde la raíz.
let preOrder = arbolbinario.preOrder(); // Creamos el preOrder y lo guardamos en una variable.
let postOrder = arbolbinario.postOrder(); // Creamos el postOrder y lo guardamos en una variable.
console.log("preOrder: " + preOrder + "."); // Imprimimos el preOrder.
console.log("postOrder: " + postOrder + "."); // Imprimimos el postOrder.
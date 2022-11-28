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
    convertirExpresion(expresion, lista){
        for (let i=0; i<expresion.length ;i++) {
            let nodo = new Nodo(Array.from(expresion)[i])
            lista.agregar(nodo);
        }
    }

    acomodo(expresionOrder){
        let vectorOrder = Array.from(expresionOrder); // Convertimos la expresión Order a array.
        let numeros = [];
        if(vectorOrder[0] == "+" || 
        vectorOrder[0] == "-" || 
        vectorOrder[0] == "*" || 
        vectorOrder[0] == "/" || 
        vectorOrder[0] == "^"){ 
            // Si la primera posición es igual a alguna operación.
            // Es decir que es preOrder.
            while(vectorOrder.length != 0) {
                // Eliminamos la ultima posición del Order en array y lo guardamos en la variable temp.
                let temp = vectorOrder.pop();
                if(temp != "+" && 
                temp != "-" && 
                temp != "*" && 
                temp != "/" &&
                temp != "^")
                    // Si es un número lo convertimos a entero y lo metemos al array numeros.
                    numeros.push(parseInt(temp));
                else{
                    // Si no es número guardamos las ultimas dos posiciones en un nuevo array.
                    // Así aplicaremos la operación entre las dos posiciones.
                    // pos0 + pos1, pos0 - pos1, pos0 * pos1, pos0 / pos1, pos0 ** pos1.
                    let nums = [numeros.pop(),numeros.pop()];
                    if(temp == "+")
                        numeros.push(nums[0]+nums[1]);
                    if(temp == "-")
                        numeros.push(nums[0]-nums[1]);
                    if(temp == "*")
                        numeros.push(nums[0]*nums[1]);
                    if(temp == "/")
                        numeros.push(nums[0]/nums[1]);
                    if(temp == "^")
                        numeros.push(nums[0]**nums[1]);
                }
            }
        }
        return numeros[0];
    }
}

//Expresión que deseee.
let expresion = "2*3*4/8-4*3/6-9/3*6/2^2";

//NO MOVER, NECESARIO PARA FUNCIONAR
let arbolbinario = new ArbolBinario(); // Creamos el arbol binario.
let lista = new Lista(); // Creamos la lista.
let analisis = new Analisis(); // Creamos el analisis.
analisis.convertirExpresion(expresion,lista); // Convertimos la expresión a una lista doble enlazada.
arbolbinario.raiz = lista.crearArbol(); // La raíz del arbol binario es igual a crear arbol, empezamos la creación del arbol desde la raíz.
let preOrder = arbolbinario.preOrder(); // Creamos el preOrder y lo guardamos en una variable.
let postOrder = arbolbinario.postOrder(); // Creamos el postOrder y lo guardamos en una variable.
console.log(`Expresión: ${expresion}`);
console.log("--------------------------------------------------------------------------");
console.log(`preOrder: ${preOrder}.`); // Imprimimos el preOrder.
console.log(`postOrder: ${postOrder}.`); // Imprimimos el postOrder.
console.log("--------------------------------------------------------------------------");
// Resultado de la expresión en base al preOrder.
console.log(`Resultado en preOrder: ${analisis.acomodo(preOrder)}.`)
// Resultado de la expresión en base al postOrder.
console.log(`Resultado en postOrder: ${analisis.acomodo(postOrder)}.`)
class Nodo{
    constructor(dato){
        this.dato = dato;
        this.hijoDerecha = null;
        this.hijoIzquierda = null;
    }
}
class ArbolBinario{
    constructor(expresion){
        this.raiz = null;
        this.resultado = "";
        this.expresion = expresion;
        this.expresionVector = new Array(); 
        for (let i = 0; i < expresion.length; i++) { 
            this.expresionVector.push(new Nodo(expresion[i]))     
        }
    }

    crearArbol(){ //Creación del arbol
        let aux = this.expresionVector[0];
        for(let i=0; aux;){
            //Condición de jerarquía con potencia.
            if((aux != null) && ((aux.dato == "^"))){
                aux.hijoIzquierda = this.expresionVector[i - 1];
                aux.hijoDerecha = this.expresionVector[i + 1];
                this.expresionVector.splice(i + 1, 1);
                this.expresionVector.splice(i - 1, 1);
            }
            i++;
            aux = this.expresionVector[i];
        }
        aux = this.expresionVector[0];
        for(let i=0; aux;){
            //Condición de jerarquía con divisón y multiplicación.
            if((aux.dato == "/") || (aux.dato == "*")){
                aux.hijoIzquierda = this.expresionVector[i - 1];
                aux.hijoDerecha = this.expresionVector[i + 1];
                this.expresionVector.splice(i + 1, 1);
                this.expresionVector.splice(i - 1, 1);
                i--;
            }
            i++;
            aux = this.expresionVector[i];
        }
        aux = this.expresionVector[0];
        for(let i=0; aux;){
            // Condición de jerarquía con resta y suma.
            if((aux.dato == "-") || (aux.dato == "+")){
                aux.hijoIzquierda = this.expresionVector[i - 1];
                aux.hijoDerecha = this.expresionVector[i + 1];
                this.expresionVector.splice(i + 1, 1);
                this.expresionVector.splice(i - 1, 1); 
                i--;  
            }
            i++;
            aux = this.expresionVector[i];
        }
        this.raiz = this.expresionVector[0];
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
        this.resultado += `${nodoX.dato}`;
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
        this.resultado += `${nodoX.dato}`;
    }
}

function acomodo(expresionOrder){
    let vectorOrder = Array.from(expresionOrder); // Convertimos la expresión Order a array.
    let resultado = [];
    if(vectorOrder[0] == "+" || 
        vectorOrder[0] == "-" || 
        vectorOrder[0] == "*" || 
        vectorOrder[0] == "/" || 
        vectorOrder[0] == "^"){ 
        // Si la primera posición es igual a alguna operación.
        // Es decir que es preOrder.
        while(vectorOrder.length) {
            // Eliminamos la ultima posición del Order en array y lo guardamos en la variable aux.
            // Esto porque las ultimas posiciones siempre son números cuando es preOrder.
            let aux = vectorOrder.pop();
            if(aux == "+" ||
               aux == "-" ||
               aux == "*" ||
               aux == "/" ||
               aux == "^"){
                // Si no es número guardamos las ultimas dos posiciones en un nuevo array.
                // También eliminamos dichas posiciones del array resultado.
                // Así aplicaremos la operación entre las dos posiciones.
                // pos0 + pos1, pos0 - pos1, pos0 * pos1, pos0 / pos1, pos0 ** pos1.
                let par = [resultado.pop(), resultado.pop()];
                if(aux == "+")
                    resultado.push(par[0] + par[1]);
                if(aux == "-")
                    resultado.push(par[0] - par[1]);
                if(aux == "*")
                    resultado.push(par[0] * par[1]);
                if(aux == "/")
                    resultado.push(par[0] / par[1]);
                if(aux == "^")
                    resultado.push(par[0] ** par[1]);
            }else
                // Si es un número lo convertimos a entero y lo metemos al array resultado.
                resultado.push(parseInt(aux));
        }
    }else{ // Si la primera posición NO es una operación.
           // Es decir que es postOrder.
        while(vectorOrder.length) {
            // Eliminamos la primera posición del Order en array y lo guardamos en la variable aux.
            // Esto porque las primeras posiciones siempre son números cuando es postOrder.
            let aux = vectorOrder.shift();
            if(aux == "+" ||
               aux == "-" ||
               aux == "*" ||
               aux == "/" ||
               aux == "^"){
                // Si no es número guardamos las ultimas dos posiciones en un nuevo array.
                // También eliminamos dichas posiciones del array resultado.
                // Así aplicaremos la operación entre las dos posiciones.
                // pos1 + pos0, pos1 - pos0, pos1 * pos0, pos1 / pos0, pos1 ** pos0.
                let par = [resultado.pop(), resultado.pop()];
                if(aux == "+")
                    resultado.push(par[1] + par[0]);
                if(aux == "-")
                    resultado.push(par[1] - par[0]);
                if(aux == "*")
                    resultado.push(par[1] * par[0]);
                if(aux == "/")
                    resultado.push(par[1] / par[0]);
                if(aux == "^")
                    resultado.push(par[1] ** par[0]);
            }else
                // Si es un número lo convertimos a entero y lo metemos al array resultado.
                resultado.push(parseInt(aux));
        }
    }

    return resultado;
}

//Expresión que deseee, si va a ingresar una es necesario comentar todas las expresiones de ejemplo.
let expresion = "";

//Expresiones de ejemplo.
expresion = "2*3*4/8-4*3/6-9/3*6/2^2";
//expresion = "2*8+4+3-2*9/6-3*4/2/2";
//expresion = "3-4*2-6*3/9+6";
//expresion = "1+3^2";
//expresion = "3*3^3";

//NO MOVER, NECESARIO PARA FUNCIONAR
// Creamos la clase ArbolBinario y convertimos la expresión a array.
let arbolbinario = new ArbolBinario(expresion);
arbolbinario.crearArbol(); // Creamos el arbol binario.
let preOrder = arbolbinario.preOrder(); // Creamos el preOrder y lo guardamos en una variable.
let postOrder = arbolbinario.postOrder(); // Creamos el postOrder y lo guardamos en una variable.
console.log(`Expresión: ${expresion}`); // Mostramos la expresión ingresada.
console.log("--------------------------------------------------------------------------");
console.log(`preOrder: ${preOrder}`); // Imprimimos el preOrder.
console.log(`postOrder: ${postOrder}`); // Imprimimos el postOrder.
console.log("--------------------------------------------------------------------------");
// Resultado de la expresión en base al preOrder.
console.log(`Resultado en preOrder: ${acomodo(preOrder)}`);
// Resultado de la expresión en base al postOrder.
console.log(`Resultado en postOrder: ${acomodo(postOrder)}`);
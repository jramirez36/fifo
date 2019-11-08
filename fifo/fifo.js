class Administracion 
{
    constructor(tabla) 
    {
        //variables
        this._tabla = tabla;
        this._contador = 300;
        this._listaProcesos;
        //sumador sirve para tener la suma de todas las tareas de los procesos
        this.sumador = 0;
        //contadorEspera sirve para tener un conteo de cuantos ciclos en espera entan 
        this.contadorEspera = 0;
        //ContadorVacio sirve para ver cuantas veces a estado vacio nuestro procesador
        this.contadorvacio = 0;
        //ContadorCompletados sirve para ver cuantos procesos hecmos completado
        this.contadorCompletados = 0;

    }
    iniciar() 
    {   
        this._listaProcesos = new Proceso();
        // hacemos que nuestro lista almacene nuestro objeto el cual seria proceso
        //almismo tiempo declaramos 2 auxiliares uno en el cual estaremos almacenando todos los procesos y otro el cual usaremos para ir completando los procesos
        let aux = this._listaProcesos;
        let aux2 = this._listaProcesos;
        // usaremos la clase probabilidades la cual solo sirve para sacar cantiodad de tareas y la probabilidad de nuevo proceso
        let probabilidad = new Probabilidades();
        //declaramos un ciclo el cual se ejecutara 300 veces
        for(var i = 0; i < 300; i++)
        {
            console.log("Ciclo: "+ (i+1));
            // de ser la primera posicion este se agregara de forma automatica
            if(i === 0)
            {
                //estamos llamando el get de la clase probabilidades dado que guardamos una funcion en el
                aux._cantidadTareas = probabilidad.cantidadTareas;
                //al mismo tiempo vamos almacenando el valor en el sumador
                this.sumador = this.sumador + aux._cantidadTareas;
            }
            if(probabilidad.probabilidadNuevoProceso === 1)
            {
                // este if es cuando un nuevo proceso es activado y da inicio a un conteo en contadorEspera
                this.contadorEspera++;
                // declaramos que el ._siguiente es un objeto con sus respectivas caracteristicas para que comienze a almacenar informacion
                aux._siguiente = new Proceso();
                // guardamos en su apartado de cantidad de tareas lo que por suerte le salio
                aux._siguiente._cantidadTareas = probabilidad.cantidadTareas;
                // y hacemos su respectiva sumado
                this.sumador = this.sumador + aux._cantidadTareas;
                console.log("nuevo proceso agregado tiene: " + aux._cantidadTareas + " Tareas");
                //movemos el aux para que ahora sea aux._siguiente y podamos seguir almacenando nuevos procesos
                aux = aux._siguiente;
            }
            // este if se ejecuta cuando se an acabado las tareas de nuestro proceso y si nuestro contador de espera dice que tenemos procesos en nuestra lista de espera
            if(aux2._cantidadTareas <= 0 && this.contadorEspera >= 1)
            {
                //y vamos aumentando nuestro contador de completados para tener un control al mismo tiempo movemos nuestro aux2 el cual es independiente de aux para haci comenzar a trabajar con el siguiente proceso
                this.contadorCompletados++;
                aux2 = aux2._siguiente;
                // y le restamos 1 al contador de espera dado que se comenzaria a ejecutar uno de los procesos
                this.contadorEspera--;
            }
            // este if solo se ejecutara si no hay tareas en nuestro proceso ni procesos en la lista de espera
            if(aux2._cantidadTareas <= 0 && this.contadorEspera === 0)
            {
                this.contadorvacio++;
            }
            this.proceso(aux2);
        }
    }
    proceso(aux2)
    {
        // mandamos a imprimir nuestra informacion 
        this.impresion(aux2)
        // actualizamos nuestro sumador y nuestra cantidad de tareas
        this.sumador = this.sumador -1;
        aux2._cantidadTareas = aux2._cantidadTareas-1;
    }
    impresion(aux2) 
    {
        console.log("cantidad de tareas restantes: " + aux2._cantidadTareas);
        console.log("Procesos en cola: " + this.contadorEspera + " Suma de tareas totales faltantes: " + this.sumador);
        console.log("Cantidad de veces que a estado vacio: " + this.contadorvacio);
        console.log("Procesos completados: " + this.contadorCompletados);
    }
}
        class Proceso
        {
            constructor(siguiente = null)
            {
                this._cantidadTareas;
            }
            get cantidadTareas()
            {
                return this._cantidadTareas;
            }
        }
        //impreciones
        class Probabilidades
        {
            constructor()
            {
            }
            get probabilidadNuevoProceso()
            {
                let probabilidad = Math.trunc(Math.random() * 100 + 1);

                if(probabilidad <= 39)
                {
                    probabilidad = 1;
                }
                return probabilidad;
            }
            get cantidadTareas()
            {
                let cantidad = Math.trunc(Math.random() * 10 + 4);
                return cantidad;
            }
        }
//botones
var simulacion = new Administracion(document.querySelector('#tablasimulacion'));
document.querySelector('#iniciar').addEventListener('click', () => {
    simulacion.iniciar();
});
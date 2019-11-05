class Administracion 
{
    constructor(tabla) 
    {
        this._tabla = tabla;
        this._contador = 300;
        this._listaProcesos;
    }
    iniciar() 
    {   
        this._listaProcesos = new lista();
        let aux = this._listaProcesos;
        let aux2 = this._listaProcesos;
        let probabilidad = new Probabilidades();
        let contadorEspera = 0;
        let contadorvacio = 0;
        let contadorCompletados = 0;
        for(var i = 0; i < 300; i++)
        {
            console.log(i)
            if(i === 0)
            {
                aux._cantidadTareas = probabilidad.cantidadTareas;
            }
            this.proceso(contadorEspera, aux2, contadorvacio, contadorCompletados);
            if(probabilidad.probabilidadNuevoProceso === 1)
            {
                contadorEspera++;
                aux._cantidadTareas = probabilidad.cantidadTareas;
                aux._siguiente = new lista();
                aux = aux._siguiente;
            }
            if(aux2._cantidadTareas <= 0 && contadorEspera >= 1)
            {
                contadorCompletados++;
                aux2 = aux2._siguiente;
                contadorEspera--;
            }
            if(aux2._cantidadTareas <= 0 && contadorEspera === 0)
            {
                contadorvacio++;
            }
        }
    }
    proceso(contadorEspera, aux2, contadorvacio, contadorCompletados)
    {
        let sumador = 0;
        let aux3 = aux2;
        aux2._cantidadTareas = aux2._cantidadTareas-1;
            this.impresion(aux2)
            for(let i = 0; i < contadorEspera; i++)
            {
                sumador = sumador + aux3._cantidadTareas;
                aux3 = aux3._siguiente;
            }
            console.log("Procesos en cola: " + contadorEspera + " Suma de tareas totales faltantes: " + sumador);
            console.log("Cantidad de veces que a estado vacio: " + contadorvacio);
            console.log("Procesos completados: " + contadorCompletados);
    }
    impresion(aux2) 
    {
        console.log(aux2.toString());
    }
}
        class lista
        {
            constructor(siguiente = null)
            {
                this._cantidadTareas;
            }
            get cantidadTareas()
            {
                return this._cantidadTareas;
            }
            toString()
            {
                return "cantidad de tareas restantes: " + Number(this._cantidadTareas);
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
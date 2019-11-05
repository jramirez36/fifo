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
        for(var i = 0; i < 300; i++)
        {
            console.log(i)
            if(i === 0)
            {
                aux._cantidadTareas = probabilidad.cantidadTareas;
            }
            this.proceso(contadorEspera, aux2);
            if(probabilidad.probabilidadNuevoProceso === 1)
            {
                contadorEspera++;
                aux._cantidadTareas = probabilidad.cantidadTareas;
                aux._siguiente = new lista();
                aux = aux._siguiente;
            }
            if(aux2._cantidadTareas <= 0 && contadorEspera >= 1)
            {
                aux2 = aux2._siguiente;
                contadorEspera--;
            }
        }
    }
    proceso(contadorEspera, aux2)
    {
        aux2._cantidadTareas = aux2._cantidadTareas-1;
        console.log("aqui "+ aux2._cantidadTareas);
            this.impresion(aux2)
            console.log("Procesos en cola: " + contadorEspera)
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
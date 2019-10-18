//funciones nuevas push sirve para subir algo a una cadena , pop elimina el ultimo elemento de un array
class articulo {
    constructor(tabla, llave) 
    {
        this._lista = 0;
        this._tabla = tabla;
        this._llave = llave;
        this._contador = 0;
        this._final;
    }
    agregar(ubicacion, nombre, precio, cantidad, descripcion, llave) 
    {   
        if(this._contador <= 20)
            { 
                let aux = 0;
                if (ubicacion === '' || ubicacion === (this._contador + 1).toString()) 
                {
                    this._llave = llave;
                    aux = this._lista;
                    if(this._contador === 0)
                    {
                        this._lista = new producto(this._llave, nombre, precio, cantidad, descripcion);
                    }
                    else
                    {
                        while(aux._siguiente != null)
                            {
                                aux = aux._siguiente;
                            }
                            aux._siguiente = new producto(this._llave, nombre, precio, cantidad, descripcion);
                            aux._siguiente._anterior = aux;
                            this._final =  aux._siguiente;
                    }
                    this._contador++;
                    this._llave++;
                    alert('articulo agregado');
                } 
                else if (Number(ubicacion) > 0 && Number(ubicacion) < this._contador) 
                {
                    aux = this._lista;
                    let auxc = 1;
                    while(ubicacion > auxc+1)
                    {
                        aux = aux._siguiente;
                        auxc++;
                    }
                    let aux2 = new producto(this._llave, nombre, precio, cantidad, descripcion);
                    aux2._siguiente = aux._siguiente;
                    aux2._anterior = aux;
                    aux._siguiente = aux2;
                    this._contador++;
                    this._llave++;
                    alert('articulo agregado correctamente');
                } 
                else
                {
                    alert('Posicion no válida');
                }
                this.impresion();
            }
        else
        {
            alert('inventario lleno');
        }
    }
    buscar(codigo) 
    {
        let buscador;
        codigo = Number(codigo);
        let aux = this._lista;
            if (aux._codigo === codigo) 
                {
                    buscador = this._lista;
                    alert('Articulo encontrado. ');
                }
            else
                {
                    while(aux._codigo != codigo)
                    {
                        aux = aux._siguiente;
                    }
                    if(aux._codigo === codigo)
                    {
                        buscador = aux;
                        alert('Articulo encontrado. ');
                    }
                    else
                    {
                        alert('Articulo no encontrado. ');
                    }
                }
            return buscador;
    }
    eliminar(codigoEliminar) 
    {
        codigoEliminar = Number(codigoEliminar);
        if (this.revision(codigoEliminar) === 1) 
        {
            let aux = this._lista;
            if(aux._codigo === codigoEliminar)
            {
                this._lista = aux._siguiente;
            }
            else
            {
                while(aux._siguiente != null && aux != undefined )
                {
                    if(aux._siguiente._codigo === codigoEliminar)
                        {
                            console.log("llegue a eliminar");
                            aux._siguiente = aux._siguiente._siguiente;
                        }
                        aux = aux._siguiente;
                }
            }
            alert('Se ha eliminado el articulo correctamente');
        } 
        else 
        {
            alert('El código ingresado no existe, por favor verifique de nuevo');
        }
        this.impresion();
    }
    revision(codigo) {
        codigo = Number(codigo);
        let revisor = -1;
        let aux = this._lista;
            if (aux._codigo === codigo) 
                {
                    revisor = 1;
                }
            else
                {
                    while(aux._codigo != codigo && aux.codigo != null)
                    {
                        aux = aux._siguiente;
                    }
                    if(aux._codigo === codigo)
                    {
                        revisor = 1;
                    }
                }
            return revisor;
    }
    impresion() {
        this._tabla.innerHTML = '';
        let etiquetaP = [];
        let aux = this._lista;
        let auxc = 0;
        for (let i = 0; i < this._contador; i++) 
        {
            etiquetaP[i] = document.createElement('p');
        }
        while(auxc === 0 || aux != null && auxc < this._contador)
            {
                etiquetaP[auxc].innerHTML = aux.toString();
                this._tabla.appendChild(etiquetaP[auxc]);
                auxc++;
                aux = aux._siguiente;
            }
    }
    invertir()
    {
        this._tabla.innerHTML = '';
        let etiquetaP = [];
        let aux = final;
        let auxc = 0;
        for (let i = 0; i < this._contador; i++) 
        {
            etiquetaP[i] = document.createElement('p');
        }
        while(auxc === 0 || aux != null && auxc < this._contador)
            {
                etiquetaP[auxc].innerHTML = aux.toString();
                this._tabla.appendChild(etiquetaP[auxc]);
                auxc++;
                aux = aux._anterior;
            }
    }

    get articulo() 
    {
        return this._lista;
    }
    get llave() 
    {
        return this._llave;
    }
}
//impreciones
class producto{
    constructor(codigo, nombre, precio, cantidad, descripcion, siguiente = null , anterior = null)
    {
        this._codigo = codigo;
        this._nombre = nombre;
        this._precio = precio;
        this._cantidad = cantidad;
        this._descripcion = descripcion;
    }
    get codigo()
    {
        return this._codigo;
    }
    toString()
    {
        return 'Código: ' + this._codigo + ' Nombre: ' + this._nombre + ' Precio: $' + this._precio + ' Cantidad: ' + this._cantidad + ' Descripción: ' + this._descripcion ;
    }
}
//botones
var almacen = new articulo(document.querySelector('#tablaArticulos'), Number(document.querySelector('#codigo').value));
document.querySelector('#agregar').addEventListener('click', () => {
    let llave = Number(document.querySelector('#codigo').value);
    let ubicacion = document.querySelector('#ubicacion').value;
    let nombre = document.querySelector('#nombre').value;
    let precio = document.querySelector('#precio').value;
    let cantidad = document.querySelector('#cantidad').value;
    let descripcion = document.querySelector('#descripcion').value;

    almacen.agregar(ubicacion, nombre, precio, cantidad, descripcion, llave);
    document.querySelector('#codigo').value = almacen.llave;
});
document.querySelector('#buscar').addEventListener('click', () => {
    let buscarArticulo = almacen.buscar(document.querySelector('#buscarCodigo').value);
    document.querySelector('#tablaBuscar').innerHTML = buscarArticulo;
});
document.querySelector('#eliminar').addEventListener('click', () => {
    almacen.eliminar(document.querySelector('#eliminarCodigo').value);
    document.querySelector('#codigo').value = almacen.llave;
});
document.querySelector('#invertir').addEventListener('click', () => {
    almacen.invertir();
});
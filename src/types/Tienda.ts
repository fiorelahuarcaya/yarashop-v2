
    export type ProductoTienda = {
    idProducto: string;
    nombre: string;
    descripcion: string;
    idSubcategoria : string;
    precioCosto: number;
    precioVentaR: number;
    rucProvee : string;
    cantidad: number;
  };

  export type ItemLista = {
    cantidad: number;
    idProducto: string;
    total: number;
  };
  
  export type Venta = {
    fechaHora: string;
    lista: ItemLista[];
  };

  export type Tienda = {
    idTienda: string;
    idBodeguero: string;
    nombreTienda: string;
    ubicacion: string;

    Producto : ProductoTienda[];
    Venta : Venta[];
  }


  
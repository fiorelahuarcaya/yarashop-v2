import type { Timestamp } from "firebase/firestore";

export type ProductoTienda = {
  idProducto: string;
  nombre: string;
  descripcion: string;
  idSubcategoria: string;
  precioCosto: number;
  precioVentaR: number;
  rucProvee: string;
  cantidad: number;
  vendidos: number;
};

export type ItemLista = {
  cantidad: number;
  idProducto: string;
  nombreProducto: string;
  total: number;
};

export type Venta = {
  idVenta: string;
  fechaHora: Timestamp;
  deuda: number;
  nombreCliente: string;
  total: number;
  lista: ItemLista[];
};

export type Tienda = {
  idTienda: string;
  idBodeguero: string;
  nombreTienda: string;
  ubicacion: string;

  Producto: ProductoTienda[];
  Venta: Venta[];
};

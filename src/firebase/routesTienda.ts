import {
  onSnapshot,
  doc,
  query,
  orderBy,
  collection,
  getDoc,
  addDoc,
  updateDoc,
  getDocs,
  where,
  writeBatch,
} from "firebase/firestore";
import type { QuerySnapshot, DocumentData } from "firebase/firestore";

import { db } from "./db";
import type { ProductoTienda, Venta } from "../types/Tienda";

export async function getTiendas(idTienda: string) {
  const tiendas = doc(db, "Tienda", idTienda);
  const docSnap = await getDoc(tiendas);

  return docSnap;
}

export async function getProductoByTienda(idTienda: string) {
  const productsCollection = collection(db, `Tienda/${idTienda}/Producto`);

  const q = query(productsCollection);
  const docsSnap = await getDocs(q);

  return docsSnap;
}

// export async function createVenta(idTienda : string, venta: Venta) {
//     const ventaData: Venta = {
//       ...venta,
//     };

//     return await addDoc(collection(db, `Tienda/${idTienda}/Venta`), ventaData);
//   }

export async function createVenta(idTienda: string, ventaData: Venta) {
  // Get a new write batch
  // const batch = writeBatch(db);
  // Añadir un documento a la colección VENTA
  //
  // Set the "Venta"
  await addDoc(collection(db, `Tienda/${idTienda}/Venta`), ventaData);
  // // Get a new write batch
  const batch = writeBatch(db);

  //     // Set the value of 'NYC'
  //     const productsCollection = collection(db, `Tienda/${idTienda}/Venta`);
  //     const q = query(productsCollection)
  //     const docsSnap = await getDocs(q)

  //     const tiendaRef = doc(db, "Tienda", idTienda);

  //     batch.set(tiendaRef, ventaData);

  //     // // Update the population of 'SF'
  //     // const sfRef = doc(db, "cities", "SF");
  //     // batch.update(sfRef, {"population": 1000000});

  //     // // Delete the city 'LA'
  //     // const laRef = doc(db, "cities", "LA");
  //     // batch.delete(laRef);

  //     // Commit the batch
  //     await batch.commit();

  // Actualizar los documentos de la colección PRODUCTO dentro de la colección TIENDA, cuyos IDs aparezcan en la lista del objeto "Venta"
  ventaData.lista.forEach(async (item) => {
    console.log(item);

    const q = query(
      collection(db, `Tienda/${idTienda}/Producto`),
      where("idProducto", "==", item.idProducto)
    );
    const querySnapshot = getDocs(q);

    let docProducto = (await querySnapshot).docs[0];
    console.log(docProducto.data);
    // batch.update(querySnapshot[0], { "cantidad": - item.cantidad });

    const productRef = doc(db, `Tienda/${idTienda}/Producto`, docProducto.id);
    console.log(productRef);

    await updateDoc(productRef, {
      cantidad: docProducto.data().cantidad - item.cantidad,
      vendidos: docProducto.data().vendidos + item.cantidad,
    });
  });

  // ...
  // commit the batch
  await batch.commit();
}

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

    export async function getVentaByTienda(idTienda: string) {
        const productsCollection = collection(db, `Tienda/${idTienda}/Venta`);
      
        const q = query(productsCollection);
        const docsSnap = await getDocs(q);
      
        return docsSnap;
      }

      export async function getReporteDiarioByTienda(idTienda: string , fecha:string) {
        const productsCollection = collection(db, `Tienda/${idTienda}/Venta`);
      
        const q = query(productsCollection, where("fechaHora", "==",fecha));
        const docsSnap = await getDocs(q);
      
        return docsSnap;
      }
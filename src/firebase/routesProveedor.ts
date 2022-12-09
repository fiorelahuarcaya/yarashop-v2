import {onSnapshot, doc,query, orderBy, collection, getDoc} from "firebase/firestore";
import type { QuerySnapshot, DocumentData } from "firebase/firestore";

import {db} from "./db.js"


export async function getProvee(
    cb: (doc: QuerySnapshot<DocumentData>) => void
  ){
    const proveedrs = collection(db, "Proveedor");
    const q = query(
      proveedrs,
      orderBy("razonSocial", "asc")
    );
    const unsub = onSnapshot(q, (coll) => cb(coll));
    return unsub;
  }
  

// Read a collection from "Proveedor" ID
export async function getProveeByID(proveeId: string
){

  const proveedores = doc(db, "Proveedor", proveeId);
  const docSnap = await getDoc(proveedores);

  return docSnap;
}

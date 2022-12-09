import {onSnapshot, doc,query, orderBy, collection, getDoc} from "firebase/firestore";
import type { QuerySnapshot, DocumentData } from "firebase/firestore";

import {db} from "./db.js"


export async function getSubCat(
    cb: (doc: QuerySnapshot<DocumentData>) => void
  ){
    const subCtgrs = collection(db, "Sub-categoria");
    const q = query(
        subCtgrs,
      orderBy("nombre", "asc")
    );
    const unsub = onSnapshot(q, (coll) => cb(coll));
    return unsub;
  }
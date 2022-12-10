import {
  onSnapshot,
  query,
  orderBy,
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  where,
} from "firebase/firestore";
import type { QuerySnapshot, DocumentData } from "firebase/firestore";
import { db } from "./db.js";
import type { Producto } from "../types/Producto.js";

export async function getProducts(
  cb: (doc: QuerySnapshot<DocumentData>) => void
) {
  const products = collection(db, "Productos");
  const q = query(products, orderBy("nombre", "asc"));
  const unsub = onSnapshot(q, (coll) => cb(coll));
  return unsub;
}

// Read a collection from "Productos" ID
export async function getProductByID(productId: string) {
  const products = doc(db, "Productos", productId);
  const docSnap = await getDoc(products);
  return docSnap;
}

// Add a new document in collection "Productos"
export async function createProduct(product: Producto) {
  const productData: Producto = {
    ...product,
  };
  return await addDoc(collection(db, "Productos"), productData);
}

// Updates a product document in collection "Productos"
export async function editProduct(product: Producto) {
  const productRef = doc(db, "Productos", product.idProducto);
  return await updateDoc(productRef, product);
}

// Delete a product document in collection "Productos"
export async function deleteProduct(idProduct: string) {
  await deleteDoc(doc(db, "Productos", idProduct));
}

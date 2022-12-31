import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "./db"


export async function createUser(email: string, password : string) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    
    console.log(userCredential);
  }

  export async function loginUser(email: string, password : string) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    console.log(userCredential);
  }



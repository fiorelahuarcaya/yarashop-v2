import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";



export async function createUser(email: string, password : string) {

    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
  }

  

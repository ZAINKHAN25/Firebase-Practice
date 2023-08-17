import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore, collection, doc, setDoc, getDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyCA1mnH_3HzQkU9z8q9dlxEYwTLaZ_bEcM",
    authDomain: "fir-practice-1b427.firebaseapp.com",
    projectId: "fir-practice-1b427",
    storageBucket: "fir-practice-1b427.appspot.com",
    messagingSenderId: "1020538838556",
    appId: "1:1020538838556:web:cff3d5853a1c349e2d09d9"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);



const signupemail = document.querySelector('#signupemail')
const signuppassword = document.querySelector('#signuppassword')
const signupbtn = document.querySelector('#signupbtn')
const loginemail = document.querySelector('#loginemail')
const loginpassword = document.querySelector('#loginpassword')
const loginbtn = document.querySelector('#loginbtn')
const currentuserdata = document.querySelector('#currentuserdata')
const signupfirstName = document.querySelector('#signupfirstName')
const signuplastName = document.querySelector('#signuplastName')
const alluserdata = document.querySelector('#alluserdata')


try {
    signupbtn.addEventListener('click', () => {
        createUserWithEmailAndPassword(auth, signupemail.value, signuppassword.value)
            .then(async (userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("User is sign up Succesfully");
                try {
                    console.log(user.uid);
                    // await setDoc(doc(db, "cities", user.uid), {
                    const docRef = await setDoc(doc(db, "users", user.uid), {
                        signupemail: signupemail.value,
                        signuppassword: signuppassword.value,
                        signupfirstName: signupfirstName.value,
                        signuplastName: signuplastName.value
                    });
                    console.log("Document written with ID: ", docRef.id);
                } catch (e) {
                    console.error("Error adding document: ", e);
                }

                signupdiv.innerHTML = '';

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    })

} catch (error) {
    console.log(error);
}

try {
    loginbtn.addEventListener('click', () => {
        signInWithEmailAndPassword(auth, loginemail.value, loginpassword.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("User is logged in succesfully");
                location.href = './dashbord.html'
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });

    })

} catch (error) {
    console.log(error);
}

try {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const uid = user.uid;
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                const { signupemail, signupfirstName, signuplastName } = docSnap.data();
                currentuserdata.innerHTML = `User Name is <b> ${signupfirstName} ${signuplastName} </b> and its email is <b>${signupemail} </b>`
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }

        } else {
            // User is signed out
            // ...
        }
    });

} catch (error) {
    console.log(error);
}

try {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
        alluserdata.innerHTML += `<br /> User name ${doc.data().signupfirstName
            } ${doc.data().signuplastName}`;
    });

} catch (error) {
    console.log(error);
}



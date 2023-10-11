import { initializeApp } from 'firebase/app'
import { 
    getFirestore,
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    where,
    orderBy,
    serverTimestamp,
    updateDoc
} from 'firebase/firestore'

import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCSZp8KByro04VF_9civSEUMcka98RnRYA",
    authDomain: "minh-1a362.firebaseapp.com",
    projectId: "minh-1a362",
    storageBucket: "minh-1a362.appspot.com",
    messagingSenderId: "875221958149",
    appId: "1:875221958149:web:d2d7131e94ca2fadd4266c"
}


// init firebase app
initializeApp(firebaseConfig)

// init services
const db = getFirestore()
const auth = getAuth()

// collection ref
const colRef = collection(db, 'books');

// real-time listener
const addBookForm = document.querySelector('.add')
const q = query(colRef, where('title', '==', 'abc'))

const unsubCol = onSnapshot(colRef, (snapshot) => {
    let books = []
    snapshot.docs.forEach((doc) => {
        books.push({...doc.data(), id: doc.id})
    })
    console.log(books)
})

onSnapshot(q, (snapshot) => {
    let books = []
    snapshot.docs.forEach((doc) => {
        books.push({...doc.data(), id: doc.id})
    })
    console.log(books)
})

addBookForm.addEventListener('submit', e => {
    e.preventDefault()
    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
        createdAt: serverTimestamp()
    })
    .then(() => {
        addBookForm.reset()
    })

})


// deleting documents
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const docRef = doc(db, 'books', deleteBookForm.id.value)
    deleteDoc(docRef)
        .then(() => {
            deleteBookForm.reset()
        })
})

// updating a document
const updateDocumentForm = document.querySelector('.update')
updateDocumentForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'books', updateDocumentForm.id.value)
    updateDoc(docRef, {
        title: 'updated title',
    })
    .then(() => {
        updateDocumentForm.reset()
    })
})

const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = signupForm.email.value
    const password = signupForm.password.value

    createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            console.log('user created:', cred.user)
            signupForm.reset()
        })
        .catch((err) => {
            console.log(err.message)
        })
})

// logout
const logout = document.querySelector('.logout')
logout.addEventListener('click', (e) => {
    e.preventDefault()
    signOut(auth)
        .then(() => {
            console.log('user signed out')
        })
        .catch((err) => {
            console.log(err.message)
        })
})

// login
const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = loginForm.email.value
    const password = loginForm.password.value

    signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            console.log('user logged in:', cred.user)
            loginForm.reset()
        })
        .catch((err) => {
            console.log(err.message)
        })
})

const unsubAuth = onAuthStateChanged(auth, (user) => {
    console.log('user status changed:', user)
})

const unsub = document.querySelector('.unsub')
unsub.addEventListener('click', (e) => {
    console.log('unsubscribed')
    unsubCol()
    unsubAuth()
})
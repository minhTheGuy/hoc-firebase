import { initializeApp } from 'firebase/app'
import { 
    getFirestore,
    collection,
    getDocs

} from 'firebase/firestore'

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

// collection ref
const colRef = collection(db, 'books');

// get collection data
getDocs(colRef)
    .then((snapshot) => {
        let books = []
        snapshot.docs.forEach((doc) => {
            books.push({...doc.data(), id: doc.id})
        })
        console.log(books)
    }) 
    .catch((err) => {
        console.log(err)
    })

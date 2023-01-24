import { useState } from 'react'
import styles from '@/styles/Home.module.css'
import { 
  createUserWithEmailAndPassword,
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut
} from "firebase/auth";
import { auth } from '@/firebase-config';


export default function Home() {

  const [registerEmail, setregisterEmail] = useState("")
  const [registerPassword, setregisterPassword] = useState("")
const [loginEmail, setloginEmail] = useState("")
const [loginPassword, setloginPassword] = useState("")
const [user, setuser] = useState({})

onAuthStateChanged(auth, (currentUser)=>{
  setuser(currentUser)
})
  const register =async() => {
  try {
    const user =await createUserWithEmailAndPassword(
      auth,
      registerEmail,
      registerPassword
    )
    console.log(user)
    console.log(auth)
  } catch (error) {
    console.log(error.message)
  }
      
    
  }
  const login =async() => {
    try {
      const user =await signInWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      )
      console.log(user)
      console.log(auth)
    } catch (error) {
      console.log(error.message)
    }

  }
  const logout =async() => {

    await signOut(auth)
  }
  return (
    <>
    
      <main className={styles.main}>
        <div>
          <h3>register user</h3>
          <input 
            placeholder ="email"
            onChange={(e) =>setregisterEmail(e.target.value)}
          />
          <input 
            placeholder ="password" 
            onChange={(e) =>setregisterPassword(e.target.value)}
          />
          <button onClick={register}>create user</button>
        </div>

        <div>
          <h3>login</h3>
          <input 
             placeholder ="email"
             onChange={(e) =>setloginEmail(e.target.value)}
             />
          <input 
          placeholder ="password"
          onChange={(e) =>setloginPassword(e.target.value)}
          />
          <button onClick={login}>login</button>
        </div>
        <h4>user logged in </h4>
       {user?.email}
        <button onClick={logout}>sign out</button>
      </main>
    </>
  )
}

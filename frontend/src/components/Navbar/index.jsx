 import React from 'react'
 import styles from './style.module.css'
 
  export default function NavBarComponent() {

    const router = useRouter();


   return (
     <div className={styles.container}>
      <nav className={styles.navBar}>
        <h1>ProConnect</h1>
        <div className={styles.navBarOptionContainer }>

            <div onclick={() => {
                router.push("/login")
            }} className={styles.buttonJoin}>
                <p>Be a Part</p>
            </div>
        </div>

      </nav>
     </div>
   )
 }
 

 
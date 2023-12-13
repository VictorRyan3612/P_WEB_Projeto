import React, { useState } from 'react';
import FilmesList from './filmeslist';
import Login from './login'

const Index = () => {
   const [isLoggedIn, setLoggedIn] = useState(false);
   const [userLogged, setUserLogged] = useState({});

   const handleLogout = () => {
      // Defina isLoggedIn como false e redefina as informações do usuário
      setLoggedIn(false);
      setUserLogged({});
   };

   return (
      <div>
         <center>
            <br />
            {isLoggedIn ? (
               <div>
                  <p>Bem Vindo {userLogged.name}</p>
                  <button onClick={handleLogout}>Logout</button>
               </div>
            ) : (
               <Login setLoggedIn={setLoggedIn} setUserLogged={setUserLogged} />
            )}
            <FilmesList />
         </center>
      </div>
   );
};

export default Index;

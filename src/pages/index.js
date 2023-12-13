import React, { useState } from 'react';
import FilmesList from './filmeslist';
import Login from './login'

const Index = () => {
   const [isLoggedIn, setLoggedIn] = useState(false);
   const [userLogged, setuserLogged] = useState({});

   return (
      <div>
         <center>
            <br />
            {isLoggedIn ? (
               <p>Bem Vindo {userLogged.name}</p>
            ) : (
               <Login setLoggedIn={setLoggedIn} setuserLogged={setuserLogged}/>
            )}
            <FilmesList />
         </center>
      </div>
   );
};

export default Index;

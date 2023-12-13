import React, { useState } from 'react';

const Login = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const handleLogin = () => {
      // Lógica de autenticação aqui
      console.log('Usuário:', email, 'Senha:', password);
   };

   return (
      <div>
         <center>
            <a href='/'>
               Voltar
            </a>
            <h2>Login</h2>
            <label>
               Email:
               <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
            </label>
            <br />
            <label>
               Password:
               <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
            </label>
            <br />
            <button onClick={handleLogin}>Login</button>

         </center>
      </div>
   );
};

export default Login
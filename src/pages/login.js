import React, { useState } from 'react';

const Login = ({setLoggedIn, setuserLogged}) => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [notification, setNotification] = useState(null);

   // const users = [{
   //    email: 'contato@',
   //    password: '123456'
   // }];

   const handleLogin = async () => {
      try {
         const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
         });

         const data = await response.json();
         if (response.ok) {
            setLoggedIn(true);
            console.log(data)
            setuserLogged(data)
            setNotification({ type: 'success', message: 'Login bem-sucedido!' });

         } else {
            setNotification({ type: 'error', message: data.message || 'Credenciais inválidas. Por favor, tente novamente.' });
         }
      } catch (error) {
         console.error('Erro ao realizar login:', error);
         setNotification({ type: 'error', message: 'Erro ao tentar realizar login. Por favor, tente novamente mais tarde.' });
      }
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
            {notification && <p style={{ color: notification.type === 'success' ? 'green' : 'red' }}>{notification.message}</p>}
            <button onClick={handleLogin}>Login</button>
         </center>
      </div>
   );
};

export default Login;

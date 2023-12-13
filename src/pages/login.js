import React, { useState } from 'react';

const Login = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [notification, setNotification] = useState(null);

   const users = [{
      email: 'contato@',
      password: '123456'
   }];

   const handleLogin = () => {
      const isValidUser = users.some(user => user.email === email && user.password === password);

      if (isValidUser) {
         // Lógica de autenticação aqui
         setNotification({ type: 'success', message: 'Login bem-sucedido!' });
      } else {
         // Indicar credenciais inválidas
         setNotification({ type: 'error', message: 'Credenciais inválidas. Por favor, tente novamente.' });
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

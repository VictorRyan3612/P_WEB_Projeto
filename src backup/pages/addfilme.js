import * as react from  'react';

const Addfilme = ({isLoggedIn}) =>{
   const [imdId, setimdId] = react.useState('');
   const [title, settitle] = react.useState('');
   const [year, setyear] = react.useState('');
   const [poster, setposter] = react.useState('');

   const handleSubmit = async (e) => {
      e.preventDefault();

      // Aqui você pode fazer a solicitação POST usando fetch ou axios
      try {
      const response = await fetch('http://localhost:3000/api/addfilme', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ imdId, title, year, poster }),
      });

      if (response.ok) {
         console.log('Filme adicionado com sucesso!');
      } else {
         console.error('Erro ao adicionar filme');
      }
      } catch (error) {
      console.error('Erro ao processar solicitação:', error);
      }
   };
   if(isLoggedIn === true){
      return (
         <div>
            <h1>Cadastro de filme</h1>
            <form onSubmit={handleSubmit}>

               <label>imdId: </label>
               <input type="text" name="title" value={imdId} onChange={(e) => setimdId(e.target.value)}  size="40" maxlength="150"/>
               <br/>
               <br/>

               <label>title:  </label>
               <input type="text" name="body" value={title} onChange={(e) => settitle(e.target.value)} size="40" maxlength="150"/>
               <br/>
               <br/>

               <label>  year:  </label>
               <input type="number" name="body" value={year} onChange={(e) => setyear(e.target.value)} size="40" maxlength="150"/>
               <br/>
               <br/>

               <label>poster:  </label>
               <input type="text" name="body" value={poster} onChange={(e) => setposter(e.target.value)}  size="40" maxlength="150"/>
               <br/>
               <br/>

               <input type="submit" name="enviar" value="Salvar"/>
            </form>
         </div>
      )
   }
   else{
      return(
         <div>
            <center>
               <a href="/">
                  Voltar
               </a>
               <h2>
                  Usuario não logado, sem permissao para Adicionar filme
               </h2>
            </center>
         </div>
      )
   }
   
}
export default Addfilme

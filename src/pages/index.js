import React, { useEffect, useState } from 'react';

const Index = () => {
   const [dataMovies, setDataMovies] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
         try {
         const response = await fetch('http://localhost:3000/api/filmes');
         const data = await response.json();
         
         if (data.result) {
            setDataMovies(data.result);
         }
         } catch (error) {
         console.error('Erro ao buscar filmes:', error);
         }
      };

      fetchData();
   }, []);

   return (
      <div>
         <center>
         {/* Validar se não é vazio */}
         {dataMovies && dataMovies.map((m) => (
            <div key={m.imdId}>
               <br />
               <h2>Título: {m.title}</h2>
               <h3>Ano: {m.year}</h3>
               <img src={m.poster} width="200" alt={`Poster for ${m.title}`} />
            </div>
         ))}
         </center>
      </div>
   );
};

export default Index;

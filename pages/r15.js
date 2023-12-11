import * as r from 'react';

export default function TelaMovies(){
   const [movies, setMovies] = r.useState([]);

   const handleSearch = async (searchTerm) => {
      const res = await fetch(`https://www.omdbapi.com/?apikey=8740ecf&s=${searchTerm}`);
      const data = await res.json();
      setMovies(data.Search);
   };

   return (
      <div>
         <center>
            <br></br>
            <MoviePesquisar onSearch={handleSearch}  />
            <Movies dataMovies={movies}/>
         </center>
      </div>
   )
}


export function MoviePesquisar({ onSearch }) {
   const [searchTerm, setSearchTerm] = r.useState('');

   const handleSearch = () => {
      onSearch(searchTerm);
   };

   const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
         handleSearch();
      }
   };

   return (
      <div>
         <center>
            <input
               type="text"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               onKeyDown={handleKeyDown}
               placeholder="Digite o nome do filme"
            />
            <button onClick={handleSearch}>Pesquisar</button>
         </center>
      </div>
   );
}



export function Movies({dataMovies}){
   return (
      <div>
         <center>
            {/* Validar se não é vazio */}
            {dataMovies && dataMovies.map((m) => 
               <div> 
                  <br></br>                  
                  <h2>
                     Titulo: {m.Title}
                  </h2>
                  <h3>
                     ano: {m.Year}
                  </h3>
                  <img src={m.Poster} width="200"></img>
               </div>  
            )}
         </center>
      </div>
   )
}

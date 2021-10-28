import './App.css';
import React, {useState,useEffect,useRef} from 'react';
import { useInput } from './inputHook';



function hallarMaximo(listaNumeros){

  let arr = listaNumeros;

  let largestNum = arr.reduce(function (accumulatedValue, currentValue) {
    return Math.max(accumulatedValue, currentValue);
  });
  
  return largestNum;

}

function App() {

  const { value:Escritura} = useInput('');
  const [valor, setValor] = useState('');
  const montadoRef = useRef(null);



  const onChangeHandler = (e) => {
    console.log(e.target.value);
    setValor(e.target.value);
}








  const [datos, setDatos] = useState([]);
  const [rankMax, setRankMax] = useState();
    useEffect(() => {
        montadoRef.current = true;
        fetchDatos();

        return() => montadoRef.current = false;
    },[]);

    
const  buscarJugador = async(gamertag) =>{
  console.log(gamertag);

  const data = await fetch("https://cryptum.halodotapi.com/games/hmcc/stats/players/"+gamertag+"/ranks?platform=xbox-one", {
    "method": "GET",
    "headers": {
      "Content-Type": "application/json",
      "Cryptum-API-Version": "2.3-alpha",
      "Authorization": "Cryptum-Token tBgPl2mIj7obt6QlZ7iaBW2PawxaNALr8KGqyCtkhOFba5OYTtWOlGMQMAHNSKoC"
    }
  });
  const datos = await data.json();
  if(montadoRef.current)
  setDatos(datos.data);
  let rangos = [];

  datos.data.map(dato => {
    rangos.push(dato.rank);
  });

  setRankMax(hallarMaximo(rangos));



 
};

  const fetchDatos = async () => {
    const data = await fetch("https://cryptum.halodotapi.com/games/hmcc/stats/players/Demen/ranks?platform=xbox-one", {
      "method": "GET",
      "headers": {
        "Content-Type": "application/json",
        "Cryptum-API-Version": "2.3-alpha",
        "Authorization": "Cryptum-Token tBgPl2mIj7obt6QlZ7iaBW2PawxaNALr8KGqyCtkhOFba5OYTtWOlGMQMAHNSKoC"
      }
    }).then(
      
    );
    const datos = await data.json();
    if(montadoRef.current)
    setDatos(datos.data);

    



  };
  return (
    <div className="App">
      <header className="App-header">              
    <div className="contenido">
        <label>
          Escribe:
          <input type="text" {...Escritura} onChange={onChangeHandler} />
        </label>
        <button onClick={() => { buscarJugador(valor) }}>Buscar jugador</button>
    </div>

    <p>El rank máximo del jugador buscado es {rankMax}</p>


        <table>
        <tbody>
        <tr>
          <th>LISTA</th>
          <th>RANK</th>
          <th>ICONO</th>
      </tr>
        
        {datos.map(dato => {
            return (
              <tr key={dato.playlist}>
              <td>{dato.playlist}</td>
              <td>{dato.rank}</td>
              <td><img src={dato.icon_url} alt="ok"></img></td>
          </tr>); 
})}
          </tbody>
        </table>

        <image ></image>
      </header>
    </div>
  );
}



export default App;

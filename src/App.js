import './App.css';
import { useState } from 'react';
import {FaRegCheckSquare, FaRegSquare} from "react-icons/fa";




function App() {

  const [list, setList] = useState([]);

  function adicionar(e) {
    e.preventDefault();
    console.log(e.target.task.value);
    const task = {
      id:new Date(),
      name: e.target.task.value,
      status: "pendente",
    };
    setList([...list, task]);
  }

  function done(item) {
    const newList = list.map((t) => {
      if (t.id === item.id) t.status = "feito";
      return t;
    });
    setList(newList);
  }

  return (
    <div className="App">
     <form onSubmit={adicionar}>
        <label>
           <input type="text" name="task" />
        </label>
        <input type="submit" value="Adicionar"/>
     </form>
     <ul>
       {list.map((item, index)=>{
         return (
          <li style={item.status === "feito" ? {textDecoration:"line-through"} : {}} key={index}>
            <span>{item.name}</span>
            <button onClick={()=> done(item)}>
                {item.status ==="feito" ?
                  <FaRegCheckSquare /> : 
                  <FaRegSquare />}
              </button>
          </li>
       );
       })}
     </ul>
    </div>
  );
}

export default App;

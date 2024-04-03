import './App.css';
import React ,{ useEffect, useState } from 'react';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";

function App() {
  const [comScreen,setcomScreen] = useState(false);
  const[todo,settodo] = useState([]);
  const[newT,setnewT] = useState("");
  const[newD,setnewD] = useState("");
  const[comp,setcomp] = useState([]);
  const[edit,setedit] = useState("");
  const [editItem, seteditItem] = useState("");


  const addT = () =>{
    let newtodo = {
      title:newT,
      description:newD
    };
    let x = [...todo];
    x.push(newtodo);
    settodo(x);
    localStorage.setItem('todolist',JSON.stringify(x));
  };


  const delT = (index) => {
    let x = [...todo];
    x.splice(index, 1); 
    localStorage.setItem('todolist', JSON.stringify(x));
    settodo(x);
  };

  const compT = index => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth()+1;
    let yy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let comOn = dd+'-'+mm+'-'+yy+" at "+h+':'+m+':'+s;
    let filter = {
      ...todo[index],
      comOn: comOn,
    };
    let up=[...comp];
    up.push(filter);
    setcomp(up);
    delT(index);
    localStorage.setItem('completedTodos', JSON.stringify(up));
    
  };
  const editT = (ind,item) =>{
    setedit(ind);
    seteditItem(item);
  };
  const upT = (value) =>{
    seteditItem((prev)=>{
      return {...prev,title:value}
    })
  };
  const upD = (value) =>{
    seteditItem((prev)=>{
      return {...prev,description:value}
    })
  };
  const update = ()=>{
    let x = [...todo];
      x[edit] = editItem;
      settodo(x);
      localStorage.setItem('todolist',JSON.stringify(x));
      setedit("");
  }
  const delcomT = (index) =>{
    let x = [...comp];
    x.splice(index, 1); 
    localStorage.setItem('completedTodos', JSON.stringify(x));
    setcomp(x);
  };
  useEffect(()=>{
    let stodo = JSON.parse(localStorage.getItem('todolist'));
    let comptodo = JSON.parse(localStorage.getItem('completedTodos'));
    if(stodo)
    {
      settodo(stodo);
    }
    if(comptodo)
    {
      setcomp(comptodo);
    }
    
  },[]);

  return (
    <div className="App">
      <h1>MY TODOS</h1>

      <div className="wrapper">
        <div className="input">
          <div className="input-item">
            <label>Title</label>
            <input type="text" value={newT} onChange={(e)=>setnewT(e.target.value)} placeholder="What's the task title?" />
          </div>
          <div className="input-item">
            <label>Description</label>
            <input type="text" value={newD} onChange={(e)=>setnewD(e.target.value)} placeholder="What's the task descritption?" />
          </div>
          <div className="input-item">
              <button type='button' className='primary-btn' onClick={addT}>Add</button>   
          </div>
        </div>

        <div className="btn-area">
          <button className={`second-btn ${comScreen === false && 'active'}`} onClick={()=> setcomScreen(false)}>TODO</button>
          <button className={`second-btn ${comScreen === true && 'active'}`} onClick={()=> setcomScreen(true)}>Completed</button>
        </div>

        <div className="list">
          {comScreen === false && todo.map((item,index)=>{
            if(edit === index)
            {
              return(
                <div className="edit" key={index}>
              <input placeholder='Updated title' onChange={(e)=>upT(e.target.value)} value={editItem?.title || ''}  />
              <textarea placeholder='Updated description' rows={4} onChange={(e)=>upD(e.target.value)} value={editItem?.description || ''} />

              <button type='button' className='primary-btn' onClick={update}>Update</button>   
              </div>
              )
            }
            else{
              return(
                <div className="item" key={index}>
            <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            </div>

          <div>
          <RiDeleteBin6Fill title='Delete?' onClick={()=>delT(index)} className='delete'/>
          <FaCheck title='completed??' onClick={()=>compT(index)} className='check'/>
          <CiEdit title='Edit?' onClick={()=>editT(index)} className='edit2' />
          </div>
          </div>
              );
            }
            })}

            {comScreen === true && comp.map((item,index)=>{
              return(
                <div className="item" key={index}>
            <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p><small>Completed on: {item.comOn}</small></p>
            </div>

          <div>
          <RiDeleteBin6Fill onClick={()=>delcomT(index)} className='delete'/>
          
          </div>
          </div>
              )
            })}
        </div>
      </div>
    </div>
  );

  
}

export default App;

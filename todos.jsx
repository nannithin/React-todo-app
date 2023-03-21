
import React, { useEffect, useState } from "react";
import {BsSunFill,BsMoonStarsFill,BsFillInfoCircleFill,BsFillHeartFill} from 'react-icons/Bs';
import TodoList from './todolist';


const Todo = () =>{

    const [todo,setTodo] = useState("");
    const [todos,setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || [] );
    const [dark,setDark] = useState(localStorage.getItem("dark")==="true");
    const [subbtn,setSubbtn] = useState("Add");
    const [isedit,setIsedit] = useState(null);

    const Submithandler =(e) =>{
        if(!todo){
            alert("fill the field")
        } else if(todo && subbtn == "Edit"){
            e.preventDefault();
            setTodos(todos.map((oneitem)=>{
                if(oneitem.id=== isedit){
                    return {...oneitem, title:todo}

                }
                return oneitem;
            }))
            setTodo('');
            setSubbtn("Add");
        }
        else{
            e.preventDefault();
            setTodos([...todos, {id: new Date().getTime().toString(), title: todo, completed: false}]);
            setTodo("");
            console.log(todo)
        }
    }
    const edithandler = (id)=>{
        setSubbtn("Edit");
        const newedititem = todos.find((onetodo)=>{
            return onetodo.id === id
        });
        console.log(newedititem);
        setTodo(newedititem.title);
        setIsedit(id);

    }

    useEffect(
        ()=>{
            localStorage.setItem("dark",dark);
        }
    ,[dark])

    useEffect(
        ()=>{
            localStorage.setItem("todos",JSON.stringify(todos));
        }
    ,[todos]);

    const Toggledark =() =>{
        dark==true ? setDark(null) : setDark(true);
        console.log(dark)
    }
    return(
        <div className={dark==true ? "dark" : "light"}>
       
            <div className="dark:bg-[#16191e] min-h-screen min-w-full bg-[#ebeef3] font-sans">
                <div className="min-w-[300px] sm:min-w-[250px] mx-auto px-8 py-[100px] min-h-[700px]">
                    
                    <div className="flex justify-between sm:justify-center py-3">
                        
                        <h1 className="dark:text-white sm:text-4xl text-3xl  font-bold">Todo App</h1>
                        <div className="flex">
                        <button className="text-white mt-1 ml-4 px-[9px] rounded-md bg-[#4273bf] py-3 cursor-pointer dark:text-black" onClick={Toggledark}> {dark ? <BsSunFill /> : <BsMoonStarsFill /> } </button> <a href="https://github.com/nannithin/todo"><div  className="text-white mt-1 ml-4 px-[9px] rounded-md bg-[#4273bf] py-3 cursor-pointer dark:text-black"><BsFillInfoCircleFill /></div></a>
                        </div>
                    </div>
                    <form className="flex justify-center mt-3 pb-5" onSubmit={Submithandler}>
                        <input type="text" value={todo} onChange={(e)=>setTodo(e.target.value)} className="dark:bg-black py-[8px] rounded-md  outline-none shadow-md focus:outline-[#4273bf] border-[#4273bf] dark:text-white px-3 text-[20px] font-mono min-w-[200px] w-[300px]" placeholder="Enter task..."/>
                        <button className="bg-[#4273bf] rounded-md font-semibold text-white ml-4 px-3">{subbtn}</button>
                    </form>

                   
                       <div>
                           <TodoList todos={todos} setTodos={setTodos} edithandler={edithandler}/>
                       </div>
                </div>
                <div className="dark:text-white flex justify-center ">
                    <p className="flex"> Made with <BsFillHeartFill className="text-red-500 mt-[5px] mx-1"/>By <a className="ml-1 text-blue-500" href="https://github.com/nannithin">Nithin</a></p>
                </div>
            </div>
        </div>

    )
    
}

export default Todo;

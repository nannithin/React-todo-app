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
       
            <div className="dark:bg-[#16191e] min-h-screen w-screen bg-[#ebeef3] font-sans">
                <div className="w-[500px] mx-auto px-8 py-[100px] min-h-[700px]">
                    <div className="flex justify-center py-3">
                        <h1 className="dark:text-white text-3xl font-bold">Todo App</h1>
                        <button className="text-white bg-[#4273bf] text-xl ml-28 px-2 rounded-md mt-1 py-2 dark:text-black " onClick={Toggledark}> {dark ? <BsMoonStarsFill /> : <BsSunFill /> } </button> <a href="https://github.com/nannithin/todo"><div  className="text-white mt-1 ml-4 px-[9px] rounded-md bg-[#4273bf] py-3 cursor-pointer dark:text-black"><BsFillInfoCircleFill /></div></a>
                    </div>
                    <form className="flex justify-center py-4" onSubmit={Submithandler}>
                        <input type="text" value={todo} onChange={(e)=>setTodo(e.target.value)} className="dark:bg-black py-[8px] rounded-md w-[300px] outline-none shadow-md focus:outline-[#4273bf] border-[#4273bf] mx-5 dark:text-white px-3 text-[20px] font-mono " placeholder="Enter task..."/>
                        <button className="bg-[#4273bf] px-4 rounded-md font-semibold text-white">{subbtn}</button>
                    </form>

                   
                       <div>
                           <TodoList todos={todos} setTodos={setTodos} edithandler={edithandler}/>
                       </div>
                </div>
                <div className="text-white flex justify-center ">
                    <p className="flex"> Made with <BsFillHeartFill className="text-red-500 mt-[5px] mx-1"/>By <a className="ml-1 text-blue-500" href="https://github.com/nannithin">Nithin</a></p>
                </div>
            </div>
        </div>

    )
    
}

export default Todo;
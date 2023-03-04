import React, { useState } from "react";
import {BsFillTrashFill} from 'react-icons/Bs';
import {AiFillEdit} from 'react-icons/Ai';


const TodoList = ({todos,setTodos,edithandler}) =>{

    


    const deletehandler = ({id}) =>{
       setTodos(todos.filter(onetodo=>onetodo.id!==id));
    }

    const completehandler = (id) =>{
        setTodos(todos.map(onetodo=>{
            if(onetodo.id===id){
                return {
                    ...onetodo, completed: !onetodo.completed
                }

            }
            return onetodo;
        }))
    }


   
   
    return(
        <div>
            {
                todos.map((onetodo)=>(
                    <ul key={onetodo.id} className="my-4 w-[350px] mx-auto">
                        
                    <li  className="border-[4px] rounded-md py-4 px-4 justify-between flex dark:border-black border-white font-poppins"><p className={`
                    dark:text-white text-2xl ${onetodo.completed ? 'line-through': 'no-underline'} font-semibold cursor-pointer`} onClick={()=>completehandler(onetodo.id)}>{onetodo.title}</p><button className="flex mt-2 text-xl gap-2 text-white dark:text-black">
                        <div onClick={()=>edithandler(onetodo.id)}   className="bg-[#4273bf] px-2 py-2 rounded-[5px]"><AiFillEdit /></div>
                        <div onClick={()=>deletehandler(onetodo)} className="bg-red-500 px-2 py-2 rounded-[5px]">
                        <BsFillTrashFill />
                        </div>
                        </button></li>
                    
                </ul>
                ))
            }
        </div>
    )
}

export default  TodoList;
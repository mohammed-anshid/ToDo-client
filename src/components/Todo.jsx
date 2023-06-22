/* eslint-disable jsx-a11y/anchor-is-valid */
import React ,{useState} from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { ErrorToast, SuccessToast } from '../utils/toast'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkboxHandle, removeTodos } from '../services/userApi/userRequests';

function Todo({ todos,taskId,state,setState,checked,setChecked}) {
  
  const [dropdown, setDropdown] = useState(false);  

  const handleCheckBoxStatus = async() =>{
    try {
        console.log('hellooo')
        const response = await checkboxHandle({
            taskId:taskId,
            todoId:todos?._id,
            type:!todos?.completed
        })
        if (response.status) {
            setState(!state)
            const updatedCheckboxes = checked.map((checkbox) => {
              if (checkbox._id === todos?._id) {
                return {
                  ...checkbox,
                  completed: !checkbox.completed,
                };
              }
              return checkbox;
            });
            setChecked(updatedCheckboxes);
        }
    } catch (error) {
        console.log(error);
    }
  }

  const removeToDoHandle = async () => {
    try {
        console.log('hello')
        const response = await removeTodos({
            taskId:taskId,
            todoId:todos?._id,
        })
        if(response.status){
            SuccessToast(response.message)
            setState(!state)
        }else{
            ErrorToast(response.message)
        }
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <> 
        <ToastContainer/>
        <div className="flex items-center bg-slate-50 pl-4 border border-gray-200 rounded dark:border-gray-700">
            <input id="bordered-checkbox-1" type="checkbox" onChange={ handleCheckBoxStatus } checked={todos?.completed} name="bordered-checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            <label for="bordered-checkbox-1" className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{todos?.todo}</label>
            <div className="icon m-auto mr-2">
                <button onClick={()=>setDropdown(!dropdown)} className='text-[20px]'><BsThreeDotsVertical/></button>
            </div>
            {dropdown && <div class="absolute right-4 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                <div class="py-1" role="none">
                    <a onClick={removeToDoHandle} class="text-gray-700 block px-4 py-2 text-sm  hover:bg-gray-100" role="menuitem" tabindex="-1" id="menu-item-1"><strong>Delete</strong></a>
                    <a onClick={()=>setDropdown(!dropdown)} class="text-gray-700 block px-4 py-2 text-sm bg-gray-100" role="menuitem" tabindex="-1" id="menu-item-1"><strong>Cancel</strong></a>
                </div>
            </div>}
        </div>
    </>
  )
}

export default Todo
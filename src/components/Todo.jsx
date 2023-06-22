import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { ErrorToast } from '../utils/toast'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkboxHandle } from '../services/userApi/userRequests';

function Todo({ todos,taskId,state,setState,checked,setChecked}) {

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
  return (
    <> 
        <ToastContainer/>
        <div className="flex items-center bg-slate-50 pl-4 border border-gray-200 rounded dark:border-gray-700">
            <input id="bordered-checkbox-1" type="checkbox" onChange={ handleCheckBoxStatus } checked={todos?.completed} name="bordered-checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            <label for="bordered-checkbox-1" className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{todos?.todo}</label>
            <div className="icon m-auto mr-2">
                <button className='text-[20px]'><BsThreeDotsVertical/></button>
            </div>
        </div>
    </>
  )
}

export default Todo
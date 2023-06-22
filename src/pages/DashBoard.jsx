import React,{ useEffect, useState } from "react";
import { ErrorToast, SuccessToast } from "../utils/toast";
import { addTasks, getTasks } from "../services/userApi/userRequests";
import NavBar from "../components/NavBar";
import Tasks from "../components/Tasks";


function DashBoard() {
  const [formData, setFormData] = useState({});
  const [state, setState] = useState(false)
  const [tasks, setTasks] = useState([]);

  useEffect(()=>{
    (
      async () => {
        const response = await getTasks()
        if(response.status === true){
          setTasks(response.data)
        }else{
          ErrorToast(response.message)
        }
      }
    )()
  },[state])

  const handleChange = (event) => {
    setFormData({ [event.target.name]: event.target.value } );
  };  

  const handleSubmit = async(event) => {
    try {
        event.preventDefault();
        console.log(formData)
        if(formData.task.trim() !== '') { 
          console.log(formData,'----')
          const response = await addTasks(formData)
          if(response.status === true){
            SuccessToast(response.message)
            setState(!state)
          }else{
            ErrorToast(response.message)
          }
        }else{
          ErrorToast('Enter a valid input')
        }
    } catch (error) {
        console.log(error)
    }
  };


  return (
    <>
      <NavBar />
      <div className="m-16">
        <form onSubmit={handleSubmit} >
          <label
            for="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <img
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                src="https://res.cloudinary.com/dbb0ncoht/image/upload/v1687419206/pencil-edit-button-svgrepo-com_oddpya.svg"
                alt=""
              />
            </div>
            <input
              type="search"
              id="default-search"
              name="task"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={formData.task}
              onChange={handleChange}
              placeholder="ToDo it here..."
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add
            </button>
          </div>
        </form><br /> <hr />
        {
          tasks.map((task)=>{
            return (
              <Tasks tasks={task} state={state} setState={setState}/>
            )
          })
        }
        
      </div>
    </>
  );
}

export default DashBoard;

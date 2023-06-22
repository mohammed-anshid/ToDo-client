import React,{ useState } from 'react'
import Todo from './Todo';
import { ErrorToast, SuccessToast } from '../utils/toast';
import { addToDos } from '../services/userApi/userRequests';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar } from "react-circular-progressbar";

function Tasks({tasks,state,setState}) {

  const [collapse, setCollapse] = useState(false); 
  const [formData, setFormData] = useState({});
  const [checked, setChecked] = useState(tasks?.todos)

  const handleChange = (event) => {
    setFormData({ [event.target.name]: event.target.value } );
  };  

  const handleSubmit = async(event) => {
    try {
        event.preventDefault();

        if(formData.todo.trim() !== '') { 
          const response = await addToDos(formData,tasks._id)
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

  const calculateGraphValue = () => {
    if(checked.length === 0){
        return 0
    }
    const checkedCount = checked.filter((checkbox) => checkbox.completed).length;
    // console.log(checkedCount);
    return (Math.floor((checkedCount / checked.length) * 100))
  };

  return (
    <>
        <div>
          <ToastContainer/>
          <div id="accordionExample" className="mt-7">
            <div className=" border border-neutral-500 bg-gray-200 dark:border-neutral-600 dark:bg-neutral-800">
              <h2 className="mb-0" id="headingOne">
                <button
                  className="group relative flex w-full items-center border-0 bg-gray-200 px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
                  type="button"
                  onClick={()=>setCollapse(!collapse)}
                  data-te-collapse-init
                  data-te-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                > 
                <div className='w-10 h-10'>
                    <CircularProgressbar
                        value={calculateGraphValue()}
                        text={`${calculateGraphValue()}%`}
                    />
                </div>
                  <strong className='ml-1'>{ tasks ? tasks.title :''}</strong>
                  
                  <span className="ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                    
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                </button>
              </h2>

              {
              collapse &&
              <div
                id="collapseOne"
                className="!visible "
                data-te-collapse-item
                data-te-collapse-show
                aria-labelledby="headingOne"
                data-te-parent="#accordionExample"
              >
                <div className="px-5 py-4 ">
                  <form onSubmit={handleSubmit} >
                    <strong className='text-sm ml-1'>Add Your Todos here..</strong>
                    <div className="relative">
                      <input
                        type="search"
                        id="default-search"
                        name='todo'
                        value={formData.task}
                        onChange={handleChange}
                        className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="ToDo it here..."
                      />
                      <button
                        type="submit"
                        className="text-white absolute right-2.5 bottom-2.5 bg-slate-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Add
                      </button>
                    </div>
                  </form>
                  <br /><hr className="text-black" />
                  {
                    tasks?.todos?.map((todo)=>{
                        return (
                            <Todo todos={todo} taskId={tasks?._id} state={state} setState={setState} checked={checked} setChecked={setChecked}/>
                        )
                    })
                  }
                </div>
              </div>
              }
            </div>
          </div>
        </div>
    </>
  )
}

export default Tasks
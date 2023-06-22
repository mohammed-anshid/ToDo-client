/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{ useState } from 'react'
import Todo from './Todo';
import { ErrorToast, SuccessToast } from '../utils/toast';
import { addToDos, editTask, removeTask } from '../services/userApi/userRequests';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar } from "react-circular-progressbar";

function Tasks({tasks,state,setState}) {

  const [collapse, setCollapse] = useState(false); 
  const [dropdown, setDropdown] = useState(false);
  const [modal, setModal] = useState(false); 
  const [formData, setFormData] = useState({});
  const [task, setTask] = useState(tasks?.title);
  const [checked, setChecked] = useState(tasks?.todos)
  
  // handle form Data //
  const handleChange = (event) => {
    setFormData({ [event.target.name]: event.target.value } );
  };  

  // handle form submit //
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
      console.log(error);
    }
  };

  // handle Edit Task //
  const editTaskHandle = async () => {
    try {
      const response = await editTask(tasks?._id,task)
      if(response.status){
        setState(!state)
        setModal(!modal)
        SuccessToast(response.message)
      }else{
        ErrorToast(response.message)
      }
    } catch (error) {
      console.log(error);
    }
  }

  // handle delete Task //
  const removeTaskHandle = async () => {
    try {
      const response = await removeTask(tasks?._id)
      if(response.status){
        setState(!state)
        SuccessToast(response.message)
      }else{
        ErrorToast(response.message)
      }
    } catch (error) {
      console.log(error);
    }
  }

  // handle Progress Graph values //
  const calculateGraphValue = () => {
    if(checked.length === 0){
      return 0;
    }
    const checkedCount = checked.filter((checkbox) => checkbox.completed).length;
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
                    
                  </span>
                  <div class="relative inline-block text-left">
                    <div>
                      <button type="button" onClick={()=>setDropdown(!dropdown)} class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                      Options
                      </button>
                    </div>
                    {dropdown && <div class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                        <div class="py-1" role="none">
                            <a onClick={()=>setModal(!modal)} class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem" tabindex="-1" id="menu-item-0"><strong>Edit</strong></a>
                            <a onClick={removeTaskHandle} class="text-gray-700 block px-4 py-2 text-sm  hover:bg-gray-100" role="menuitem" tabindex="-1" id="menu-item-1"><strong>Delete</strong></a>
                        </div>
                    </div>}
                  </div>
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
        {/*task editing modal */}
        {modal && (
        <div
          class="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div class="fixed inset-0 z-10 overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div class="sm:items-start">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                      <input
                        type="text"
                        name="task"
                        id="task"
                        onChange={(e)=>setTask(e.target.value)}
                        value={task}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                      />
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 gap-2 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    onClick={editTaskHandle}
                    class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={() => setModal(!modal)}
                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Tasks
/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { ErrorToast, SuccessToast } from '../utils/toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateSigninForm } from '../utils/validation';
import { signin } from '../services/userApi/userRequests';

function Signin() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };  
  const handleSubmit = async(event) => {
    try {
        event.preventDefault();
        const formValid = validateSigninForm(setErrors,formData)
        console.log(formValid)
        console.log(errors)
        if(formValid) {
            
            const response = await signin(formData)
            if(response.status === true){
                SuccessToast(response.message)
                localStorage.setItem('userToken', response.token)
                setTimeout(() => {
                    navigate('/dashboard')
                }, 2500);
            }else{
                ErrorToast(response.message)
            }
        }
    } catch (error) {
        console.log(error)
    }
  };
  
  return (
    <>
        <ToastContainer/>
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
                    Flowbite    
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl dark:text-white">
                            Welcome Back !
                        </h1>
                        <form className="space-y-4 md:space-y-4" onSubmit={handleSubmit} action="#">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="email" name="email" id="email" value={formData.email || ''} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                                {errors.emailAddress && <span className='text-red-600'>{errors.emailAddress}</span>}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" value={formData.password || ''} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                {errors.password && <span className='text-red-600'>{errors.password}</span>}
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                You don't have an account? <a href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Signup here</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Signin
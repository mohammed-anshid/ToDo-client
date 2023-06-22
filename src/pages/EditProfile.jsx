/* eslint-disable react-hooks/rules-of-hooks */
import React,{ useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { editProfile, userProfile } from '../services/userApi/userRequests'
import NavBar from '../components/NavBar';
import { ErrorToast, SuccessToast } from '../utils/toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateProfileForm } from '../utils/validation';

function EditProfile() {

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()

  useEffect(()=>{
    (
        async () => {
            const response = await userProfile()
            if(response.status === true){
                setFormData(response?.data)
            }
        }
    )()
  },[])  

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = async(event) => {
    try {
        console.log('hai')
        event.preventDefault();
        const formValid = validateProfileForm(setErrors,formData)
        console.log(formValid)
        if(formValid) {
            console.log(formValid)
            console.log(formData)
            const response = await editProfile(formData)
            if(response.status === true){
                SuccessToast(response.message)
                setTimeout(() => {
                    navigate('/profile')
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
        <NavBar/>
        <ToastContainer/>
        <div className="flex items-center justify-center">
            <div className="bg-white w-1/3 mt-10 rounded-lg">
                <div className="flex items-center justify-center pt-10 flex-col">
                    <img src='https://res.cloudinary.com/dbb0ncoht/image/upload/v1687352753/man_a2sfui.png' className="rounded-full w-32"/>
                </div>
                <div className="middle">
                    <form className="space-y-4 md:space-y-4" onSubmit={handleSubmit} action="#">
                        <div className="mt-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input type="text" name="name" id="name" value={formData.name ||''} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            {errors.fullName && <span className='text-red-600'>{errors.fullName}</span>}
                        </div>
                        <div className="mt-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input type="email" name="email" id="email" value={formData.email ||''} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                            {errors.emailAddress && <span className='text-red-600'>{errors.emailAddress}</span>}
                        </div>
                        <button type='submit' className='bg-blue-600 w-full text-white mt-3 rounded-[10px] h-8 px-3'>Submit Now</button>
                    </form>
                    
                </div>
            </div>    
        </div>
    </>
  )
}

export default EditProfile
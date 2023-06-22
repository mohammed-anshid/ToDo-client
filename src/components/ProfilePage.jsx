/* eslint-disable jsx-a11y/alt-text */
import React ,{ useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { userProfile } from '../services/userApi/userRequests'

function ProfilePage() {

  const [data,setData] = useState()
  const navigate = useNavigate()

  useEffect(()=>{
    (
        async () => {
            const response = await userProfile()
            if(response.status === true){
                setData(response?.data)
            }
        }
    )()
  },[])


  return (
    <>
        <div className="flex items-center justify-center">
            <div className="bg-white w-1/3 mt-10 rounded-lg">
                <div className="flex items-center justify-center pt-10 flex-col">
                    <img src='https://res.cloudinary.com/dbb0ncoht/image/upload/v1687352753/man_a2sfui.png' className="rounded-full w-32"/>
                    <h1 className="text-gray-800 font-semibold text-xl mt-5">{data ? data.name :''}</h1>
                    <h1 className="text-gray-500 text-sm">{data ? data.email :''}</h1>
                </div>
                <div className="">
                    <button onClick={()=>navigate(`/security/${data?._id}`)}  className='bg-gray-200 w-full text-gray-600 mt-3 rounded-[10px] h-8 px-3'>Privacy & Security</button>
                    <button onClick={()=>navigate(`/profile/${data?._id}`)}  className='bg-blue-600 w-full text-white mt-3 rounded-[10px] h-10 px-3'>Edit</button>
                </div>
            </div>    
        </div>
   </>
    
  )
}

export default ProfilePage
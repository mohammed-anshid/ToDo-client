import React from 'react'

function Banner() {
  return (
    <>
        <div name='home' className='w-full h-screen bg-white-200 flex flex-col justify-between shadow-lg'>
            <div className='grid md:grid-cols-2 max-w-[1240px] m-auto'>
                <div className='flex flex-col justify-center md:items-start w-full px-2 py-8'>
                    <p className='text-2xl'>Build the right Task for you</p>
                    <h1 className='py-3 text-5xl md:text-7xl font-bold'>ToDo It !</h1>
                    <p className='text-2xl'>Do the right things..</p>
                    <button className='py-3 px-6 w-[40%] my-4 bg-black text-white rounded-[30px]'>Get Started</button>
                </div>
                <div>
                    <img className='w-full' src='https://res.cloudinary.com/dbb0ncoht/image/upload/v1687467876/todo_sr502q.jpg' alt="/" />
                </div>
                <div className='absolute flex flex-col py-8 md:min-w-[760px] bottom-[5%]
                mx-1 md:left-1/2 transform md:-translate-x-1/2 bg-zinc-200
                border border-slate-300 rounded-xl text-center shadow-xl'>
                    <div className='flex justify-between flex-wrap px-4'>
                        <p className='flex px-4 py-2 text-slate-500'>Notes</p>
                        <p className='flex px-4 py-2 text-slate-500'>Tasks</p>
                        <p className='flex px-4 py-2 text-slate-500'>Progress</p>
                        <p className='flex px-4 py-2 text-slate-500'>Workouts</p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Banner
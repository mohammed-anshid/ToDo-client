import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

function Redirection() {

  const navigate = useNavigate();
  useEffect(()=>{
    navigate('/signup');
  },[navigate])  

  return (
    <></>
  )
}

export default Redirection
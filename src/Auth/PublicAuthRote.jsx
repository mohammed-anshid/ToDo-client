import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Athentication } from '../services/userAuth/userAuth';

function PublicAuthRote(props) {
    
  const navigate = useNavigate()

  useEffect(() =>{
    (async () => {
        const response = await Athentication()
        if (!response.status) {
            localStorage.clear()
            navigate('/login')
        }
    })()
  },[])

  if (!localStorage.getItem("token")) {
    return  navigate('/login')
  }
  if (localStorage.getItem("token")) {
    return props.children;
  }
}

export default PublicAuthRote
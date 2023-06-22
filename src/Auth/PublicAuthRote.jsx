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
            navigate('/signin')
        }
    })()
  },[])

  if (!localStorage.getItem("userToken")) {
    return  navigate('/signin')
  }
  if (localStorage.getItem("userToken")) {
    return props.children;
  }
}

export default PublicAuthRote
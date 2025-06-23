import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SpecificBlog = () => {
      const navigate = useNavigate()
  
  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(!token){
      navigate("/login")
    }
  },[navigate])

  return (
    <div>SpecificBlog</div>
  )
}

export default SpecificBlog
import { useEffect,useState } from 'react'
import { useNavigate , useParams } from 'react-router-dom'
import { MdxRenderer } from "../components/other/MdxProvider";
import  axios  from "axios";
const SpecificBlog = () => {
    const navigate = useNavigate()
    const {slug} = useParams()
    const [content, setContent]= useState<any>()
    const [meta, setMeta] = useState<any>()

  
  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(!token){
      navigate("/login")
    }

    async function fetchPost() {
      const resp = await axios.get(`http://localhost:3000/post/${slug}`)
      if(resp.status !==200){
        console.log("error while fetching specific post")
      }
      console.log(resp.data)
      setMeta({title: resp.data.title, date:resp.data.date, author:resp.data.author, image: resp.data.image})
      setContent(resp.data.content)
    }

    fetchPost()

  },[navigate])

  return (
        <div className="px-20  py-8 flex flex-col ">
            {meta?.image && (
                <img
                    src={`https://${meta.image}`}
                    alt={meta.title}
                    className="w-full h-auto  object-cover rounded-xl shadow-lg mb-8" 
                />
            )}

            <div className=" mb-8"> 
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-3"> 
                    {meta?.title}
                </h1>
                <p className="text-lg text-gray-600 mb-1"> 
                    {meta?.date} By {meta?.author}
                </p>
            </div>


            <div className="prose prose-lg text-gray-800"> 
                <MdxRenderer content={content} />
            </div>
        </div>
  )
}

export default SpecificBlog
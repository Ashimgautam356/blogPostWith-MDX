
import { Input } from '../components/ui/input';
import { Card ,CardContent} from '../components/ui/card';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

type Post = {
  title: string;
  date: string;
  author: string;
  image: string;
  slug: string
  tags?:[] ; 
};

interface BlogResponse{
  tags:[], 
  posts: Post[]
}


const Blog = () => {
  const navigate = useNavigate()

  const [blogs, setBlogs] = useState<BlogResponse>();
  const [loading, setLoading] = useState(true);

  const [filtredTag, setFiltredTag] = useState("all")
  const [search, setSearch] = useState("");

const filtredPost =
  blogs?.posts
    .filter((post) => {
      // Filter by tag
      const matchesTag =
        filtredTag === "all"
          ? true
          : post.tags?.some((tag: string) => tag.toLowerCase() === filtredTag);

      // Filter by search input
      const matchesSearch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.tags?.some((tag: string) =>
          tag.toLowerCase().includes(search.toLowerCase())
        );

      return matchesTag && matchesSearch;
    }) || [];


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL
        const res = await axios.get(`${apiUrl}/getAll-post`);
        setBlogs(res.data); // expects an array of blog objects
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);


  const featured = filtredPost[0];
  const others = filtredPost.slice(1) || [];


  function handleClick(slug:string) {
    const token = localStorage.getItem("token")
    if(!token){
      navigate("/login")
    }

    navigate(`/${slug}`)
  }

 return (
     <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-6xl font-bold text-center text-[#0A165E]">Blogs & Articles</h1>
      <p className="text-center mt-2 text-[#585B94]">
        Discover trends & insights on tech
      </p>

      <div className="mt-6">
        <Input placeholder="Search articles..." className="w-full  mx-auto min-h-[3rem] px-4 py-2 rounded-md border-transparent bg-[#f5f7fa] focus:border-2 focus:border-[#3D68A4]"  onChange={(e) => setSearch(e.target.value)}/>
      </div>

      <div className="flex flex-wrap gap-2  my-6">
       <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
          filtredTag === 'all'
            ? 'bg-[#3D68A4] text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`} 
        onClick={()=>setFiltredTag("all")}
        >All</button>


        {blogs?.tags.map((tag:string, id) => {
        const isSelected = filtredTag === tag.toLowerCase();
        return (
      <button
        key={id}
        onClick={() => setFiltredTag(tag.toLowerCase())}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
          isSelected
            ? 'bg-[#3D68A4] text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
      >
        {tag}
      </button>
    );
  })}
      </div>

      {loading ? (
        <p className="text-center text-sm text-muted-foreground">Loading...</p>
      ) : filtredPost.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground">No blogs found.</p>
      ) : (
        <>
          {/* Featured Blog */}
          {featured && (
            <Card className="mb-10 transition-transform duration-300 hover:shadow-xl hover:-translate-y-1" onClick={()=>handleClick(featured.slug)}>
              <img
                src={`https://${featured.image}`}
                alt={featured.title}
                className="w-full h-[40vh] object-cover rounded-t-xl object-center"
              />
              <CardContent className="mt-4">
                <h2 className="text-xl font-bold truncate">{featured.title}</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  By {featured.author} on {featured.date}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Other Blogs */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {others.map((blog:Post, index) => (
              <Card
                key={index}
                className="overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
                onClick={()=>handleClick(blog.slug)}
              >
                <img
                  src={`https://${blog.image}`}
                  alt={blog.title}
                  className="w-full h-40 object-cover object-center"
                />
                <CardContent className="mt-3">
                  <h3 className="font-bold overflow-clip truncate">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    By {blog.author} on {blog.date}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Blog


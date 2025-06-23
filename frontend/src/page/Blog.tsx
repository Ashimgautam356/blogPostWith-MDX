
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Card ,CardContent} from '../components/ui/card';
import { useEffect, useState } from 'react';
import axios from 'axios';


const blogData = [
  {
    title: "Edge Computing: Empowering Real-Time Decision Making",
    date: "May 18, 2025",
    author: "Ammar Bdr Kunwar",
    image: "/images/edge-computing.png",
  },
  {
    title: "AI Ethics and Governance: Building Trust",
    date: "May 17, 2025",
    author: "Ammar Bdr Kunwar",
    image: "/images/ai-ethics.png",
  },
  {
    title: "Quantum Computing: Unlocking Power",
    date: "May 16, 2025",
    author: "Ammar Bdr Kunwar",
    image: "/images/quantum.png",
  },
  {
    title: "Agentic AI: The Rise of Autonomy",
    date: "May 16, 2025",
    author: "Ammar Bdr Kunwar",
    image: "/images/agentic.png",
  },
  {
    title: "Zero Trust Architecture: Redefining Security",
    date: "May 16, 2025",
    author: "Ammar Bdr Kunwar",
    image: "/images/zero-trust.png",
  },
  {
    title: "Understanding React Hooks: A Practical Guide",
    date: "May 15, 2025",
    author: "Samrajhya Bhari",
    image: "/images/react-hooks.png",
  },
  {
    title: "The Need for Cybersecurity",
    date: "May 15, 2025",
    author: "Ammar Bdr Kunwar",
    image: "/images/cybersecurity.png",
  },
];

const tags = ["All", "IT", "AI", "cloud", "IoT", "AI ethics"];

type Blog = {
  title: string;
  date: string;
  author: string;
  image: string;
  tags?:[] ; 
};


const Blog = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('http://localhost:3000/getAll-post');
        console.log(res.data)
        setBlogs(res.data.posts); // expects an array of blog objects
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const featured = blogs[0];
  const others = blogs.slice(1);

 return (
     <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center">Blogs & Articles</h1>
      <p className="text-center text-muted-foreground mt-2">
        Discover trends & insights on tech
      </p>

      <div className="mt-6">
        <Input placeholder="Search articles..." className="max-w-xl mx-auto" />
      </div>

      <div className="flex flex-wrap gap-2 justify-center my-6">
        {tags.map((tag) => (
          <Badge key={tag} variant="outline" className="cursor-pointer">
            {tag}
          </Badge>
        ))}
      </div>

      {loading ? (
        <p className="text-center text-sm text-muted-foreground">Loading...</p>
      ) : blogs.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground">No blogs found.</p>
      ) : (
        <>
          {/* Featured Blog */}
          {featured && (
            <Card className="mb-10 transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-auto object-cover rounded-t-xl"
              />
              <CardContent className="mt-4">
                <h2 className="text-xl font-semibold">{featured.title}</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  By {featured.author} on {featured.date}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Other Blogs */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {others.map((blog, index) => (
              <Card
                key={index}
                className="overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-40 object-cover"
                />
                <CardContent className="mt-3">
                  <h3 className="font-medium line-clamp-2 leading-tight">
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


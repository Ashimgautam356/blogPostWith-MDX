import  Express, { Request, Response }  from "express";
import cors from 'cors'


import fs from 'fs/promises'
import path from "path";
import matter from "gray-matter";

const app =  Express()


app.use(cors())

app.get("/",async(req:Request,res:Response)=>{
    res.send("!!!hello!!!")
})


app.get("/getAll-post",async(req:Request,res:Response)=>{
   try {
    const postsDir = path.join(__dirname, "../posts");

    const files = await fs.readdir(postsDir);
    const mdxFiles = files.filter((file) => file.endsWith(".mdx"));
    const tagsSet = new Set<string>();

    const posts = await Promise.all(
      mdxFiles.map(async (file) => {
        const filePath = path.join(postsDir, file);
        const content = await fs.readFile(filePath, "utf-8");

        const slug = path.parse(filePath).name


        const { data } = matter(content);

        // Collect unique tags
        if (Array.isArray(data.tag)) {
          data.tag.forEach((tag: string) => tagsSet.add(tag));
        }

        return {
          title: data.title || file.replace(".mdx", ""),
          image: data.image || null,
          author: data.author || "Unknown",
          date: data.date || "Unknown",
          tags: data.tag || [],
          slug: slug || ""
        };
      })
    );

    res.json({
      tags: Array.from(tagsSet),
      posts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load posts" });
  }
  
})


app.get("/post/:slug", async(req:Request, res:Response)=>{

 const { slug } = req.params;
  const postsDir = path.join(__dirname, "../posts");

  try {
    const filePath = path.join(postsDir, `${slug}.mdx`);
    const rawContent = await fs.readFile(filePath, "utf-8");

    const { content, data } = matter(rawContent); // data = frontmatter

    res.json({
      title: data.title || slug,
      date: data.date || null,
      author: data.author || null,
      image: data.image || null,
      tags: data.tags || [],
      content, // only MDX content (without frontmatter)
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "error fetching specific slug" });
  }
})


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
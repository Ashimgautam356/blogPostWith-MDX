import  Express, { Request, Response }  from "express";
import cors from 'cors'


import fs from 'fs/promises'
import path from "path";


const app =  Express()


app.use(cors())

app.get("/",async(req:Request,res:Response)=>{
    res.send("!!!hello!!!")
})


app.get("/getAll-post",async(req:Request,res:Response)=>{
      try {
    const postsDir = path.join(__dirname, "posts");
    const files = await fs.readdir(postsDir);
    const mdxFiles = files.filter(file => file.endsWith(".mdx"));

    const posts = await Promise.all(
      mdxFiles.map(async (file) => {
        const filePath = path.join(postsDir, file);
        const content = await fs.readFile(filePath, "utf-8");
        return {
          title: file.replace(".mdx", ""),
          content,
        };
      })
    );

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load posts" });
  }
})


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
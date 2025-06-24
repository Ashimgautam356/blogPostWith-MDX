import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GitBranch } from "lucide-react";
import logo from "@/assets/logo.png";
import google from "@/assets/google.svg";
import { useNavigate } from "react-router-dom";


const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(6, { message: "Min 6 characters required" }),
});

type loginType = z.infer<typeof loginSchema>


const Login = () => {

  const navigate = useNavigate()

   const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const [showPassword, setShowPassword] = useState(false);

  function  handleSubmit(data:loginType) {
      
    // no we can send the data to the db but for now i gone set random words to the token 

    localStorage.setItem("token","aslflasjfo324242olnsofas56(**&&*GHBU%&*^*")
    navigate("/")
    
  }
  return (
    <div className="h-screen w-screen flex justify-center items-center">

     <div className="w-full max-w-md bg-white rounded-xl p-8 shadow-md">
      <div className="text-center">
        <img src={logo} alt="ABS Logo" className="mx-auto w-20 h-20" />
        <h2 className="text-2xl font-bold mt-4">Welcome Back</h2>
        <p className="text-muted-foreground">Sign in to continue to your account</p>
      </div>

      <Form {...form}>
        <form className="space-y-4 mt-6" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
        
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" className="h-[3rem] placeholder:text-[#99A1AF] placeholder:font-semibold bg-[#F9FAFB]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel>Password</FormLabel>
                  <span className="text-xs hover:underline text-blue-700 cursor-pointer">Forgot password?</span>
                </div>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      className="h-[3rem] placeholder:text-[#99A1AF] placeholder:font-semibold bg-[#F9FAFB]"
                      placeholder="Enter your password"
                      {...field}
                    />
                    <span
                      className="absolute right-3 top-3 text-sm font-semibold text-[#99A1AF]  hover:text-blue-700 cursor-pointer"
                      onClick={() => setShowPassword((p) => !p)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-[#244b88] hover:bg-[#2C5EA8] text-white">
            Sign In
          </Button>

          <div className="flex items-center gap-2 text-sm justify-between text-muted-foreground">
            <span className="border-t w-[30%]" /> or continue with <span className="border-t w-[30%]" />
          </div>

          <div className="flex gap-4 mt-2">
            <Button variant="outline" className="flex-1">
              <img src={google} alt="Google" className="w-5 h-5 mr-2" />
              Google
            </Button>
            <Button variant="outline" className="flex-1">
              <GitBranch className="w-4 h-4 mr-2" /> GitHub
            </Button>
          </div>
        </form>
      </Form>

      <p className="text-center text-sm mt-6 text-muted-foreground">
        Don't have an account? <span className="text-blue-700 cursor-pointer hover:underline font-semibold">Register</span>
      </p>
    </div>
    </div>

  )
}

export default Login
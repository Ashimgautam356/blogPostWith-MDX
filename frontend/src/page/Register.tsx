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

const registerSchema = loginSchema.extend({
  name: z.string().min(3, { message: "Full name is required" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});


type  registerType = z.infer<typeof registerSchema>

const Register = () => {
  const navigate = useNavigate()

  function handleRegister(data:registerType){

    navigate('/login')
  }

const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  return (
    <div className="h-screen w-screen flex justify-center items-center">
    <div className="w-full max-w-md bg-white rounded-xl p-8 shadow-md">
      <div className="text-center">
        <img src={logo} alt="ABS Logo" className="mx-auto w-20 h-20" />
        <h2 className="text-2xl font-bold mt-4">Create an Account</h2>
        <p className="text-muted-foreground">Sign up to get started</p>
      </div>

      <Form {...form}>
        <form className="space-y-4 mt-6" onSubmit={form.handleSubmit(handleRegister)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>FullName</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" className="h-[3rem] placeholder:text-[#99A1AF] placeholder:font-semibold bg-[#F9FAFB]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="h-[3rem] placeholder:text-[#99A1AF] placeholder:font-semibold bg-[#F9FAFB]"
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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirm ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="h-[3rem] placeholder:text-[#99A1AF] placeholder:font-semibold bg-[#F9FAFB]"
                      {...field}
                    />
                    <span
                      className="absolute right-3 top-3 text-sm font-semibold text-[#99A1AF]  hover:text-blue-700 cursor-pointer"
                      onClick={() => setShowConfirm((p) => !p)}
                    >
                      {showConfirm ? "Hide" : "Show"}
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-[#2C5EA8] hover:bg-[#244b88] text-white">
            Register
          </Button>

          <div className="flex items-center gap-2 text-sm justify-center text-muted-foreground">
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
        Already have an account? <span className="text-blue-700 cursor-pointer hover:underline">Sign in</span>
      </p>
    </div>
    </div>
  )
}

export default Register
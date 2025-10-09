import React from 'react'
import { createPortal } from 'react-dom'
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'
import { useForm } from "react-hook-form"
import { useMutation } from '@tanstack/react-query'

const LoginPortal = ({ isOpen, onClose }) => {
  const { 
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const loginMutation = useMutation({
    mutationFn: async (data) => {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || "Invalid credentials")
      }
      return res.json()
    },
    onSuccess: (data) => {
      alert("Login successful!")
      console.log("User:", data)
      onClose()
    },
    onError: (error) => {
      alert(error.message || "Login failed!")
    },
  })

  const onSubmit = (data) => {
    loginMutation.mutate(data)
  }

  if (!isOpen) return null

  return createPortal(
    <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/60 flex items-center justify-center z-[1000]'>
      <div className='flex flex-col gap-5 bg-white p-5 sm:py-10 rounded-2xl w-[75%] sm:w-[60%] md:w-[35%]'>
        <div className='flex items-center justify-between'>
          <h2 className='flex-1 text-center text-xl sm:text-2xl font-bold'>
            Login to your account
          </h2>
          <Button
            onClick={onClose}
            variant='ghost'
            className='h-5 text-gray-500 hover:bg-white hover:cursor-pointer'
          >
            <X />
          </Button>
        </div>

        <form 
          className='flex flex-col px-5 sm:px-20 gap-5'
          onSubmit={handleSubmit(onSubmit)}
        >
          <label>
            <p>Email:</p>
            <input
              type='email'
              placeholder='Enter email...'
              className='border rounded-lg w-full px-2 text-sm h-9'
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>
            )}
          </label>

          <label>
            <p>Password:</p>
            <input
              type='password'
              placeholder='Enter password...'
              className='border rounded-lg w-full px-2 text-sm h-9'
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>
            )}
          </label>

          <button
            className='bg-blue-500 px-8 py-2 rounded-md text-white disabled:opacity-50'
            type="submit"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>,
    document.body
  )
}

export default LoginPortal
"use client";

import Link from 'next/link';
import { PawPrint } from 'lucide-react';
import toast from 'react-hot-toast';
import {Check} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";
import { authClient } from "../../lib/auth-client";

const Login = () => {

  const onSubmit = async (e) => {
  e.preventDefault();

  const form = e.target;
  const data = new FormData(form);
  const loginData = Object.fromEntries(data.entries());

  console.log(loginData);

  setIsLoading(true);

  const { data: user, error } = await authClient.signIn.email(
    {
      email: loginData.email,
      password: loginData.password,
    },
    {
      onRequest: () => {
        console.log("Loading...");
      },

      onSuccess: () => {
        toast.success("Logged in successfully!");
        console.log("Login successful!");
      },

      onError: (ctx) => {
        toast.error(ctx.error.message);
      },
    }
  );

  setIsLoading(false);

  console.log(user);
  console.log(error);
};

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <PawPrint className="w-7 h-7 text-white" />
            </div>
            <span className="text-4xl font-bold">PetNest</span>
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl p-10 shadow-2xl border border-gray-800">
          <h1 className="text-3xl font-bold text-center mb-1">Welcome back!</h1>
          <p className="text-gray-400 text-center mb-8">
            Sign in to continue to PetNest
          </p>

          {/* Google Button */}
          <button className="w-full bg-white hover:bg-[#475569] transition py-3.5 rounded-2xl flex items-center justify-center gap-3 mb-6">
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            <span className="font-medium">Continue with Google</span>
          </button>

          <div className="relative text-center my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative text-xs text-gray-700 bg-white px-4">
              or sign in with email
            </div>
          </div>

           <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
      <TextField
        isRequired
        name="email"
        type="email"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address";
          }
          return null;
        }}
      >
        <Label>Email</Label>
        <Input placeholder="john@example.com" />
        <FieldError />
      </TextField>
      <TextField
        isRequired
        minLength={8}
        name="password"
        type="password"
        validate={(value) => {
          if (value.length < 8) {
            return "Password must be at least 8 characters";
          }
          if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
          }
          if (!/[0-9]/.test(value)) {
            return "Password must contain at least one number";
          }
          return null;
        }}
      >
        <Label>Password</Label>
        <Input placeholder="Enter your password" />
        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
        <FieldError />
      </TextField>
      <div className="flex gap-2">
        <Button type="submit">
          <Check />
          LogIn
        </Button>
        <Button type="reset" variant="secondary">
          Cancel
        </Button>
      </div>
    </Form>

          <p className="text-center mt-8">
            Don't have an account?{" "}
            <Link href="/register" className="text-purple-400 hover:text-purple-300 font-medium">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
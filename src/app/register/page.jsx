"use client";

import { useState } from 'react';
import Link from 'next/link';
import { PawPrint, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import {Check} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";
import { authClient } from "../../lib/auth-client";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  

  const onSubmit = async (e) => {
  e.preventDefault();

  const form = e.target;
  const data = new FormData(form);
  const user = Object.fromEntries(data.entries());

  console.log(user);

  // Confirm password check
  if (user.password !== user.confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

  setIsLoading(true);

  const { data: registerData, error } = await authClient.signUp.email(
    {
      name: user.name,
      email: user.email,
      image: user.imageurl,
      password: user.password,
    },
    {
      onRequest: () => {
        console.log("Loading...");
      },

      onSuccess: () => {
        toast.success("Account created successfully!");
        console.log("Success");
      },

      onError: (ctx) => {
        toast.error(ctx.error.message);
      },
    }
  );

  setIsLoading(false);

  console.log(registerData);
  console.log(error);
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E2937] to-[#0F172A] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <PawPrint className="w-7 h-7 text-white" />
            </div>
            <span className="text-4xl font-bold text-white">PetNest</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-[#1E2937] rounded-3xl p-10 shadow-2xl border border-gray-800">
          <h1 className="text-3xl font-bold text-center mb-2">Create your account</h1>
          <p className="text-gray-400 text-center mb-8">
            Start your adoption journey today 🐾
          </p>

          {/* Google Button */}
          <button className="w-full bg-[#334155] hover:bg-[#475569] transition py-3.5 rounded-2xl flex items-center justify-center gap-3 mb-6">
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            <span className="font-medium">Continue with Google</span>
          </button>

          <div className="relative text-center my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative text-xs text-gray-500 bg-[#1E2937] px-4">
              or register with email
            </div>
          </div>

          <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
            <TextField
            isRequired
            name="name"
            validate={(value) => {
              if (value.length < 3) {
                return "Name must be at least 3 characters";
              }
              return null;
            }}
          >
            <Label>Name</Label>
            <Input placeholder="John Doe" />
            <FieldError />
          </TextField>
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
            name="imageurl"
            validate={(value) => {
              if (value.length < 3) {
                return "Image URL must be at least 3 characters";
              }
              return null;
            }}
          >
            <Label>Image URL</Label>
            <Input placeholder="https://example.com/image.jpg" />
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
      <TextField
        isRequired
        minLength={8}
        name="confirmPassword"
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
        <Label>Confirm Password</Label>
        <Input placeholder="Enter your password again" />
        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
        <FieldError />
      </TextField>
      <div className="flex gap-2">
        <Button type="submit">
          <Check />
          Submit
        </Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
      </div>
    </Form>

          <p className="text-center text-gray-400 mt-8">
            Already have an account?{" "}
            <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
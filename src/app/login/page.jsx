"use client";

import { useState } from "react";
import Link from "next/link";
import { PawPrint } from "lucide-react";
import toast from "react-hot-toast";
import { Check } from "@gravity-ui/icons";
import { useRouter } from "next/navigation";

import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

import { authClient } from "../../lib/auth-client";

const Login = () => {

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const data = new FormData(form);
    const loginData = Object.fromEntries(data.entries());

    console.log(loginData);

    try {
      setIsLoading(true);

      const { data: user, error } =
        await authClient.signIn.email(
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
              form.reset();
              router.push("/");
            },

            onError: (ctx) => {
              toast.error(ctx.error.message);
            },
          }
        );

      console.log(user);
      console.log(error);

    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
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

            <span className="text-4xl font-bold">
              PetNest
            </span>

          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl p-10 shadow-2xl border border-gray-200">

          <h1 className="text-3xl font-bold text-center mb-1">
            Welcome back!
          </h1>

          <p className="text-gray-400 text-center mb-8">
            Sign in to continue to PetNest
          </p>

          {/* Google Button */}
          <button
            type="button"
            className="w-full border border-gray-300 hover:bg-gray-100 transition py-3.5 rounded-2xl flex items-center justify-center gap-3 mb-6"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5"
            />

            <span className="font-medium">
              Continue with Google
            </span>
          </button>

          {/* Divider */}
          <div className="relative text-center my-6">

            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>

            <div className="relative text-xs text-gray-500 bg-white px-4">
              or sign in with email
            </div>
          </div>

          {/* Form */}
          <Form
            className="w-full flex flex-col gap-4"
            onSubmit={onSubmit}
          >

            {/* Email */}
            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) => {
                if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                ) {
                  return "Please enter a valid email address";
                }

                return null;
              }}
            >
              <Label>Email</Label>

              <Input placeholder="john@example.com" />

              <FieldError />
            </TextField>

            {/* Password */}
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

              <Description>
                Must be at least 8 characters with 1 uppercase and 1 number
              </Description>

              <FieldError />
            </TextField>

            {/* Buttons */}
            <div className="flex gap-2 w-full">

              <Button
                type="submit"
                isDisabled={isLoading}
                className="flex-1"
              >
                <Check />

                {isLoading ? "Loading..." : "LogIn"}
              </Button>

              <Button
                type="reset"
                variant="secondary"
                className="flex-1"
              >
                Cancel
              </Button>

            </div>
          </Form>

          {/* Register Link */}
          <p className="text-center mt-8">
            Don't have an account?{" "}

            <Link
              href="/register"
              className="text-purple-500 hover:text-purple-700 font-medium"
            >
              Create one free
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;
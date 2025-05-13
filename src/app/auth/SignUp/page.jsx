"use client";
import axios from "axios";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await axios.post("/api/signUp", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setName("");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error("Error submitting data to the API:", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex justify-center items-center px-4">
      <Card className="w-full max-w-md border border-black shadow-md rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-black">Register</CardTitle>
          <p className="text-sm text-gray-600 mt-1">
            Welcome! Please register to continue.
          </p>
        </CardHeader>

        <CardContent>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name" className="text-black">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Type your Name"
                className="text-black"
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-black">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Type your Email"
                className="text-black"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-black">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type your password"
                className="text-black"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-neutral-800"
            >
              Submit
            </Button>
          </form>
           <p className="text-center text-sm text-black mt-6">
            If you are already registered,{" "}
            <Link href={"/auth/signIn"}>
              <span className="text-blue-600 underline cursor-pointer">
                sign here
              </span>
            </Link>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/login",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      localStorage.setItem(
        "token",
        data.token
      );

      router.push("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="space-y-4 w-[300px]">

        <input
          className="border p-2 w-full"
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          className="border p-2 w-full"
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="bg-black text-white p-2 w-full"
          onClick={handleLogin}
        >
          Login
        </button>

      </div>
    </div>
  );
}
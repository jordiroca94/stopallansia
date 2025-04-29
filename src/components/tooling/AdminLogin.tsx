"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const locale = useLocale();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      localStorage.setItem("admin", "true");

      router.push(`/${locale}/admin/dashboard`);
    } else {
      const data = await res.json();
      setError(data.error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAdmin = localStorage.getItem("admin");
      if (isAdmin == "true") {
        router.push(`/${locale}/admin/dashboard`);
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 -mt-[88px] px-4 text-black">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Admin Login</h2>
          <p className="text-gray-600 mt-1">
            Enter your credentials to access the admin dashboard.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          {error && <div className="text-red">{error}</div>}
          <div>
            <button
              type="submit"
              className="sm:w-fit my-4 flex justify-center font-bold text-base uppercase border-black bg-white border py-3 px-6 rounded-md hover:bg-black hover:text-white"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

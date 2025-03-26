"use client";
import { useMutation } from "@apollo/client";
import { LoginUser } from "@/graphql/graphql";
import { useEffect } from "react";
import Form from "next/form";
import { useRouter } from "next/navigation";

const Login = () => {
  const [loginUser, { loading, error, data }] = useMutation(LoginUser);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const response = await loginUser({
        variables: {
          username: formData.get("email"),
          password: formData.get("password"),
        },
      });
      const accessToken = response.data.login.authToken;
      const refreshToken = response.data.login.refreshToken;
      localStorage.setItem(
        "authTokens",
        JSON.stringify({
          createdTime: Date.now(),
          accessToken: accessToken,
          refreshToken: refreshToken,
        })
      );
      router.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 p-10 w-[300px]"
    >
      <input
        required
        name="email"
        type="email"
        className="border-1 border-red-500 w-full p-2"
        placeholder="Email"
      />
      <input
        required
        name="password"
        type="password"
        className="border-1 border-red-500 w-full p-2"
        placeholder="Password"
      />
      <button
        className="bg-red-500 p-2 w-full"
        type="submit"
        disabled={loading}
      >
        {loading ? "Logging In..." : "Login"}
      </button>
    </Form>
  );
};

export default Login;

"use client";

import Form from "next/form";
import { useMutation } from "@apollo/client";
import { RegisterUser } from "@/graphql/graphql";
import { useRouter } from "next/navigation";

const Register = () => {
  const [registerUser, { loading, error, data }] = useMutation(RegisterUser);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const response = await registerUser({
        variables: {
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          email: formData.get("email"),
          password: formData.get("password"),
        },
      });
      console.log("Register successful", response.data);
      router.push("/login");
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
        name="firstName"
        type="text"
        className="border-1 border-red-500 w-full p-2"
        placeholder="First name"
      />
      <input
        required
        name="lastName"
        type="text"
        className="border-1 border-red-500 w-full p-2"
        placeholder="Last name"
      />
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
        {loading ? "Submiting..." : "Submit"}
      </button>
    </Form>
  );
};

export default Register;

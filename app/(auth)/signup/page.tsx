"use client";

import Link from "next/link";

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  //@ts-ignore
  const name = e.target[0].value;
  //@ts-ignore
  const email = e.target[1].value;
  //@ts-ignore
  const password = e.target[2].value;

  try {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
  } catch (e) {
    console.error(e);
  }
};

const Register = () => {
  return (
    <div>
      <h1>Create an account</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />

        <button type="submit">Register</button>
      </form>
      <span>or</span>
      <Link href="/login">Login with existing account</Link>
    </div>
  );
};

export default Register;
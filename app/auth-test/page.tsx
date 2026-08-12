"use client";

import { signIn } from "next-auth/react";

export default function AuthTestPage() {
  const handleGoogle = async () => {
    const result = await signIn("google", {
      redirect: false,
      callbackUrl: "/auth-test",
    });

    if (result?.url) {
      window.open(result.url, "_blank", "width=600,height=700");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-6 text-2xl font-bold">Test Google Authentication</h1>

        <button
          type="button"
          onClick={handleGoogle}
          className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          Sign in with Google
        </button>
      </div>
    </main>
  );
}
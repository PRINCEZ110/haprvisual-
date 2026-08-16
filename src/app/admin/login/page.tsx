import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import LoginForm from "./LoginForm";

export default async function AdminLogin() {
  const session = await getSession();
  if (session) redirect("/admin/dashboard");

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-md border border-line bg-white/50 p-8 lg:p-10">
        <h1 className="font-serif text-4xl italic">Admin login</h1>
        <p className="mt-2 text-sm text-muted">
          Sign in to manage projects, services and submissions.
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
"use client";
import Link from "next/link";
export default function ErrorPage({ error, reset }) {
  return (
    <div className="grid w-full h-full p-4 place-items-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-500">Something went wrong!</h1>
        <Link href={"/"} className="px-4 py-2 mt-8 text-white bg-blue-500 rounded">
                Back to Home
        </Link>
      </div>
    </div>
  );
}
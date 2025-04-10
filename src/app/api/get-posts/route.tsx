import { NextResponse } from "next/server";

export async function GET() {
  const posts = await fetch("https://snub-yeah.github.io/Security-Writeups/posts.json").then((res) => res.json());
  return NextResponse.json(posts);
}

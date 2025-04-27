import { NextResponse } from "next/server";

export async function GET() {
  const posts = await fetch("https://cdn.jsdelivr.net/gh/snub-yeah/Security-Writeups/posts.json").then((res) => res.json());
  return NextResponse.json(posts);
}

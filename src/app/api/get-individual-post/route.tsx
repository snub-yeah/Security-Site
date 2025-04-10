import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    try {
  const { searchParams } = new URL(request.url)
  // get the id from the url and attempt to parse it as an integer
  const stringId = searchParams.get('id')
  if (!stringId) {
    return NextResponse.json({ error: "Must provide a post ID" }, { status: 400 });
  }
  const id = parseInt(stringId)

  // fetch the posts from the json file
  const posts = await fetch("https://snub-yeah.github.io/Security-Writeups/posts.json").then((res) => res.json());

  // check if the posts are an array. if you're wondering why it is 'posts.posts', it's because there's a nested 'posts' object in the json file
  if (!Array.isArray(posts.posts)) {
    return NextResponse.json({ error: "Invalid posts data format" }, { status: 500 });
  }

  // find the post with the given id
  const post = posts.posts.find((post: any) => post.id == id);

  // if the post is not found, return a 404 error
  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  // fetch the markdown file for the post
  const markdown = await fetch(`https://snub-yeah.github.io/Security-Writeups/${post.path}`).then((res) => res.text());

  // replace relative image paths with full GitHub URLs. shoutout Claude for this one
  const transformedMarkdown = markdown.replace(
    /!\[([^\]]*)\]\(\.\/([^)]+)\)/g,
    `![$1](https://snub-yeah.github.io/Security-Writeups/${post.path.split('/').slice(0, -1).join('/')}/$2)`
  );

  // return the transformed markdown
  return NextResponse.json({ markdown: transformedMarkdown })
    } catch {
        return new Response(JSON.stringify({ error: 'Failed to fetch post' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}
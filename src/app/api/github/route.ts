import { NextResponse } from "next/server";

export async function GET() {
  const GITHUB_USERNAME = "DevSankalp";

  const url = `https://api.github.com/users/${GITHUB_USERNAME}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });

  const data = await res.json();
  return NextResponse.json(data);
}

import { NextResponse } from "next/server";

type GithubUser = {
  public_repos: number;
  followers: number;
  following: number;
};

type GithubRepo = {
  stargazers_count: number;
  forks_count: number;
};

const USERNAME = "Tayyab-742002";
const GITHUB_API = "https://api.github.com";

export const revalidate = 3600; // 1 hour ISR for route segment

export async function GET() {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "devfolio-v2",
  };

  // Optional token to avoid low rate limits in production
  const token = process.env.GITHUB_TOKEN;
  if (token) headers["Authorization"] = `Bearer ${token}`;

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`${GITHUB_API}/users/${USERNAME}`, {
        headers,
        next: { revalidate },
      }),
      fetch(`${GITHUB_API}/users/${USERNAME}/repos?per_page=100`, {
        headers,
        next: { revalidate },
      }),
    ]);

    if (!userRes.ok) {
      return NextResponse.json(
        { error: "Failed to fetch user" },
        { status: userRes.status }
      );
    }
    if (!reposRes.ok) {
      return NextResponse.json(
        { error: "Failed to fetch repos" },
        { status: reposRes.status }
      );
    }

    const user: GithubUser = await userRes.json();
    const repos: GithubRepo[] = await reposRes.json();

    const totalStars = repos.reduce(
      (sum, r) => sum + (r.stargazers_count || 0),
      0
    );
    const totalForks = repos.reduce((sum, r) => sum + (r.forks_count || 0), 0);

    return NextResponse.json(
      {
        username: USERNAME,
        followers: user.followers,
        following: user.following,
        publicRepos: user.public_repos,
        stars: totalStars,
        forks: totalForks,
      },
      {
        headers: {
          "Cache-Control": "s-maxage=3600, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}

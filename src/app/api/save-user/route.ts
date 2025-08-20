import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { user, repos } = await req.json();

    if (!user || !repos) {
      return NextResponse.json({ error: "Missing user or repos" }, { status: 400 });
    }

    // Save User
    const savedUser = await prisma.user.upsert({
      where: { username: user.login },
      update: {
        name: user.name,
        avatarUrl: user.avatar_url,
        bio: user.bio,
        location: user.location,
        profileUrl: user.html_url,
      },
      create: {
        username: user.login,
        name: user.name,
        avatarUrl: user.avatar_url,
        bio: user.bio,
        location: user.location,
        profileUrl: user.html_url,
      },
    });

    // Save Repositories
    for (const repo of repos) {
      await prisma.repository.upsert({
        where: { name: repo.name },
        update: {
          url: repo.html_url,
          stars: repo.stargazers_count,
          language: repo.language,
        },
        create: {
          name: repo.name,
          url: repo.html_url,
          stars: repo.stargazers_count,
          language: repo.language,
          userId: savedUser.id,
        },
      });
    }

    return NextResponse.json({ message: "User and repos saved successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

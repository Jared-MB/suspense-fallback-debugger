import { Card, CardDescription } from "@workspace/ui/components/card";
import Image from "next/image";
import { always_render_Suspense as Suspense } from "suspense-fallback-debugger/internal";
import { formatDistance } from "date-fns";
import { ENV } from "@/lib/constants";
import Link from "next/link";
import { wait } from "@/lib/wait";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { ViewTransition } from "react";
import type { Route } from "next";

export function SlowComponent() {
  return (
    <section className="space-y-6">
      <div className="grid md:grid-cols-[45%_1fr] gap-4">
        <ViewTransition>
          <Suspense fallback={<UserDataSkeleton />} name="user-data">
            <UserData />
          </Suspense>
        </ViewTransition>
        <ViewTransition>
          <Suspense fallback={<UserStatsSkeleton />} name="user-stats">
            <UserStats />
          </Suspense>
        </ViewTransition>
      </div>
      <ViewTransition>
        <Suspense
          fallback={<UserRecentActivitySkeleton />}
          name="user-recent-activity"
        >
          <UserRecentActivity />
        </Suspense>
      </ViewTransition>
    </section>
  );
}

const fetchUserData = async (): Promise<{
  name: string;
  email: string;
  avatar: string;
  startedAt: string;
}> => {
  const response = await fetch("https://api.github.com/users/Jared-MB", {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    method: "GET",
  });

  const rawUser = await response.json();

  const user = {
    name: rawUser.name,
    email: rawUser.email,
    avatar: rawUser.avatar_url,
    startedAt: rawUser.created_at,
  };

  /**
   * Simulate slow network request
   */
  await wait(500);

  return user;
};

async function UserData() {
  const userData = await fetchUserData();

  return (
    <Card className="flex-row items-center space-x-4 p-6">
      <Image
        src={userData.avatar}
        alt={userData.name}
        height={80}
        width={80}
        className="w-20 h-20 rounded-full border-4 border-background shadow-lg object-cover"
      />
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-foreground">{userData.name}</h2>
        <p className="text-muted-foreground">{userData.email}</p>
        <div className="flex items-center space-x-4 mt-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
            Active User
          </span>
          <span className="text-sm text-muted-foreground">
            Joined{" "}
            {formatDistance(new Date(userData.startedAt), new Date(), {
              addSuffix: true,
            })}
          </span>
        </div>
      </div>
    </Card>
  );
}

function UserDataSkeleton() {
  return (
    <Card className="flex-row items-center space-x-4 p-6">
      <div className="w-20 h-20 rounded-full border-4 border-background shadow-lg object-cover bg-accent" />
      <div className="flex-1">
        <Skeleton className="w-3/5 h-7" />
        <div className="flex items-center space-x-4 mt-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary w-21 h-5"></span>
          <Skeleton className="w-2/4 h-5" />
        </div>
      </div>
    </Card>
  );
}

const fetchUserStats = async (): Promise<{
  stats: { posts: number; followers: number; following: number };
}> => {
  const response = await fetch("https://api.github.com/users/Jared-MB", {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    method: "GET",
  });

  const rawUser = await response.json();

  const stats = {
    posts: rawUser.public_repos,
    followers: rawUser.followers,
    following: rawUser.following,
  };

  /**
   * Simulate slow network request
   */
  await wait(750);

  return { stats };
};

async function UserStats() {
  const userData = await fetchUserStats();
  return (
    <div className="grid grid-cols-3 gap-4 h-full">
      <Card className="text-center h-full justify-center items-center gap-2">
        <div className="text-2xl font-bold text-primary">
          {userData.stats.posts}
        </div>
        <CardDescription>Public Repos</CardDescription>
      </Card>
      <Card className="text-center h-full justify-center items-center gap-2">
        <div className="text-2xl font-bold text-primary">
          {userData.stats.followers.toLocaleString()}
        </div>
        <CardDescription>Followers</CardDescription>
      </Card>
      <Card className="text-center h-full justify-center items-center gap-2">
        <div className="text-2xl font-bold text-primary">
          {userData.stats.following}
        </div>
        <CardDescription>Following</CardDescription>
      </Card>
    </div>
  );
}

function UserStatsSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-4 h-full">
      <Card className="text-center h-full justify-center items-center gap-2">
        <Skeleton className="w-12 h-6" />
        <Skeleton className="w-20 h-4 mt-2 bg-primary/10" />
      </Card>
      <Card className="text-center h-full justify-center items-center gap-2">
        <Skeleton className="w-12 h-6" />
        <Skeleton className="w-20 h-4 mt-2 bg-primary/10" />
      </Card>
      <Card className="text-center h-full justify-center items-center gap-2">
        <Skeleton className="w-12 h-6" />
        <Skeleton className="w-20 h-4 mt-2 bg-primary/10" />
      </Card>
    </div>
  );
}

const fetchUserRecentActivity = async (): Promise<{
  recentActivity: {
    name: string;
    id: string;
    updatedAt: string;
    url: string;
  }[];
}> => {
  const response = await fetch(
    "https://api.github.com/users/Jared-MB/repos?type=owner&per_page=5&sort=pushed",
    {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        Authorization: `Bearer ${ENV.GITHUB_ACCESS_TOKEN}`,
      },
      method: "GET",
    }
  );

  const rawUser = await response.json();

  const recentActivity = rawUser
    .map((repo: any) => ({
      name: repo.name,
      id: repo.id,
      updatedAt: repo.updated_at,
      url: repo.html_url,
    }))
    .sort(
      (a: { updatedAt: string }, b: { updatedAt: string }) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

  /**
   * Simulate slow network request
   */
  await wait(1000);

  return { recentActivity };
};

async function UserRecentActivity() {
  const userData = await fetchUserRecentActivity();
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
      <div className="space-y-2">
        {userData.recentActivity.map((activity, index) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: No complex keys here because this is a static array
            key={index}
            className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg"
          >
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-sm text-foreground">
              <Link
                href={activity.url as Route}
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong className="font-mono">{activity.name}</strong>
              </Link>{" "}
              repository updated{" "}
              <span className="font-semibold">
                {formatDistance(new Date(activity.updatedAt), new Date(), {
                  addSuffix: true,
                })}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function UserRecentActivitySkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="w-36 h-5 mb-5" />
      <div className="space-y-2">
        <div className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
          <Skeleton className="w-2/5 h-5 bg-primary/10" />
        </div>
        <div className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
          <Skeleton className="w-2/5 h-5 bg-primary/10" />
        </div>
        <div className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
          <Skeleton className="w-2/5 h-5 bg-primary/10" />
        </div>
        <div className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
          <Skeleton className="w-2/5 h-5 bg-primary/10" />
        </div>
        <div className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
          <Skeleton className="w-2/5 h-5 bg-primary/10" />
        </div>
      </div>
    </div>
  );
}

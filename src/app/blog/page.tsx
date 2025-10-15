"use client";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BlogListingSkeleton from "@/components/skeleton/BlogListingSkeleton";
import { useQuery } from "@tanstack/react-query";
import { fetchBlog } from "@/helpers/apiActions";
import { BASE_URL } from "@/constant/data";
import { truncateText } from "@/helpers/normalHelperFunction";
import Banner from "@/components/ContentPageBanner";

export default function BlogListingPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["blogPage"],
    queryFn: async () => {
      const response = await fetchBlog();
      if (response) return response;
    },
  });

  if (isLoading || !data) return <BlogListingSkeleton />;

  const featuredPost = data.Latest_Blogs[0];
  const otherBlogs = data.Blogs.filter((el) => el.slug !== featuredPost.slug);

  return (
    <>
      <Banner title="Blogs" />
      <section>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8">Our Blog</h1>
          <div className="mb-16">
            <Card>
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative h-[300px] md:h-auto">
                    <Image
                      src={BASE_URL + featuredPost.image}
                      alt={featuredPost.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <h2 className="text-3xl font-bold mb-4">
                        <Link
                          href={`/blog/${featuredPost.slug}`}
                          className="hover:underline"
                        >
                          {featuredPost.title}
                        </Link>
                      </h2>
                      <p className="text-gray-600 mb-4">
                        {truncateText(featuredPost.short, 30)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <CalendarDays className="w-4 h-4 mr-2" />
                        <span>{featuredPost.postdate}</span>
                      </div>
                      <Button asChild>
                        <Link href={`/blog/${featuredPost.slug}`}>
                          Read More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherBlogs.map((post) => (
              <Card key={post.slug}>
                <CardContent className="p-0">
                  <div className="relative h-48">
                    <Image
                      src={BASE_URL + post.image}
                      alt={post.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:underline"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {truncateText(post.short, 20)}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4"></div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <CalendarDays className="w-4 h-4 mr-2" />
                        <span>{post.postdate}</span>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/blog/${post.slug}`}>Read More</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

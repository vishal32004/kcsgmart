"use client";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BlogDetailSkeleton from "@/components/skeleton/BlogDetailSkeleton";
import { fetchBlogDetail } from "@/helpers/apiActions";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { truncateText } from "@/helpers/normalHelperFunction";
import { BASE_URL } from "@/constant/data";

export default function BlogDetailPage() {
  const params = useParams();
  const slug = (params.blogSlug as string) || "";
  const { data, isLoading, error } = useQuery({
    queryKey: ["blogDetailPage",slug],
    queryFn: async () => {
      const response = await fetchBlogDetail(slug);
      if (response) return response;
    },
  });

  if (isLoading || !data) return <BlogDetailSkeleton />;
  const blogPost = data.BlogData[0];
  const latestPosts = data.Latest_Blogs;
  const tags = data.Blog_Tags;
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <article className="lg:w-2/3">
          <Image
            src={BASE_URL + blogPost.image}
            alt={blogPost.title}
            width={800}
            height={400}
            className="w-full h-[400px] object-cover rounded-lg mb-8"
          />
          <h1 className="text-4xl font-bold mb-4">{blogPost.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-500 mb-6">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              <span>KCSG- Mart</span>
            </div>
            <div className="flex items-center">
              <CalendarDays className="w-4 h-4 mr-2" />
              <span>{blogPost.postdate}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>{blogPost.view_count}</span>
            </div>
          </div>
          <div
            className="prose max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: blogPost.body }}
          />
          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map((tag) => (
              <Badge key={tag.id} variant="secondary">
                {tag.name}
              </Badge>
            ))}
          </div>
        </article>

        <aside className="lg:w-1/3">
          <div className="sticky top-8">
            <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>
            <div className="space-y-6">
              {latestPosts.map((post) => (
                <Card key={post.slug}>
                  <CardContent className="p-4 flex gap-4">
                    <Image
                      src={BASE_URL + post.image}
                      alt={post.title}
                      width={100}
                      height={100}
                      className="w-[100px] h-[100px] object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="hover:underline"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {truncateText(post.short, 15)}
                      </p>
                      <time className="text-xs text-gray-500">
                        {post.postdate}
                      </time>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8">
              <Button asChild className="w-full">
                <Link href="/blog">View All Posts</Link>
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Blog = ({ blogs }) => {
  return (
    <div>
      {blogs?.sort(
          (a, b) =>
            new Date(b.data.find((item) => item.type === 'timeStamp').date) -
            new Date(a.data.find((item) => item.type === 'timeStamp').date)
        )
        .map((blog, index) => (
          <div
            key={blog.id}
            className={`${
              index !== blogs.length - 1 ? 'border-b border-gray-300' : ''
            } mr-0 tablet:mr-6 pb-14`}
          >
            <Link
              href={
                blog.data.find((item) => item.type === 'link')?.name ||
                `/artikel/${blog.slug}`
              }
            >
              <h3 className={`mb-4 ${index !== 0 ? 'mt-6' : ''} font-semibold`}>
                {blog.data.find((item) => item.type === 'headline')?.text}
              </h3>
              <div className="flex flex-col tablet:flex-row gap-4">
                <div
                  className="w-full tablet:hidden grow h-[170px] rounded-lg bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${
                      blog.data.find((item) => item.type === 'img')?.src
                    })`,
                  }}
                />
                <Image
                  src={blog.data.find((item) => item.type === 'img')?.src}
                  alt={blog.data.find((item) => item.type === 'img')?.alt}
                  width={215}
                  height={300}
                  className="hidden tablet:flex rounded"
                />
                <div>
                  <p className="mb-2">
                    {blog.data
                      .find((item) => item.type === 'excerp')
                      ?.text.slice(0, 200)}
                    ...
                  </p>
                  <p className="font-bold">
                    {blog.data.find((item) => item.type === 'author')?.name} |{' '}
                    {blog.data.find((item) => item.type === 'timeStamp')?.date}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Blog;

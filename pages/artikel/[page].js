import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Article = () => {
  const [blog, setBlog] = useState([]);
  const router = useRouter();
  const { page } = router.query;


  const getData = async () => {
    try {
      const response = await axios.get('/api/blogg').then((res) => res.data);

      if (!response || !Array.isArray(response)) {
        throw new Error('Invalid data');
      }

      const objWithSlug = response.find(
        (obj) => obj.slug === page
      );
      setBlog(objWithSlug);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-gray-light text-black dark:text-white pt-[175px] pb-[100px] px-4">
      <div className="max-w-[1000px] mx-auto">
        <div>
          {blog?.data?.map((item, index) => {
            switch (item.type) {
              case 'headline':
                return (
                  <div key={index}>
                    <h3 key={index} className={item.className}>
                      {item.text}
                    </h3>
                  </div>
                );
              case 'paragraph':
                return (
                  <div key={index}>
                    <p key={index} className={item.className}>
                      {item.text}
                    </p>
                  </div>
                );
              case 'img':
                return (
                  <div key={index}>
                    <img
                      key={index}
                      src={item.src}
                      alt={item.alt}
                      className={item.className}
                    />
                  </div>
                );
              case 'timeStamp':
                return (
                  <div key={index}>
                    <p key={index} className={item.className}>
                      {item.date}
                    </p>
                  </div>
                );
              case 'author':
                return (
                  <div key={index}>
                    <h4 key={index} className={item.className}>
                      {item.name}
                    </h4>
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Article;

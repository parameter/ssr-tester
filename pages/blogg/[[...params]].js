import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Archive from '@/components/Blog/Archive';
import Blog from '@/components/Blog/Blog';

import axios from 'axios';

const Blogg = () => {
  const [blogs, setBlogs] = useState([]);
  const router = useRouter();
  const params = router.query.params;

  

  useEffect(() => {
    axios.get('/api/blogg').then((res) => {
      const data = res.data;
      if (params?.length === 1) {
        const filterBlogs = data.filter((item) =>
          item.data.some((d) => d.type === 'timeStamp' && d.year === params[0])
        );
        setBlogs(filterBlogs);
      } else if (params?.length === 2) {
        const filteredBlogs = data.filter((item) =>
          item.data.some(
            (d) =>
              d.type === 'timeStamp' &&
              d.year === params[0] &&
              d.month === params[1]
          )
        );
        setBlogs(filteredBlogs);
      } else {
        setBlogs(data);
      }
    });
  }, [params]);

  return (
    <div className="bg-gray-light text-black dark:text-white pt-[175px] pb-[100px] px-4">
      <div className="max-w-[1000px] mx-auto">
        <h1 className="text-center pb-[50px] mb-2 ">Blogg</h1>
        <div className="flex flex-col tablet:flex-row">
          <div className="flex-1 tablet:border-r tablet:border-gray-300 tablet:mr-6">
            <Blog blogs={blogs} />
          </div>
          <Archive blogs={blogs} />
        </div>
      </div>
    </div>
  );
};

export default Blogg;
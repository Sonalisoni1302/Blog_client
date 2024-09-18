import React, { useEffect, useState } from "react";
import AnimationWrapper from "../common/pageAnimation";
import InNavigation from "../component/InNavigation";
import axios from "axios";
import Loader from "../component/Loader";
import BlogCard from "../component/BlogCards";
import MinimalBlogs from "../component/minimalBlogs";

const Home = () => {
  let [blogs, setBlog] = useState([]);
  let [trendingBlogs, setTrendingBlogs] = useState([]);

  const fetchLatestBlogs = () => {
    axios
      .get("http://localhost:5000" + "/blog/latest-blogs")
      .then(({ data }) => {
        setBlog(data.all_blogs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchTrendingBlogs = () => {
    axios
      .get("http://localhost:5000" + "/blog/trending-blogs")
      .then(({ data }) => {
        setTrendingBlogs(data.all_blogs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchLatestBlogs();
    fetchTrendingBlogs();
  }, []);

  return (
    <>
      <AnimationWrapper>
        <section className="h-cover flex justify-center gap-10">
          <div className="w-full">
            <InNavigation
              routes={["home", "trending blogs"]}
              defaultHidden={["trending blogs"]}
            >
              <div>
                {blogs == null ? (
                  <Loader />
                ) : (
                  blogs.map((blog, i) => (
                    <AnimationWrapper
                      transition={{ duration: 1, delay: i * 0.1 }}
                      key={i}
                    >
                      <BlogCard
                        content={blog}
                        author={blog.author_id.personal_Info}
                      />
                    </AnimationWrapper>
                  ))
                )}
              </div>

              {trendingBlogs == null ? (
                <Loader />
              ) : (
                trendingBlogs.map((blog, i) => (
                  // <AnimationWrapper
                  //   transition={{ duration: 1, delay: i * 0.1 }}
                  //   key={i}
                  // >
                    console.log({blog})
                    // <MinimalBlogs/>
                  // </AnimationWrapper>
                ))
              )}
            </InNavigation>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default Home;

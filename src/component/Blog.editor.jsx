import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import AnimationWrapper from "../common/pageAnimation";
import defaultBanner from "../images/defaultBanner.png";
import { EditorContext } from "../pages/editor";
import { useContext, useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import { tools } from "./tools";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { UserContext } from "../App";

const BlogEditor = () => {
  let {
    userAuth: { token },
  } = useContext(UserContext);
  let navigate = useNavigate();

  let {
    blog,
    blog: { title, banner, content, tags, des },
    setBlog,
    textEditor,
    setTextEditor,
    setEditorState,
  } = useContext(EditorContext);

  useEffect(() => {
    // if (!textEditor.isReady) {
      setTextEditor(
        new EditorJS({
          holder: "textEditor",
          data: content,
          tools: tools,
          placeholder: "Let's write ann awesome story",
        })
      );
    // }
  }, []);

  const handleBannerUpload = (e) => {
    console.log(e);
    let img = e.target.files[0];
    console.log(img);
  };

  const handleTitleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const handleTitleChage = (e) => {
    let input = e.target;

    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";

    setBlog({ ...blog, title: input.value });
  };

  const handlePublishEvent = () => {
    // if(!banner.length){
    //     return toast.error("Upload a blog banner to publish it");
    // }

    if (!title.length) {
      return toast.error("Write blog title to publish it");
    }

    if (textEditor.isReady) {
      textEditor
        .save()
        .then((data) => {
          if (data.blocks.length) {
            setBlog({ ...blog, content: data });
            setEditorState("publish");
            //                 console.log(data);
          } else {
            return toast.error("write something in your blog publish it");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleSaveDraft = (e) => {
    if (e.target.classList.contains("disable")) {
      return;
    }

    if (!title.length) {
      return toast.error("write Blog title");
    }

    let loadingToast = toast.loading("saving Draft...");

    e.target.classList.add("disable");

    if (textEditor.isReady) {
      textEditor.save().then((content) => {
        let blogObj = { title, banner, des, content, tags, draft: true };

        axios
          .post("http://localhost:5000" + "/blog/create-blog", blogObj, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            e.target.classList.remove("disable");

            toast.dismiss(loadingToast);
            toast.success("Drafted");

            setTimeout(() => {
              navigate("/");
            }, 500);
          })
          .catch((error) => {
            e.target.classList.remove("disable");
            toast.dismiss(loadingToast);
            console.log(error);

            return toast.error(error.response.data.error);
          });
      });
    }
  };

  return (
    <>
      <nav className="navbar">
        <Toaster />
        <Link to="/" className="flex-none w-10">
          <img src={logo} />
        </Link>
        <p className="max-md:hidden text-black line-clamp-1 w-full">
          {title.length ? title : "New Blog"}
        </p>

        <div className="flex gap-4 ml-auto">
          <button className="btn-dark py-2" onClick={handlePublishEvent}>
            Publish
          </button>
          <button className="btn-light py-2" onClick={handleSaveDraft}>
            Save Draft
          </button>
        </div>
      </nav>

      <AnimationWrapper>
        <section>
          <div className="mx-auto max-w-[900px] w-full">
            <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-grey">
              <label htmlFor="uploadBanner">
                <img src={defaultBanner} className="z-20" />
                <input
                  id="uploadBanner"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  hidden
                  onClick={handleBannerUpload}
                />
              </label>
            </div>

            <textarea
              defaultValue={title}
              placeholder="Blog Title"
              className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40"
              onKeyDown={handleTitleKeyDown}
              onChange={handleTitleChage}
            ></textarea>

            <hr className="w-full opacity-10 my-5" />

            <div id="textEditor" className="font-gelasio"></div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default BlogEditor;

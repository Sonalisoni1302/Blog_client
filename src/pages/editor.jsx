import React, { createContext, useContext, useState } from "react";
import { UserContext } from "../App";
import { Navigate } from "react-router-dom";
import Publish from "../component/publishForm";
import BlogEditor from "../component/Blog.editor";

const blogStructure = {
    title : '',
    banner : '',
    content : [],
    tags : [],
    des : '',
    author : {personal_Info : {}}
}

export const EditorContext = createContext({ });

const Editor = () => {

    const [blog, setBlog] = useState(blogStructure);
    const [editorState, setEditorState] = useState("editor");
    const [textEditor, setTextEditor] = useState({isReady : true});
    

    let {userAuth : {token}} = useContext(UserContext);

    return(
        <EditorContext.Provider value = {{blog, setBlog, editorState, setEditorState, textEditor, setTextEditor}}>
            {
                token === undefined ? 
                (<Navigate to="/user/signin"/>        
                ) : (
                        editorState === "editor" ? <BlogEditor/> : <Publish/>
                )
            }
        </EditorContext.Provider>
    )
}

export default Editor;

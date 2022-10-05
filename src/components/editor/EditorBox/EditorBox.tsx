import { Editor, EditorProps } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import React, { useRef, Dispatch, SetStateAction } from "react";
import { useS3Upload } from "next-s3-upload";

interface EditorUiProps extends EditorProps {
  theme: string;
  height: string;
  onChange: Dispatch<SetStateAction<string>>;
}
const EditorBox = ({ height, theme, onChange }: EditorUiProps) => {
  const editorRef = useRef<Editor>(null);
  const { uploadToS3 } = useS3Upload();
  const onChangeText = () => {
    if (!editorRef.current) return;
    const data = editorRef.current.getInstance().getMarkdown();
    onChange(data);
  };

  const uploadImage = async (file: File) => {
    const { url } = await uploadToS3(file);
    return url;
  };

  const addImageBolb = async (
    blob: any,
    callback: (url: string, text: string) => void,
  ) => {
    const uploadedImageURL = await uploadImage(blob);
    callback(uploadedImageURL, "alt text");
  };

  return (
    <>
      <Editor
        height={height}
        theme={theme}
        onChange={onChangeText}
        hooks={{
          addImageBlobHook: async (blob, callback) =>
            addImageBolb(blob, callback),
        }}
        ref={editorRef}
      />
    </>
  );
};

export default EditorBox;
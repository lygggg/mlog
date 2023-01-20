import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { EditorContainer } from "src/components/editor";

const Write: NextPage = () => {
  const { data: session } = useSession();

  if (!session?.isAdmin) {
    console.log("관리자만 접근할 수 있습니다.");
  }

  return (
    <>
      <EditorContainer />
    </>
  );
};

export default Write;

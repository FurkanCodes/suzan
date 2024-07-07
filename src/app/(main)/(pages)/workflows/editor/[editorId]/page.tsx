import { ConnectionsProvider } from "@/providers/connection-provider";
import EditorProvider from "@/providers/editor-provider";
import React from "react";
import Editor from "./_components/editor";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="h-full">
      <EditorProvider>
        <ConnectionsProvider>
          <Editor />
        </ConnectionsProvider>
      </EditorProvider>
    </div>
  );
};

export default Page;

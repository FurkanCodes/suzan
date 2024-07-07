import { EditorState } from "@/providers/editor-provider";
import { useSuzanStore } from "@/store";

import React from "react";
import ContentBasedOnTitle from "./content-title";
import { ConnectionProviderProps } from "@/providers/connection-provider";

type Props = {
  state: EditorState;
  nodeConnection: ConnectionProviderProps;
};

const RenderOutputAccordion = ({ state, nodeConnection }: Props) => {
  const {
    googleFile,
    setGoogleFile,
    selectedSlackChannels,
    setSelectedSlackChannels,
  } = useSuzanStore();
  return (
    <ContentBasedOnTitle
      nodeConnection={nodeConnection}
      newState={state}
      file={googleFile}
      setFile={setGoogleFile}
      selectedSlackChannels={selectedSlackChannels}
      setSelectedSlackChannels={setSelectedSlackChannels}
    />
  );
};

export default RenderOutputAccordion;

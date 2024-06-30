import { SignIn } from "@clerk/nextjs";
import React from "react";

type Props = {};

function page({}: Props) {
  return (
    <div>
      <SignIn />
    </div>
  );
}

export default page;

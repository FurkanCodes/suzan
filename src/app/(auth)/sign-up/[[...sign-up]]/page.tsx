import { SignUp } from "@clerk/nextjs";
import React from "react";

type Props = {};

function page({}: Props) {
  return (
    <div>
      <SignUp />
    </div>
  );
}

export default page;

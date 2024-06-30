import ProfileForm from "@/components/forms/profile-form";
import React from "react";
import ProfilePicture from "./_components/profile-picture";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { profile } from "console";

const Settings = async () => {
  const authUser = await currentUser();
  if (!authUser) return null;
  const profile = await db.user.findFirst({
    where: {
      clerkId: authUser.id,
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl sticky top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg flex   items-center border-b">
        Settings
      </h1>
      <div className="flex flex-col gap-10 p-6 ">
        <div>
          <h2 className="text-2xl font-bold">User Profile</h2>
          <p className="text-base text-white/50">
            Add or update your profile information here.
          </p>
        </div>
        <ProfilePicture profile={profile} />
        <ProfileForm />
      </div>
    </div>
  );
};

export default Settings;

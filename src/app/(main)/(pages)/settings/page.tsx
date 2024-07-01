import ProfileForm from "@/components/forms/profile-form";
import React from "react";
import ProfilePicture from "./_components/profile-picture";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { utapi } from "@/server/uploadthing";

const Settings = async () => {
  const authUser = await currentUser();
  if (!authUser) return null;
  const profile = await db.user.findFirst({
    where: {
      clerkId: authUser.id,
    },
  });

  const deleteProfileImage = async () => {
    "use server";
    // Assuming the image key is stored in the profile object
    const imageKey = profile?.profileImage;

    if (imageKey) {
      console.log("image", imageKey);
      await utapi.deleteFiles(
        imageKey.substring(imageKey.lastIndexOf("/") + 1)
      );
      await db.user.update({
        where: {
          clerkId: authUser.id,
        },
        data: {
          profileImage: null, // or an empty string "" based on your requirement
        },
      });
    }
  };
  const onUpdate = async (name: any) => {
    "use server";
    try {
      console.log("values", name);
      const updatedProfile = await db.user.update({
        where: {
          clerkId: authUser.id,
        },
        data: {
          name,
        },
      });
      return updatedProfile;
    } catch (error) {
      console.error("Failed to update profile:", error);
      throw error; // Rethrow the error to handle it further up the call stack
    }
  };

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
        <ProfilePicture profile={profile} deleteImage={deleteProfileImage} />
        <ProfileForm profile={profile} onUpdate={onUpdate} />
      </div>
    </div>
  );
};

export default Settings;

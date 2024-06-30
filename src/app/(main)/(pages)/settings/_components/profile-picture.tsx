"use client";
import { UploadDropzone } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function ProfilePicture({ profile }: any) {
  const router = useRouter();
  return (
    <div className="flex flex-col">
      <p className="text-lg text-white">Profile Picture</p>
      <div className="flex flex-col md:flex-row h-[30vh] items-center justify-center">
        <div className="flex flex-col items-center justify-center mb-4 md:mb-0 md:mr-4">
          <p className="text-lg text-white">Profile Picture</p>
          <img
            src={profile.profileImage}
            alt="Profile Picture"
            className="w-32 h-32 object-cover rounded-full"
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              router.refresh();
              console.log("Files: ", res);
              toast.success("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfilePicture;

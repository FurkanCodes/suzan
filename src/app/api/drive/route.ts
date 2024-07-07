import { google } from "googleapis";

import { NextResponse } from "next/server";
import { uuid } from "uuidv4";
import { db } from "@/lib/db";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function GET() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.OAUTH2_REDIRECT_URI
  );

  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ message: "User not found" });
  }

  const clerkResponse = await clerkClient.users.getUserOauthAccessToken(
    userId,
    "oauth_google"
  );

  console.log("clerkResponse", clerkResponse);
  const accessToken = clerkResponse?.data[0].token;
  oauth2Client.setCredentials({
    access_token: accessToken,
  });

  const drive = google.drive({
    version: "v3",
    auth: oauth2Client,
  });

  try {
    const response = await drive.files.list();

    if (response) {
      return Response.json(
        {
          message: response.data,
        },
        {
          status: 200,
        }
      );
    } else {
      return Response.json(
        {
          message: "No files found",
        },
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    return Response.json(
      {
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}

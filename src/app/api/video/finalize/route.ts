import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Video from "@/models/Video";
import User from "@/models/User"; // Import User model
import { R2_PUBLIC_URL } from "@/lib/r2";

export async function POST(request: Request) {
  try {
    const { key, username, description, privacy, deviceSignature, hashtags, resourceType, metadata: fileMeta } = await request.json();

    if (!key || !username) {
      return NextResponse.json({ success: false, error: "Missing file key or username" }, { status: 400 });
    }

    const publicUrl = `${R2_PUBLIC_URL}/${key}`;

    await connectDB();

    // Find the user by username to get their _id
    const uploader = await User.findOne({ username }).lean();
    if (!uploader) {
        // Or handle user creation if that's the desired flow
        return NextResponse.json({ success: false, error: `Uploader '${username}' not found` }, { status: 404 });
    }

    // Create a new video document that matches the updated VideoSchema
    const newVideoData = {
      uploader_id: uploader._id,
      video_url: publicUrl,
      caption: description || "",
      // products_linked, music_name, and stats will use schema defaults
    };

    const newVideo = await Video.create(newVideoData);

    return NextResponse.json({
        success: true,
        url: publicUrl,
        public_id: key,
        resource_type: resourceType || 'video'
    });

  } catch (error: any) {
    console.error("Finalize Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

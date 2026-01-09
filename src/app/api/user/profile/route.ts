import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import Video from '@/models/Video';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let username = searchParams.get('username');
  const user_uid = searchParams.get('user_uid');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const skip = (page - 1) * limit;

  try {
    if (!username && !user_uid) {
        return NextResponse.json({ error: "Username or user_uid required" }, { status: 400 });
    }

    try {
        await connectDB();

        let user;
        // Simplified user lookup
        if (username) {
            if (username.startsWith('@')) {
                username = username.substring(1);
            }
            const escapedUsername = username.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            user = await User.findOne({
                username: { $regex: new RegExp(`^${escapedUsername}$`, 'i') }
            }).lean();
        }

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // This logic needs to be updated based on the new schema which doesn't have a followers array.
        // For now, we'll set it to a default value.
        const isFollowing = false;

        const mongoVideos = await Video.find({ uploader_id: user._id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

        const videos = mongoVideos.map((v: any) => ({
            id: v._id.toString(),
            url: v.video_url,
            thumbnail: v.video_url, // thumbnail_url is not in the new schema
            description: v.caption,
            likes: v.stats?.likes || 0,
            createdAt: v.createdAt ? new Date(v.createdAt).getTime() : Date.now()
        }));
        
        const totalLikes = await Video.aggregate([
            { $match: { uploader_id: user._id } },
            { $group: { _id: null, total: { $sum: "$stats.likes" } } }
        ]);

        const userWithLikes = { ...user, totalLikes: totalLikes[0]?.total || 0 };

        const responsePayload = { user: userWithLikes, videos, isFollowing };

        return NextResponse.json(responsePayload);

    } catch (dbError: any) {
        if (dbError.message && dbError.message.includes('MONGODB_URI')) {
             console.warn("MongoDB not configured, returning error state.");
             return NextResponse.json({ error: "Database not connected" }, { status: 503 });
        }
        throw dbError;
    }

  } catch (error) {
    console.error("Profile API Error", error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, bio, avatar } = body;

    if (!username) {
         return NextResponse.json({ error: "Username required" }, { status: 400 });
    }

    try {
        await connectDB();

        const updateData: any = {};
        if (bio !== undefined) updateData.bio = bio;
        if (avatar !== undefined) updateData.avatar = avatar;

        const updatedUser = await User.findOneAndUpdate(
            { username },
            { $set: updateData },
            { new: true, upsert: true }
        );

        return NextResponse.json({ success: true, user: updatedUser });
    } catch (dbError: any) {
         if (dbError.message && dbError.message.includes('MONGODB_URI')) {
             console.warn("MongoDB not configured, returning error state for POST.");
             return NextResponse.json({ error: "Database not connected" }, { status: 503 });
         }
         throw dbError;
    }
  } catch (error) {
    console.error("Profile Update Error", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
        }

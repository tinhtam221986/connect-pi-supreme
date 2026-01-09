import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  await connectDB();
  const { userId, videoId } = await req.json();

  if (!userId || !videoId) {
    return NextResponse.json({ message: 'User ID and Video ID are required' }, { status: 400 });
  }

  try {
    const user = await User.findOne({ user_uid: userId });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Toggle save: if video is already saved, unsave it. Otherwise, save it.
    const isSaved = user.savedVideos.includes(videoId);

    if (isSaved) {
      user.savedVideos = user.savedVideos.filter((id: string) => id.toString() !== videoId);
      await user.save();
      return NextResponse.json({ message: 'Video unsaved successfully', saved: false, savedVideos: user.savedVideos });
    } else {
      user.savedVideos.push(videoId);
      await user.save();
      return NextResponse.json({ message: 'Video saved successfully', saved: true, savedVideos: user.savedVideos });
    }

  } catch (error) {
    console.error('Error saving video:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

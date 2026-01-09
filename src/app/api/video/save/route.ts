import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Video from '@/models/Video';
import User from '@/models/User';

export async function POST(req: NextRequest) {
    await connectDB();
    const { videoId, userId } = await req.json();

    if (!videoId || !userId) {
        return NextResponse.json({ message: 'Video ID and User ID are required' }, { status: 400 });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const isSaved = user.savedVideos.includes(videoId);

        let updatedVideo;
        if (isSaved) {
            // Un-save the video
            updatedVideo = await Video.findByIdAndUpdate(
                videoId,
                { $inc: { saves: -1 } },
                { new: true }
            );
            await User.findByIdAndUpdate(
                userId,
                { $pull: { savedVideos: videoId } }
            );
        } else {
            // Save the video
            updatedVideo = await Video.findByIdAndUpdate(
                videoId,
                { $inc: { saves: 1 } },
                { new: true }
            );
            await User.findByIdAndUpdate(
                userId,
                { $addToSet: { savedVideos: videoId } }
            );
        }

        if (!updatedVideo) {
            return NextResponse.json({ message: 'Video not found' }, { status: 404 });
        }

        return NextResponse.json({ saves: updatedVideo.saves, isSaved: !isSaved }, { status: 200 });
    } catch (error) {
        console.error('Error toggling save state:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

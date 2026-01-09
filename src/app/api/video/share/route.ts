import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Video from '@/models/Video';

export async function POST(req: NextRequest) {
    await connectDB();
    const { videoId } = await req.json();

    if (!videoId) {
        return NextResponse.json({ message: 'Video ID is required' }, { status: 400 });
    }

    try {
        const video = await Video.findByIdAndUpdate(
            videoId,
            { $inc: { shares: 1 } },
            { new: true }
        );

        if (!video) {
            return NextResponse.json({ message: 'Video not found' }, { status: 404 });
        }

        return NextResponse.json({ shares: video.shares }, { status: 200 });
    } catch (error) {
        console.error('Error incrementing share count:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

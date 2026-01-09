import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Video from '@/models/Video';
import User from '@/models/User';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();

    // Tìm tất cả video, không quá khắt khe với is_active để em dễ test
    const videos = await Video.find({})
      .populate({
        path: 'uploader_id',
        model: User,
        select: 'username avatar'
      })
      .sort({ createdAt: -1 })
      .limit(20);

    // Nếu database hoàn toàn trống, nhảy sang catch để dùng fallback
    if (!videos || videos.length === 0) {
      throw new Error('Database is empty or query failed, activating fallback.');
    }

    const formattedVideos = videos.map(video => {
      const uploader = video.uploader_id as any;

      // Thêm kiểm tra kỹ lưỡng cho uploader để tránh lỗi runtime
      const safeUploader = uploader || {};

      return {
        _id: video._id.toString(),
        video_url: video.video_url,
        caption: video.caption || 'No caption provided',
        music_name: video.music_name || 'Original Sound',
        stats: {
          likes: video.stats?.likes || 0,
          comments: video.stats?.comments || 0,
          shares: video.stats?.shares || 0,
        },
        uploader: {
          _id: safeUploader._id?.toString() || 'unknown_user_id',
          username: safeUploader.username || 'Unknown User',
          avatar: safeUploader.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${safeUploader.username || 'default'}`,
        }
      };
    });

    return NextResponse.json(formattedVideos);
  } catch (error) {
    console.error('Feed API Error:', error);
    // Per directive: Eliminate mock data. Return only a structured error.
    const errorResponse = {
      error: {
        message: "Hệ thống đang gặp sự cố kết nối dữ liệu. Vui lòng thử lại sau.",
        code: "DB_CONNECTION_FAILED"
      }
    };
    return NextResponse.json(errorResponse, { status: 503 }); // Service Unavailable
  }
}
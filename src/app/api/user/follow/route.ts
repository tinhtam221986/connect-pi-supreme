import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  await connectDB();
  const { currentUserId, targetUserId } = await req.json();

  if (!currentUserId || !targetUserId) {
    return NextResponse.json({ message: 'Current User ID and Target User ID are required' }, { status: 400 });
  }

  if (currentUserId === targetUserId) {
      return NextResponse.json({ message: 'Users cannot follow themselves' }, { status: 400 });
  }

  try {
    const currentUser = await User.findOne({ user_uid: currentUserId });
    const targetUser = await User.findOne({ user_uid: targetUserId });

    if (!currentUser || !targetUser) {
      return NextResponse.json({ message: 'One or more users not found' }, { status: 404 });
    }

    const isFollowing = currentUser.following.includes(targetUser._id);

    if (isFollowing) {
      // Unfollow
      currentUser.following = currentUser.following.filter((id: any) => id.toString() !== targetUser._id.toString());
      targetUser.followers = targetUser.followers.filter((id: any) => id.toString() !== currentUser._id.toString());

      await currentUser.save();
      await targetUser.save();

      return NextResponse.json({ message: 'Unfollowed successfully', following: false });
    } else {
      // Follow
      currentUser.following.push(targetUser._id);
      targetUser.followers.push(currentUser._id);

      await currentUser.save();
      await targetUser.save();

      return NextResponse.json({ message: 'Followed successfully', following: true });
    }

  } catch (error) {
    console.error('Error in follow/unfollow logic:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

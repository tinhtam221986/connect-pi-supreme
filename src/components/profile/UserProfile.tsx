"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePi } from "@/components/pi/pi-provider";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";
import { BadgeCheck, Settings, GripVertical, Award, Globe, Play, Lock, Heart, Gamepad2, Grid, ShoppingBag, ChevronLeft } from "lucide-react";
import { useLanguage } from "@/components/i18n/language-provider";
import { ThemeCustomizer } from "@/components/ui/theme-customizer";
import { ProfileFrame } from "./ProfileFrame";
import { ShopTab } from "@/components/shop/ShopTab";

type ProfileTab = 'videos' | 'liked' | 'saved' | 'games' | 'shop';

interface UserProfileProps {
    onBack?: () => void;
    usernameFromParams?: string;
}

interface ProfileData {
    username: string;
    bio: string;
    avatar: string;
    followers: number;
    following: number;
    totalLikes: number;
    videos: any[];
    level?: number;
    isFollowing?: boolean;
    user_uid?: string; // Add the UID of the profile being viewed
}

export function UserProfile({ onBack, usernameFromParams }: UserProfileProps) {
    const router = useRouter();
    const { user: authenticatedUser } = usePi();
    const { t, language, setLanguage } = useLanguage();
    const [showSettings, setShowSettings] = useState(false);
    const [activeTab, setActiveTab] = useState<ProfileTab>('videos');
    const [isEditing, setIsEditing] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);

    const isFetchingOwnProfile = usernameFromParams === 'me';
    const usernameToFetch = isFetchingOwnProfile ? authenticatedUser?.username : usernameFromParams;
    const uidToFetch = isFetchingOwnProfile ? authenticatedUser?.uid : undefined;

    // Guard clause to prevent fetching if the username is not available yet.
    if (!usernameToFetch) {
        // You can return a loader here, or null if the parent component handles it.
        return (
             <div className="h-full flex flex-col items-center justify-center bg-black text-white p-4">
                 <p className="mb-4 text-center">Waiting for user information...</p>
            </div>
        );
    }

    useEffect(() => {
        const fetchProfile = async () => {
            if (isFetchingOwnProfile && !authenticatedUser) {
                return;
            }
            if (!usernameToFetch) {
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const data = await apiClient.user.getProfile(usernameToFetch, uidToFetch);
                if (data && data.user && !data.error) {
                    setProfile({ ...data.user, videos: data.videos });
                    setIsFollowing(data.isFollowing || false);
                    setLoading(false);
                } else {
                    throw new Error(data?.error || "Profile data is malformed or has an error.");
                }
            } catch (error) {
                console.error("Critical error fetching profile:", error);
                toast.error(`Could not load profile for @${usernameToFetch}.`);
                // Safety net: Redirect back to the main feed to prevent black screen
                router.push('/');
                // We don't setLoading(false) here because we are navigating away.
            }
        };

        fetchProfile();
    }, [usernameToFetch, uidToFetch, authenticatedUser, isFetchingOwnProfile, router]);

    const handleFollow = async () => {
        if (!authenticatedUser || !profile?.user_uid) {
            toast.error("You must be logged in to follow.");
            return;
        }

        const originalIsFollowing = isFollowing;
        const originalProfile = profile;

        // Optimistic update
        setIsFollowing(prev => !prev);
        setProfile(prev => {
            if (!prev) return null;
            return {
                ...prev,
                followers: originalIsFollowing ? prev.followers - 1 : prev.followers + 1,
            };
        });

        try {
            await apiClient.user.followUser(authenticatedUser.uid, profile.user_uid);
        } catch (error) {
            // Revert on failure
            setIsFollowing(originalIsFollowing);
            setProfile(originalProfile);
            console.error("Failed to follow user", error);
            toast.error("An error occurred while trying to follow. Please try again.");
        }
    };

    const toggleLanguage = () => {
        setLanguage(language === 'vi' ? 'en' : 'vi');
    }

    const renderTabContent = () => {
        switch(activeTab) {
            case 'videos':
                return (
                    <div className="grid grid-cols-3 gap-0.5 mt-0.5">
                        {(profile?.videos && profile.videos.length > 0) ? profile.videos.map((video) => (
                             <div key={video.id} className="aspect-[3/4] bg-gray-900 relative group cursor-pointer hover:opacity-90">
                                <img src={video.thumbnail} alt="" className="w-full h-full object-cover" />
                                <div className="absolute bottom-1 right-1 flex items-center gap-1 text-[10px] text-white font-bold drop-shadow-md">
                                    <Play size={10} fill="currentColor" />
                                    <span>{video.likes}</span>
                                </div>
                             </div>
                        )) : (
                            <div className="col-span-3 py-10 text-center text-gray-500 flex flex-col items-center justify-center">
                                <Play size={48} className="mb-4 text-gray-700" />
                                <h3 className="font-bold text-lg text-gray-300">No videos yet</h3>
                                <p className="text-sm mt-1 mb-4">Start creating and share your moments!</p>
                                <button
                                    onClick={() => router.push('/create')}
                                    className="bg-purple-600 text-white font-bold py-2 px-6 rounded-lg text-sm hover:bg-purple-500 transition-colors"
                                >
                                    Create Now
                                </button>
                            </div>
                        )}
                    </div>
                );
            case 'liked':
                return <div className="py-20 text-center text-gray-500 text-sm">Videos you liked will appear here</div>;
            case 'saved':
                return <div className="py-20 text-center text-gray-500 text-sm">Saved posts will appear here</div>;
            case 'games':
                 return <div className="py-20 text-center text-gray-500 text-sm">Game integration coming soon!</div>;
            case 'shop':
                return <ShopTab username={usernameToFetch || ''} />;
        }
    };

    if (loading) {
        // Skeleton Loader with Glassmorphism effect
        return (
            <div className="h-full overflow-y-auto bg-black pb-20">
                {}
                <div className="flex justify-between items-center p-4 sticky top-0 bg-black/80 backdrop-blur-md z-10 border-b border-gray-800/50 pt-safe-top">
                    <div className="h-7 w-24 bg-gray-700/50 rounded-md animate-pulse"></div>
                    <div className="flex gap-4 items-center">
                        <div className="h-8 w-12 bg-gray-700/50 rounded-full animate-pulse"></div>
                        <div className="h-5 w-5 bg-gray-700/50 rounded-full animate-pulse"></div>
                    </div>
                </div>

                {}
                <div className="flex flex-col items-center gap-4 mt-6 px-4">
                    <div className="w-[100px] h-[100px] bg-gray-700/50 rounded-full animate-pulse"></div>
                    <div className="h-6 w-32 bg-gray-700/50 rounded-md animate-pulse mt-2"></div>
                    <div className="h-4 w-48 bg-gray-700/50 rounded-md animate-pulse mt-1"></div>
                </div>

                {}
                <div className="flex items-center gap-10 w-full justify-center py-4 mt-2">
                    <div className="flex flex-col items-center gap-1">
                        <div className="h-5 w-8 bg-gray-700/50 rounded-md animate-pulse"></div>
                        <div className="h-3 w-12 bg-gray-700/50 rounded-md animate-pulse"></div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <div className="h-5 w-8 bg-gray-700/50 rounded-md animate-pulse"></div>
                        <div className="h-3 w-12 bg-gray-700/50 rounded-md animate-pulse"></div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <div className="h-5 w-8 bg-gray-700/50 rounded-md animate-pulse"></div>
                        <div className="h-3 w-12 bg-gray-700/50 rounded-md animate-pulse"></div>
                    </div>
                </div>
                 {}
                <div className="flex justify-around border-b border-gray-800 mt-6 sticky top-14 bg-black z-10">
                    <div className="h-10 w-full bg-gray-900/50 animate-pulse"></div>
                </div>
                {}
                <div className="grid grid-cols-3 gap-0.5 mt-0.5 animate-pulse">
                    {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="aspect-[3/4] bg-gray-800/50"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="h-full flex flex-col items-center justify-center bg-black text-white p-4">
                 <p className="mb-4 text-center">Could not load profile for @{usernameToFetch}. Please try again later.</p>
                 {onBack && <button onClick={onBack} className="px-4 py-2 bg-gray-800 rounded-lg">Go Back</button>}
            </div>
        );
    }

    return (
        <div className="h-full overflow-y-auto bg-black pb-20 relative">
             {showSettings && <ThemeCustomizer onClose={() => setShowSettings(false)} />}

             {}
             {isEditing && (
                 <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setIsEditing(false)}>
                     <div className="bg-gray-900 w-full max-w-sm rounded-2xl p-6 border border-gray-800" onClick={e => e.stopPropagation()}>
                         <h3 className="text-xl font-bold mb-4">Edit Profile</h3>
                         <div className="space-y-4">
                             <div>
                                 <label className="text-xs text-gray-400">Bio</label>
                                 <textarea className="w-full bg-black border border-gray-700 rounded-lg p-2 text-sm" defaultValue={profile.bio}></textarea>
                             </div>
                             <div className="flex gap-2 mt-6">
                                 <button onClick={() => setIsEditing(false)} className="flex-1 py-2 bg-gray-800 rounded-lg text-sm">Cancel</button>
                                 <button onClick={() => setIsEditing(false)} className="flex-1 py-2 bg-purple-600 rounded-lg text-sm font-bold">Save</button>
                             </div>
                         </div>
                     </div>
                 </div>
             )}

             {}
             <div className="flex justify-between items-center p-4 sticky top-0 bg-black/80 backdrop-blur-md z-10 border-b border-gray-800/50 pt-safe-top">
                <div className="flex items-center gap-3">
                    {onBack && (
                        <button onClick={onBack} className="p-1 -ml-1 hover:bg-white/10 rounded-full">
                            <ChevronLeft size={24} />
                        </button>
                    )}
                    <span className="font-bold text-lg">{profile.username}</span>
                </div>
                <div className="flex gap-4 items-center">
                    <button 
                        onClick={toggleLanguage} 
                        className="flex items-center gap-1 text-xs font-bold bg-gray-800 px-3 py-1.5 rounded-full hover:bg-gray-700 transition-colors border border-gray-700"
                    >
                        <Globe size={14} className="text-blue-400" />
                        {language === 'vi' ? 'VN' : 'EN'}
                    </button>
                    <button onClick={() => setShowSettings(true)}>
                        <Settings size={20} className="cursor-pointer hover:text-gray-300" />
                    </button>
                </div>
             </div>

             {}
             <div className="flex flex-col items-center gap-4 mt-6 px-4">
                <div className="relative">
                     <ProfileFrame
                        src={profile.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.username}`}
                        level={profile.level || 1}
                        size={100}
                     />
                     <div className="absolute -bottom-2 right-0 bg-gradient-to-r from-yellow-500 to-amber-600 text-black text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-black shadow-lg">
                        LVL {profile.level || 1}
                     </div>
                </div>
                
                <div className="text-center">
                    <h2 className="text-xl font-bold flex items-center justify-center gap-1">
                        @{profile.username} <BadgeCheck size={16} className="text-blue-500" />
                    </h2>
                     <p className="text-sm text-gray-400 max-w-xs mt-1 line-clamp-2">
                        {profile.bio}
                    </p>
                </div>
                
                {}
                <div className="flex items-center gap-10 text-center w-full justify-center py-2">
                    <div className="flex flex-col items-center">
                        <span className="block font-bold text-lg">{profile.following}</span>
                        <span className="text-xs text-gray-500">Following</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="block font-bold text-lg">{profile.followers}</span>
                        <span className="text-xs text-gray-500">Followers</span>
                    </div>
                    <div className="flex flex-col items-center">
                         <span className="block font-bold text-lg">{profile.totalLikes}</span>
                         <span className="text-xs text-gray-500">Likes</span>
                    </div>
                </div>

                <div className="flex gap-2 mt-2 w-full max-w-xs">
                     {authenticatedUser?.username === profile.username && (
                       <>
                         <button onClick={() => setIsEditing(true)} className="flex-1 py-2.5 bg-gray-800 border border-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-700 transition-colors">Edit Profile</button>
                         <button className="p-2.5 bg-gray-800 border border-gray-700 rounded-xl hover:bg-gray-700 transition-colors"><GripVertical size={20}/></button>
                       </>
                     )}
                     {authenticatedUser?.username !== profile.username && (
                         <button
                            onClick={handleFollow}
                            className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
                                isFollowing
                                    ? 'bg-gray-700 border border-gray-600 hover:bg-gray-600'
                                    : 'bg-purple-600 border border-purple-500 hover:bg-purple-500'
                            }`}
                         >
                            {isFollowing ? 'Following' : 'Follow'}
                         </button>
                     )}
                </div>
             </div>

             {}
             <div className="flex justify-around border-b border-gray-800 mt-6 sticky top-14 bg-black z-10">
                 <button onClick={() => setActiveTab('videos')} className={`flex-1 py-3 flex justify-center ${activeTab === 'videos' ? 'border-b-2 border-white text-white' : 'text-gray-500'}`}>
                    <Grid size={20} />
                 </button>
                 <button onClick={() => setActiveTab('shop')} className={`flex-1 py-3 flex justify-center ${activeTab === 'shop' ? 'border-b-2 border-white text-white' : 'text-gray-500'}`}>
                    <ShoppingBag size={20} />
                 </button>
                 <button onClick={() => setActiveTab('liked')} className={`flex-1 py-3 flex justify-center ${activeTab === 'liked' ? 'border-b-2 border-white text-white' : 'text-gray-500'}`}>
                    <Heart size={20} />
                 </button>
                  <button onClick={() => setActiveTab('games')} className={`flex-1 py-3 flex justify-center ${activeTab === 'games' ? 'border-b-2 border-white text-white' : 'text-gray-500'}`}>
                    <Gamepad2 size={20} />
                 </button>
             </div>

             {}
             <div className="min-h-[300px]">
                {renderTabContent()}
             </div>
        </div>
    )
        }

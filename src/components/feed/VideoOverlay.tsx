{/* #13 AVATAR KHÁCH - BẤM VÀO ĐỂ XEM PROFILE CHỦ VIDEO */}
<div className="flex items-center gap-2 relative">
   <div className="relative">
      <Link href={`/profile/${uploader.username}`} className="pointer-events-auto block active:scale-95 transition-transform">
         <div className="w-9 h-9 rounded-full border border-white/70 overflow-hidden shadow-lg bg-zinc-800">
            <img src={uploader.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${uploader.username}`} alt="avt" className="w-full h-full object-cover" />
         </div>
      </Link>
      
      {/* #16 NÚT THEO DÕI ĐỎ - KHI BẤM THÌ BIẾN MẤT */}
      {!isFollowed && (
        <button 
          onClick={(e) => { e.stopPropagation(); setIsFollowed(true); }}
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-red-600 rounded-full p-0.5 border border-white active:scale-125 transition-transform z-10 pointer-events-auto"
        >
          <Plus size={10} strokeWidth={4} className="text-white" />
        </button>
      )}
   </div>
   <Link href={`/profile/${uploader.username}`} className="pointer-events-auto">
      <p className="font-bold text-[13px] drop-shadow-md">@{uploader.username}</p>
   </Link>
</div>

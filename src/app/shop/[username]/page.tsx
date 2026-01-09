export default function UserShopPage({ params }: { params: { username: string } }) {
  const username = params.username || "Guest"; // Tránh lỗi null/undefined
  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mt-10">Cửa hàng của @{username}</h1>
      <div className="mt-20 text-gray-400">Hiện chưa có sản phẩm nào được đăng bán.</div>
    </div>
  );
}

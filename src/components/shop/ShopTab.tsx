import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { usePi } from '@/components/pi/pi-provider';
import { ShoppingBag, Plus, Package, Store, LayoutDashboard } from 'lucide-react';
import { ProductForm } from './ProductForm';
import { ProductCard } from './ProductCard';
import { SellerDashboard } from './SellerDashboard';
import { CheckoutModal } from './CheckoutModal';

interface ShopTabProps {
    username: string; // The username of the profile we are viewing
}

export function ShopTab({ username }: ShopTabProps) {
    const { user } = usePi();
    const [isOwner, setIsOwner] = useState(false);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [showDashboard, setShowDashboard] = useState(false);
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    useEffect(() => {
        if (user?.username && username) {
            setIsOwner(user.username === username);
        }
    }, [user, username]);

    const fetchProducts = async () => {
        try {
            const query = isOwner ? `?sellerId=${user?.uid}` : '';
            const res = await fetch(`/api/shop/products${query}`);
            const data = await res.json();
            if (data.products) {
                setProducts(data.products);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOwner && user?.uid) {
            fetchProducts();
        } else {
            setLoading(false);
        }
    }, [isOwner, user]);

    if (showAddProduct) {
        return (
            <div className="mt-4">
                <ProductForm
                    onSuccess={() => {
                        setShowAddProduct(false);
                        fetchProducts();
                    }}
                    onCancel={() => setShowAddProduct(false)}
                />
            </div>
        );
    }

    if (showDashboard) {
        return (
            <div className="mt-4">
                <div className="flex items-center gap-2 mb-4 px-3">
                     <button onClick={() => setShowDashboard(false)} className="p-2 rounded-lg bg-gray-800 text-white">
                        <Store size={18} />
                     </button>
                     <h3 className="font-bold text-white">Seller Dashboard</h3>
                </div>
                <SellerDashboard />
            </div>
        );
    }

    return (
        <div className="pb-20">
            {selectedProduct && (
                <CheckoutModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}

            {}
            {isOwner && (
                <div className="flex gap-2 p-4 bg-gray-900/50 mb-4">
                    <button
                        onClick={() => setShowAddProduct(true)}
                        className="flex-1 py-3 bg-purple-600 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg shadow-purple-900/20"
                    >
                        <Plus size={18} /> Add Product
                    </button>
                    <button
                        onClick={() => setShowDashboard(true)}
                        className="px-4 bg-gray-800 rounded-xl text-white border border-gray-700 hover:bg-gray-700"
                    >
                        <LayoutDashboard size={20} />
                    </button>
                </div>
            )}

            {}
            <div className="grid grid-cols-2 gap-3 px-3">
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            isOwner={isOwner}
                            onBuy={() => setSelectedProduct(product)}
                        />
                    ))
                ) : (
                    <div className="col-span-2 py-20 text-center text-gray-400 flex flex-col items-center gap-4">
                        <ShoppingBag size={48} className="opacity-30" />
                        <p className="font-semibold">Chủ quán @{username} đang đi nhập hàng...</p>
                        {isOwner && (
                             <button
                                onClick={() => toast.info("Tính năng đăng hàng đang được cập nhật")}
                                className="mt-4 flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white font-bold rounded-xl shadow-lg hover:bg-purple-700 transition-colors"
                            >
                                <Plus size={20} />
                                Đăng sản phẩm mới
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

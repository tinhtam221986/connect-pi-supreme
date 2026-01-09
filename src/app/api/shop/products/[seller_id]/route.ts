import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';
import mongoose from 'mongoose';

export async function GET(
  request: Request,
  { params }: { params: { seller_id: string } }
) {
  try {
    await connectDB();
    const { seller_id } = params;

    if (!mongoose.Types.ObjectId.isValid(seller_id)) {
      return NextResponse.json({ error: 'Invalid seller ID format' }, { status: 400 });
    }

    // Logic không đổi, nhưng đảm bảo schema Product mới nhất được sử dụng
    const products = await Product.find({ seller_id: new mongoose.Types.ObjectId(seller_id) });

    return NextResponse.json(products);

  } catch (error) {
    console.error(`Error fetching products for seller ${params.seller_id}:`, error);
    return NextResponse.json({ error: 'Failed to fetch products from the database.' }, { status: 500 });
  }
}

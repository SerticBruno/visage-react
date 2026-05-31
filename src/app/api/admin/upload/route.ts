import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import {
  PRODUCT_IMAGES_BUCKET,
  buildProductImageStoragePath,
  getProductImagePublicUrl,
  validateProductImageFile,
} from '@/lib/product-images';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const productId = formData.get('productId');

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'Datoteka nije poslana' }, { status: 400 });
    }

    const validationError = validateProductImageFile(file);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const storagePath = buildProductImageStoragePath(
      typeof productId === 'string' ? productId : undefined,
      file.name
    );

    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from(PRODUCT_IMAGES_BUCKET)
      .upload(storagePath, buffer, {
        contentType: file.type,
        cacheControl: '31536000',
        upsert: false,
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      if (uploadError.message.includes('Bucket not found')) {
        return NextResponse.json(
          {
            error:
              'Bucket "product-images" ne postoji. Pokrenite migraciju 004_product_images_storage.sql u Supabase.',
          },
          { status: 500 }
        );
      }
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const url = getProductImagePublicUrl(storagePath);

    return NextResponse.json({ url, path: storagePath });
  } catch (err) {
    console.error('Admin upload error:', err);
    return NextResponse.json({ error: 'Greška pri uploadu slike' }, { status: 500 });
  }
}

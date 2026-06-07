import { NextResponse } from 'next/server';
import { pricingData, pricingCategories } from '@/data/pricing';
import { parsePriceCents } from '@/lib/price-utils';
import { parseDurationMinutes } from '@/lib/appointments';

export async function GET() {
  const treatments = pricingData.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    price: item.price,
    price_cents: parsePriceCents(item.price),
    category: item.category,
    duration: item.duration ?? null,
    duration_minutes: parseDurationMinutes(item.duration),
  }));

  return NextResponse.json({ treatments, categories: pricingCategories });
}

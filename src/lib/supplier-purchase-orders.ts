import { supabase } from '@/lib/supabase';
import type { GeneratedSupplierEmail } from '@/lib/supplier-order-email';

export type PurchaseOrderStatus = 'ordered' | 'received' | 'cancelled';

export interface DbPurchaseOrderRow {
  id: string;
  status: PurchaseOrderStatus;
  supplier_name: string;
  supplier_email: string;
  supplier_marka: string;
  email_subject: string | null;
  email_body: string | null;
  email_sent_at: string | null;
  ordered_at: string;
  received_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbPurchaseOrderItemRow {
  id: string;
  purchase_order_id: string;
  product_id: string;
  product_title: string;
  product_sku: string | null;
  ordered_quantity: number;
  received_quantity: number | null;
  created_at: string;
  updated_at: string;
}

export interface PurchaseOrderSummary {
  id: string;
  status: PurchaseOrderStatus;
  supplierName: string;
  supplierEmail: string;
  supplierMarka: string;
  orderedAt: string;
  receivedAt: string | null;
  emailSentAt: string | null;
  itemCount: number;
  orderedTotal: number;
  receivedTotal: number | null;
  isPartial: boolean | null;
}

export interface PurchaseOrderDetail {
  id: string;
  status: PurchaseOrderStatus;
  supplierName: string;
  supplierEmail: string;
  supplierMarka: string;
  emailSubject: string | null;
  emailBody: string | null;
  emailSentAt: string | null;
  orderedAt: string;
  receivedAt: string | null;
  notes: string | null;
  items: PurchaseOrderItem[];
}

export interface PurchaseOrderItem {
  id: string;
  productId: string;
  productTitle: string;
  productSku: string | null;
  orderedQuantity: number;
  receivedQuantity: number | null;
  currentStock: number | null;
}

function rowToItem(
  row: DbPurchaseOrderItemRow,
  currentStock?: number | null
): PurchaseOrderItem {
  return {
    id: row.id,
    productId: row.product_id,
    productTitle: row.product_title,
    productSku: row.product_sku,
    orderedQuantity: row.ordered_quantity,
    receivedQuantity: row.received_quantity,
    currentStock: currentStock ?? null,
  };
}

function summarizeOrder(
  order: DbPurchaseOrderRow,
  items: DbPurchaseOrderItemRow[]
): PurchaseOrderSummary {
  const orderedTotal = items.reduce((sum, i) => sum + i.ordered_quantity, 0);
  const receivedTotal =
    order.status === 'received'
      ? items.reduce((sum, i) => sum + (i.received_quantity ?? 0), 0)
      : null;
  const isPartial =
    order.status === 'received'
      ? items.some((i) => (i.received_quantity ?? 0) < i.ordered_quantity)
      : null;

  return {
    id: order.id,
    status: order.status,
    supplierName: order.supplier_name,
    supplierEmail: order.supplier_email,
    supplierMarka: order.supplier_marka,
    orderedAt: order.ordered_at,
    receivedAt: order.received_at,
    emailSentAt: order.email_sent_at,
    itemCount: items.length,
    orderedTotal,
    receivedTotal,
    isPartial,
  };
}

export async function createPurchaseOrdersFromGroups(
  groups: GeneratedSupplierEmail[],
  options?: { emailSentAt?: string | null }
): Promise<{ orders: PurchaseOrderSummary[] }> {
  const created: PurchaseOrderSummary[] = [];

  for (const group of groups) {
    const now = new Date().toISOString();
    const { data: orderRow, error: orderError } = await supabase
      .from('supplier_purchase_orders')
      .insert({
        status: 'ordered',
        supplier_name: group.supplier.name,
        supplier_email: group.supplier.email,
        supplier_marka: group.supplier.marka,
        email_subject: group.subject,
        email_body: group.bodyText,
        email_sent_at: options?.emailSentAt ?? null,
        ordered_at: now,
      })
      .select()
      .single();

    if (orderError) throw orderError;

    const itemRows = group.items.map((item) => ({
      purchase_order_id: orderRow.id,
      product_id: item.productId,
      product_title: item.title,
      product_sku: item.sku ?? null,
      ordered_quantity: item.orderQuantity,
    }));

    const { data: insertedItems, error: itemsError } = await supabase
      .from('supplier_purchase_order_items')
      .insert(itemRows)
      .select();

    if (itemsError) throw itemsError;

    created.push(
      summarizeOrder(orderRow as DbPurchaseOrderRow, (insertedItems ?? []) as DbPurchaseOrderItemRow[])
    );
  }

  return { orders: created };
}

export async function listPurchaseOrders(): Promise<PurchaseOrderSummary[]> {
  const { data: orders, error } = await supabase
    .from('supplier_purchase_orders')
    .select('*')
    .order('ordered_at', { ascending: false });

  if (error) throw error;
  if (!orders?.length) return [];

  const orderIds = orders.map((o) => o.id);
  const { data: items, error: itemsError } = await supabase
    .from('supplier_purchase_order_items')
    .select('*')
    .in('purchase_order_id', orderIds);

  if (itemsError) throw itemsError;

  const itemsByOrder = new Map<string, DbPurchaseOrderItemRow[]>();
  for (const item of (items ?? []) as DbPurchaseOrderItemRow[]) {
    const bucket = itemsByOrder.get(item.purchase_order_id) ?? [];
    bucket.push(item);
    itemsByOrder.set(item.purchase_order_id, bucket);
  }

  return (orders as DbPurchaseOrderRow[]).map((order) =>
    summarizeOrder(order, itemsByOrder.get(order.id) ?? [])
  );
}

export async function getPurchaseOrderById(id: string): Promise<PurchaseOrderDetail | null> {
  const { data: order, error } = await supabase
    .from('supplier_purchase_orders')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  if (!order) return null;

  const { data: items, error: itemsError } = await supabase
    .from('supplier_purchase_order_items')
    .select('*')
    .eq('purchase_order_id', id)
    .order('product_title', { ascending: true });

  if (itemsError) throw itemsError;

  const itemRows = (items ?? []) as DbPurchaseOrderItemRow[];
  const productIds = itemRows.map((i) => i.product_id);

  let stockMap = new Map<string, number>();
  if (productIds.length > 0) {
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('id, quantity')
      .in('id', productIds);

    if (productsError) throw productsError;
    stockMap = new Map((products ?? []).map((p) => [p.id as string, p.quantity as number]));
  }

  const row = order as DbPurchaseOrderRow;

  return {
    id: row.id,
    status: row.status,
    supplierName: row.supplier_name,
    supplierEmail: row.supplier_email,
    supplierMarka: row.supplier_marka,
    emailSubject: row.email_subject,
    emailBody: row.email_body,
    emailSentAt: row.email_sent_at,
    orderedAt: row.ordered_at,
    receivedAt: row.received_at,
    notes: row.notes,
    items: itemRows.map((item) => rowToItem(item, stockMap.get(item.product_id))),
  };
}

export type ReceiveItemInput = {
  itemId: string;
  receivedQuantity: number;
};

export async function receivePurchaseOrder(
  orderId: string,
  items: ReceiveItemInput[]
): Promise<PurchaseOrderDetail> {
  const order = await getPurchaseOrderById(orderId);
  if (!order) {
    throw new Error('Narudžbenica nije pronađena');
  }
  if (order.status === 'received') {
    throw new Error('Narudžbenica je već primljena');
  }
  if (order.status === 'cancelled') {
    throw new Error('Narudžbenica je otkazana');
  }

  const itemMap = new Map(order.items.map((i) => [i.id, i]));
  const now = new Date().toISOString();

  for (const input of items) {
    const line = itemMap.get(input.itemId);
    if (!line) {
      throw new Error(`Stavka ${input.itemId} ne pripada ovoj narudžbenici`);
    }

    const receivedQuantity = Math.max(0, Math.floor(input.receivedQuantity));
    if (receivedQuantity > line.orderedQuantity) {
      throw new Error(
        `Primljena količina za „${line.productTitle}” ne može biti veća od naručene (${line.orderedQuantity})`
      );
    }

    const { error: itemError } = await supabase
      .from('supplier_purchase_order_items')
      .update({
        received_quantity: receivedQuantity,
        updated_at: now,
      })
      .eq('id', input.itemId);

    if (itemError) throw itemError;

    if (receivedQuantity > 0) {
      const { error: stockError } = await supabase.rpc('increment_stock', {
        p_product_id: line.productId,
        p_quantity: receivedQuantity,
      });
      if (stockError) throw stockError;
    }
  }

  const { error: orderError } = await supabase
    .from('supplier_purchase_orders')
    .update({
      status: 'received',
      received_at: now,
      updated_at: now,
    })
    .eq('id', orderId);

  if (orderError) throw orderError;

  const updated = await getPurchaseOrderById(orderId);
  if (!updated) throw new Error('Narudžbenica nije pronađena nakon ažuriranja');
  return updated;
}

export async function cancelPurchaseOrder(orderId: string): Promise<void> {
  const order = await getPurchaseOrderById(orderId);
  if (!order) throw new Error('Narudžbenica nije pronađena');
  if (order.status === 'received') {
    throw new Error('Primljenu narudžbenicu nije moguće otkazati');
  }

  const { error } = await supabase
    .from('supplier_purchase_orders')
    .update({
      status: 'cancelled',
      updated_at: new Date().toISOString(),
    })
    .eq('id', orderId);

  if (error) throw error;
}

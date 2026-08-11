import "dotenv/config";
import { v7 as uuidv7 } from "uuid";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST!,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER!,
    password: process.env.DATABASE_PASSWORD!,
    database: process.env.DATABASE_NAME!,
    connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

const uuid = () => uuidv7();

async function main() {
    // ===========
    //    ROLES
    // ===========

    const roleIds = {
        customer: uuid(),
        seller: uuid(),
        admin: uuid(),
    };

    await prisma.roles.createMany({
        data: [
            {
                id: roleIds.customer,
                name: "CUSTOMER",
                description: "Standard customer role",
                level: 1,
            },
            {
                id: roleIds.seller,
                name: "SELLER",
                description: "Seller role",
                level: 5,
            },
            {
                id: roleIds.admin,
                name: "ADMIN",
                description: "Administrator role",
                level: 10,
            },
        ],
        skipDuplicates: true,
    });

    // ===========
    //    USERS
    // ===========

    const userIds = Array.from({ length: 10 }, () => uuid());

    await prisma.users.createMany({
        data: userIds.map((id, index) => ({
            id,
            username: `user${index + 1}`,
            email: `user${index + 1}@example.com`,
            password: `Password${index + 1}!`,
            phone: `+6281000000${index + 1}`,
            role_id: index < 3 ? roleIds.seller : roleIds.customer,
        })),
        skipDuplicates: true,
    });

    // ============
    //   PROFILES
    // ============

    await prisma.profiles.createMany({
        data: userIds.map((userId, index) => ({
            id: uuid(),
            user_id: userId,
            full_name: `User ${index + 1}`,
            avatar: `https://example.com/avatar-${index + 1}.png`,
            gender: index % 2 === 0 ? "MALE" : "FEMALE",
            birth_date: new Date(1990, index % 10, (index % 28) + 1),
        })),
        skipDuplicates: true,
    });

    // =============
    //   ADDRESSES
    // =============

    const addressIds = Array.from({ length: 5 }, () => uuid());

    await prisma.addresses.createMany({
        data: addressIds.map((id, index) => ({
            id,
            user_id: userIds[index],
            recipient_name: `User ${index + 1}`,
            phone: `+628100000${10 + index}`,
            address: `Jl. Contoh No. ${index + 1}, Jakarta`,
            city: "Jakarta",
            province: "DKI Jakarta",
            postal_code: `10${(10 + index).toString().padStart(3, "0")}`,
            is_default: index === 0,
        })),
        skipDuplicates: true,
    });

    // ==================
    //   BUSINESS_TYPES
    // ==================

    const businessTypeIds = [uuid(), uuid(), uuid()];

    await prisma.business_types.createMany({
        data: [
            {
                id: businessTypeIds[0],
                name: "Individual",
                code: "INDIVIDUAL",
                description: "Seller is an individual business",
            },
            {
                id: businessTypeIds[1],
                name: "PT",
                code: "PT",
                description: "Perseroan Terbatas",
            },
            {
                id: businessTypeIds[2],
                name: "Koperasi",
                code: "KOPERASI",
                description: "Cooperative business",
            },
        ],
        skipDuplicates: true,
    });

    // ===========
    //   SELLERS
    // ===========

    const sellerIds = userIds.slice(0, 3).map(() => uuid());

    await prisma.sellers.createMany({
        data: sellerIds.map((id, index) => ({
            id,
            user_id: userIds[index],
            seller_type: index === 0 ? "INDIVIDUAL" : "BUSINESS",
            verification_status: index === 0 ? "VERIFIED" : "PENDING",
            verified_at: index === 0 ? new Date() : null,
        })),
        skipDuplicates: true,
    });

    // =====================
    //   SELLER_BUSINESSES
    // =====================

    const sellerBusinessIds = sellerIds.map(() => uuid());

    await prisma.seller_businesses.createMany({
        data: sellerBusinessIds.map((id, index) => ({
            id,
            seller_id: sellerIds[index],
            business_name: `Tokoku ${index + 1}`,
            business_type_id: businessTypeIds[index],
            tax_number: `1234567890${index + 10}`,
            business_registration_number: `0987654321${index + 10}`,
        })),
        skipDuplicates: true,
    });

    // ====================
    //   SELLER_DOCUMENTS
    // ====================

    const sellerDocumentIds = sellerIds.map(() => uuid());

    await prisma.seller_documents.createMany({
        data: sellerDocumentIds.map((id, index) => ({
            id,
            seller_id: sellerIds[index],
            document_type: index === 0 ? "IDENTITY" : index === 1 ? "TAX" : "BUSINESS_REGISTRATION",
            document_number: `DOC-${index + 1}-2026`,
            document_url: `https://example.com/documents/doc-${index + 1}.pdf`,
            verification_status: index === 0 ? "VERIFIED" : "PENDING",
            verified_at: index === 0 ? new Date() : null,
        })),
        skipDuplicates: true,
    });

    // ==========
    //   STORES
    // ==========

    const storeIds = sellerIds.map(() => uuid());

    await prisma.stores.createMany({
        data: storeIds.map((id, index) => ({
            id,
            seller_id: sellerIds[index],
            name: `Toko ${index + 1}`,
            store_code: `S0${index + 1}`,
            slug: `toko-${index + 1}`,
            description: `Toko ${index + 1} menjual produk pilihan.`,
            logo: `https://example.com/logos/store-${index + 1}.png`,
            phone: `+6281000010${index}`,
            address: `Jl. Pedagang No. ${index + 1}`,
            city: "Bandung",
            province: "Jawa Barat",
            postal_code: `40${(10 + index).toString().padStart(3, "0")}`,
        })),
        skipDuplicates: true,
    });

    // ==============
    //   CATEGORIES
    // ==============

    const categoryIds = Array.from({ length: 5 }, () => uuid());
    const categoryNames = ["Fashion", "Electronics", "Home", "Beauty", "Sports"];

    await prisma.categories.createMany({
        data: categoryIds.map((id, index) => ({
            id,
            name: categoryNames[index],
            slug: categoryNames[index].toLowerCase(),
            description: `Kategori ${categoryNames[index]} untuk produk.`,
        })),
        skipDuplicates: true,
    });

    // ============
    //   PRODUCTS
    // ============

    const productIds = Array.from({ length: 10 }, () => uuid());

    await prisma.products.createMany({
        data: productIds.map((id, index) => ({
            id,
            store_id: storeIds[index % storeIds.length],
            name: `Produk ${index + 1}`,
            slug: `produk-${index + 1}`,
            description: `Deskripsi produk ${index + 1}.`,
            price: `${(10 + index * 5).toFixed(2)}`,
            stock: 10 + index * 5,
            status: index % 3 === 0 ? "ACTIVE" : "DRAFT",
        })),
        skipDuplicates: true,
    });

    // ==================
    //   PRODUCT_IMAGES
    // ==================

    const productImageIds = productIds.map(() => uuid());

    await prisma.product_images.createMany({
        data: productImageIds.map((id, index) => ({
            id,
            product_id: productIds[index],
            image_url: `https://example.com/products/${index + 1}.jpg`,
            is_primary: true,
            sort_order: 0,
        })),
        skipDuplicates: true,
    });

    // ======================
    //   PRODUCT_CATEGORIES
    // ======================

    await prisma.product_categories.createMany({
        data: productIds.map((productId, index) => ({
            product_id: productId,
            category_id: categoryIds[index % categoryIds.length],
        })),
        skipDuplicates: true,
    });

    // =========
    //   CARTS
    // =========

    const cartIds = userIds.slice(0, 3).map(() => uuid());

    await prisma.carts.createMany({
        data: cartIds.map((id, index) => ({
            id,
            user_id: userIds[index],
        })),
        skipDuplicates: true,
    });

    // ==============
    //   CART_ITEMS
    // ==============

    await prisma.cart_items.createMany({
        data: [
            {
                id: uuid(),
                cart_id: cartIds[0],
                product_id: productIds[0],
                quantity: 2,
            },
            {
                id: uuid(),
                cart_id: cartIds[0],
                product_id: productIds[1],
                quantity: 1,
            },
            {
                id: uuid(),
                cart_id: cartIds[1],
                product_id: productIds[2],
                quantity: 3,
            },
            {
                id: uuid(),
                cart_id: cartIds[2],
                product_id: productIds[3],
                quantity: 1,
            },
            {
                id: uuid(),
                cart_id: cartIds[2],
                product_id: productIds[4],
                quantity: 2,
            },
        ],
        skipDuplicates: true,
    });

    // ==========
    //   ORDERS
    // ==========

    const orderIds = Array.from({ length: 3 }, () => uuid());

    await prisma.orders.createMany({
        data: orderIds.map((id, index) => ({
            id,
            user_id: userIds[3 + index],
            address_id: addressIds[index],
            order_number: `ORD-20260810-000${index + 1}`,
            status: index === 0 ? "PAID" : "PENDING",
            subtotal: `${(50 + index * 20).toFixed(2)}`,
            shipping_cost: "5.00",
            total_amount: `${(55 + index * 20).toFixed(2)}`,
        })),
        skipDuplicates: true,
    });

    // =================
    //   SELLER_ORDERS
    // =================

    const sellerOrderIds = Array.from({ length: 3 }, () => uuid());

    await prisma.seller_orders.createMany({
        data: sellerOrderIds.map((id, index) => ({
            id,
            order_id: orderIds[index],
            store_id: storeIds[index],
            order_number: `ORD-20260810-S${index + 1}-000${index + 1}`,
            status: index === 0 ? "PROCESSING" : "PENDING",
            subtotal: `${(30 + index * 15).toFixed(2)}`,
            shipping_cost: "3.00",
            total_amount: `${(33 + index * 15).toFixed(2)}`,
        })),
        skipDuplicates: true,
    });

    // ===============
    //   ORDER_ITEMS
    // ===============

    const orderItemIds = Array.from({ length: 4 }, () => uuid());

    await prisma.order_items.createMany({
        data: [
            {
                id: orderItemIds[0],
                seller_order_id: sellerOrderIds[0],
                product_id: productIds[0],
                product_name: "Produk 1",
                price: "25.00",
                quantity: 2,
                subtotal: "50.00",
            },
            {
                id: orderItemIds[1],
                seller_order_id: sellerOrderIds[0],
                product_id: productIds[1],
                product_name: "Produk 2",
                price: "30.00",
                quantity: 1,
                subtotal: "30.00",
            },
            {
                id: orderItemIds[2],
                seller_order_id: sellerOrderIds[1],
                product_id: productIds[2],
                product_name: "Produk 3",
                price: "35.00",
                quantity: 1,
                subtotal: "35.00",
            },
            {
                id: orderItemIds[3],
                seller_order_id: sellerOrderIds[2],
                product_id: productIds[3],
                product_name: "Produk 4",
                price: "40.00",
                quantity: 1,
                subtotal: "40.00",
            },
        ],
        skipDuplicates: true,
    });

    // ===================
    //   PAYMENT_METHODS
    // ===================

    const paymentMethodIds = [uuid(), uuid(), uuid()];

    await prisma.payment_methods.createMany({
        data: [
            {
                id: paymentMethodIds[0],
                code: "QRIS",
                name: "QRIS",
                description: "Pembayaran QRIS",
            },
            {
                id: paymentMethodIds[1],
                code: "BRI",
                name: "BRI Virtual Account",
                description: "Transfer BRI Virtual Account",
            },
            {
                id: paymentMethodIds[2],
                code: "OVO",
                name: "OVO",
                description: "Dompet digital OVO",
            },
        ],
        skipDuplicates: true,
    });

    // ============
    //   PAYMENTS
    // ============

    await prisma.payments.createMany({
        data: orderIds.map((orderId, index) => ({
            id: uuid(),
            order_id: orderId,
            payment_method_id: paymentMethodIds[index],
            payment_status: index === 0 ? "PAID" : "PENDING",
            transaction_id: `TRX-${index + 1}-2026`,
            paid_at: index === 0 ? new Date() : null,
        })),
        skipDuplicates: true,
    });

    // ============
    //   COURIERS
    // ============

    const courierIds = [uuid(), uuid()];

    await prisma.couriers.createMany({
        data: [
            {
                id: courierIds[0],
                code: "JNE",
                name: "JNE Express",
            },
            {
                id: courierIds[1],
                code: "SICEPAT",
                name: "SiCepat",
            },
        ],
        skipDuplicates: true,
    });

    // =============
    //   SHIPMENTS
    // =============

    const shipmentIds = [uuid(), uuid()];

    await prisma.shipments.createMany({
        data: [
            {
                id: shipmentIds[0],
                seller_order_id: sellerOrderIds[0],
                courier_id: courierIds[0],
                service: "REG",
                tracking_number: "TRK-0001",
                status: "SHIPPED",
                shipped_at: new Date(),
            },
            {
                id: shipmentIds[1],
                seller_order_id: sellerOrderIds[1],
                courier_id: courierIds[1],
                service: "ECO",
                tracking_number: "TRK-0002",
                status: "IN_TRANSIT",
                shipped_at: new Date(),
            },
        ],
        skipDuplicates: true,
    });

    // ===================
    //   SHIPMENT_PROOFS
    // ===================

    await prisma.shipment_proofs.createMany({
        data: [
            {
                id: uuid(),
                shipment_id: shipmentIds[0],
                photo_url: "https://example.com/shipment-proof-1.jpg",
                description: "Foto paket saat dikirim",
            },
            {
                id: uuid(),
                shipment_id: shipmentIds[1],
                photo_url: "https://example.com/shipment-proof-2.jpg",
                description: "Bukti pengiriman paket",
            },
        ],
        skipDuplicates: true,
    });

    // ===========
    //   REVIEWS
    // ===========

    await prisma.reviews.createMany({
        data: [
            {
                id: uuid(),
                user_id: userIds[4],
                order_item_id: orderItemIds[0],
                rating: 5,
                comment: "Produk sesuai ekspektasi.",
            },
            {
                id: uuid(),
                user_id: userIds[5],
                order_item_id: orderItemIds[1],
                rating: 4,
                comment: "Layanan cepat dan barang bagus.",
            },
        ],
        skipDuplicates: true,
    });

    console.log("Seed data berhasil dibuat.");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    });
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
    // HAPUS SEMUA DATA TABLE DAHULU

    // Increase interactive transaction timeout to avoid commit timeouts on slow environments
    await prisma.$transaction([
        // =====================
        // TRANSACTION / ORDER
        // =====================
        prisma.shipmentProof.deleteMany(),
        prisma.shipment.deleteMany(),
        prisma.payment.deleteMany(),
        prisma.review.deleteMany(),
        prisma.orderItem.deleteMany(),
        prisma.sellerOrder.deleteMany(),
        prisma.order.deleteMany(),

        // =====================
        // CART
        // =====================
        prisma.cartItem.deleteMany(),
        prisma.cart.deleteMany(),

        // =====================
        // PRODUCT
        // =====================
        prisma.productCategory.deleteMany(),
        prisma.productImage.deleteMany(),
        prisma.product.deleteMany(),
        prisma.category.deleteMany(),

        // =====================
        // STORE / SELLER
        // =====================
        prisma.store.deleteMany(),
        prisma.sellerDocument.deleteMany(),
        prisma.sellerBusiness.deleteMany(),
        prisma.seller.deleteMany(),

        // =====================
        // USER
        // =====================
        prisma.profile.deleteMany(),
        prisma.address.deleteMany(),
        prisma.account.deleteMany(),
        prisma.user.deleteMany(),

        // =====================
        // MASTER
        // =====================
        prisma.courier.deleteMany(),
        prisma.paymentMethod.deleteMany(),
        prisma.businessType.deleteMany(),
        prisma.role.deleteMany(),
    ], { maxWait: 20000 });

    console.log("Data lama berhasil dihapus.");

    // ===============
    //    SEED ROLES
    // ===============

    const roleIds = {
        customer: uuid(),
        seller: uuid(),
        admin: uuid(),
    };

    await prisma.role.createMany({
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

    // ===============
    //    SEED USERS
    // ===============

    const userIds = Array.from({ length: 10 }, () => uuid());

    await prisma.user.createMany({
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

    // =================
    //   SEED PROFILES
    // =================

    await prisma.profile.createMany({
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

    // ==================
    //   SEED ADDRESSES
    // ==================

    const addressIds = Array.from({ length: 5 }, () => uuid());

    await prisma.address.createMany({
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

    // =======================
    //   SEED BUSINESS_TYPES
    // =======================

    const businessTypeIds = [uuid(), uuid(), uuid()];

    await prisma.businessType.createMany({
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

    // ================
    //   SEED SELLERS
    // ================

    const sellerIds = userIds.slice(0, 3).map(() => uuid());

    await prisma.seller.createMany({
        data: sellerIds.map((id, index) => ({
            id,
            user_id: userIds[index],
            seller_type: index === 0 ? "INDIVIDUAL" : "BUSINESS",
            verification_status: index === 0 ? "VERIFIED" : "PENDING",
            verified_at: index === 0 ? new Date() : null,
        })),
        skipDuplicates: true,
    });

    // ==========================
    //   SEED SELLER_BUSINESSES
    // ==========================

    const sellerBusinessIds = sellerIds.map(() => uuid());

    await prisma.sellerBusiness.createMany({
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

    // =========================
    //   SEED SELLER_DOCUMENTS
    // =========================

    const sellerDocumentIds = sellerIds.map(() => uuid());

    await prisma.sellerDocument.createMany({
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

    // ===============
    //   SEED STORES
    // ===============

    const storeIds = sellerIds.map(() => uuid());

    await prisma.store.createMany({
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

    // ===================
    //   SEED CATEGORIES
    // ===================

    const categoryIds = Array.from({ length: 5 }, () => uuid());
    const categoryNames = ["Fashion", "Electronics", "Home", "Beauty", "Sports"];

    await prisma.category.createMany({
        data: categoryIds.map((id, index) => ({
            id,
            name: categoryNames[index],
            slug: categoryNames[index].toLowerCase(),
            description: `Kategori ${categoryNames[index]} untuk produk.`,
        })),
        skipDuplicates: true,
    });

    // =================
    //   SEED PRODUCTS
    // =================

    const productIds = Array.from({ length: 10 }, () => uuid());

    await prisma.product.createMany({
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

    // =======================
    //   SEED PRODUCT_IMAGES
    // =======================

    const productImageIds = productIds.map(() => uuid());

    await prisma.productImage.createMany({
        data: productImageIds.map((id, index) => ({
            id,
            product_id: productIds[index],
            image_url: `https://example.com/products/${index + 1}.jpg`,
            is_primary: true,
            sort_order: 0,
        })),
        skipDuplicates: true,
    });

    // ===========================
    //   SEED PRODUCT_CATEGORIES
    // ===========================

    await prisma.productCategory.createMany({
        data: productIds.map((productId, index) => ({
            product_id: productId,
            category_id: categoryIds[index % categoryIds.length],
        })),
        skipDuplicates: true,
    });

    // ==============
    //   SEED CARTS
    // ==============

    const cartIds = userIds.slice(0, 3).map(() => uuid());

    await prisma.cart.createMany({
        data: cartIds.map((id, index) => ({
            id,
            user_id: userIds[index],
        })),
        skipDuplicates: true,
    });

    // ===================
    //   SEED CART_ITEMS
    // ===================

    await prisma.cartItem.createMany({
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

    // ===============
    //   SEED ORDERS
    // ===============

    const orderIds = Array.from({ length: 3 }, () => uuid());

    await prisma.order.createMany({
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

    // ======================
    //   SEED SELLER_ORDERS
    // ======================

    const sellerOrderIds = Array.from({ length: 3 }, () => uuid());

    await prisma.sellerOrder.createMany({
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

    // ====================
    //   SEED ORDER_ITEMS
    // ====================

    const orderItemIds = Array.from({ length: 4 }, () => uuid());

    await prisma.orderItem.createMany({
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

    // ========================
    //   SEED PAYMENT_METHODS
    // ========================

    const paymentMethodIds = [uuid(), uuid(), uuid()];

    await prisma.paymentMethod.createMany({
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

    // =================
    //   SEED PAYMENTS
    // =================

    await prisma.payment.createMany({
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

    // =================
    //   SEED COURIERS
    // =================

    const courierIds = [uuid(), uuid()];

    await prisma.courier.createMany({
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

    // ==================
    //   SEED SHIPMENTS
    // ==================

    const shipmentIds = [uuid(), uuid()];

    await prisma.shipment.createMany({
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

    // ========================
    //   SEED SHIPMENT_PROOFS
    // ========================

    await prisma.shipmentProof.createMany({
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

    // ================
    //   SEED REVIEWS
    // ================

    await prisma.review.createMany({
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
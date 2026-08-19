import "dotenv/config";
import { v7 as uuidv7 } from "uuid";
import { prisma } from "@/lib/prisma";

const uuid = () => uuidv7();
const money = (value: number) => value.toFixed(2);

async function main() {
    console.log("==========================================");
    console.log("START SEED");
    console.log("==========================================");

    // =========================================================
    // 1. RESET DATA
    // =========================================================

    await prisma.shipmentProof.deleteMany();
    await prisma.shipment.deleteMany();

    await prisma.payment.deleteMany();

    await prisma.review.deleteMany();

    await prisma.orderItem.deleteMany();
    await prisma.sellerOrder.deleteMany();
    await prisma.order.deleteMany();

    await prisma.cartItem.deleteMany();
    await prisma.cart.deleteMany();

    await prisma.productVariantValue.deleteMany();
    await prisma.productOptionValue.deleteMany();
    await prisma.productOption.deleteMany();

    await prisma.productCategory.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.productVariant.deleteMany();
    await prisma.product.deleteMany();

    await prisma.category.deleteMany();

    await prisma.store.deleteMany();

    await prisma.sellerDocument.deleteMany();
    await prisma.sellerBusiness.deleteMany();
    await prisma.seller.deleteMany();

    await prisma.member.deleteMany();
    await prisma.profile.deleteMany();
    await prisma.address.deleteMany();

    await prisma.praForgotPassword.deleteMany();
    await prisma.praRegister.deleteMany();
    await prisma.praLogin.deleteMany();
    await prisma.user.deleteMany();

    await prisma.courier.deleteMany();
    await prisma.paymentMethod.deleteMany();
    await prisma.businessType.deleteMany();
    await prisma.role.deleteMany();

    console.log("Data lama berhasil dihapus.");

    // =========================================================
    // 2. ROLES
    // =========================================================

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
                description: "Pelanggan marketplace",
                level: 1,
            },
            {
                id: roleIds.seller,
                name: "SELLER",
                description: "Penjual marketplace",
                level: 5,
            },
            {
                id: roleIds.admin,
                name: "ADMIN",
                description: "Administrator marketplace",
                level: 10,
            },
        ],
    });

    // =========================================================
    // 3. USERS
    // =========================================================
    // 10 user:
    // 0-3 = Seller
    // 4-9 = Customer
    // =========================================================

    const people = [
        {
            name: "Andi Pratama",
            username: "andi.pratama",
            email: "andi.pratama@example.com",
            phone: "+6281234567801",
            gender: "MALE" as const,
            birth: "1994-02-12",
        },
        {
            name: "Budi Santoso",
            username: "budi.santoso",
            email: "budi.santoso@example.com",
            phone: "+6281234567802",
            gender: "MALE" as const,
            birth: "1989-07-23",
        },
        {
            name: "Citra Lestari",
            username: "citra.lestari",
            email: "citra.lestari@example.com",
            phone: "+6281234567803",
            gender: "FEMALE" as const,
            birth: "1992-11-08",
        },
        {
            name: "Dewi Anggraini",
            username: "dewi.anggraini",
            email: "dewi.anggraini@example.com",
            phone: "+6281234567804",
            gender: "FEMALE" as const,
            birth: "1996-04-17",
        },
        {
            name: "Eko Saputra",
            username: "eko.saputra",
            email: "eko.saputra@example.com",
            phone: "+6281234567805",
            gender: "MALE" as const,
            birth: "1995-09-05",
        },
        {
            name: "Fajar Ramadhan",
            username: "fajar.ramadhan",
            email: "fajar.ramadhan@example.com",
            phone: "+6281234567806",
            gender: "MALE" as const,
            birth: "1991-01-29",
        },
        {
            name: "Gita Maharani",
            username: "gita.maharani",
            email: "gita.maharani@example.com",
            phone: "+6281234567807",
            gender: "FEMALE" as const,
            birth: "1997-06-14",
        },
        {
            name: "Hendra Wijaya",
            username: "hendra.wijaya",
            email: "hendra.wijaya@example.com",
            phone: "+6281234567808",
            gender: "MALE" as const,
            birth: "1990-12-03",
        },
        {
            name: "Intan Permata",
            username: "intan.permata",
            email: "intan.permata@example.com",
            phone: "+6281234567809",
            gender: "FEMALE" as const,
            birth: "1998-03-21",
        },
        {
            name: "Joko Kurniawan",
            username: "joko.kurniawan",
            email: "joko.kurniawan@example.com",
            phone: "+6281234567810",
            gender: "MALE" as const,
            birth: "1993-10-11",
        },
    ];

    const userIds = people.map(() => uuid());

    await prisma.user.createMany({
        data: people.map((person, index) => ({
            id: userIds[index],
            username: person.username,
            email: person.email,
            password: `Password${index + 1}!`,
            phone: person.phone,
            role_id: index < 4 ? roleIds.seller : roleIds.customer,
        })),
    });

    // =========================================================
    // 4. PROFILE
    // =========================================================
    // Tepat 1 Profile untuk setiap User.
    // =========================================================

    await prisma.profile.createMany({
        data: people.map((person, index) => ({
            id: uuid(),
            user_id: userIds[index],
            nik: `327301${String(1000000000 + index + 1).padStart(10, "0")}`,
            full_name: person.name,
            avatar: `https://i.pravatar.cc/300?img=${index + 11}`,
            gender: person.gender,
            birth_date: new Date(`${person.birth}T00:00:00`),
        })),
    });

    // =========================================================
    // 5. ADDRESS
    // =========================================================
    // Tepat 1 Address untuk setiap User.
    // =========================================================

    const addressData = [
        ["Jl. Melati No. 12", "Bandung", "Jawa Barat", "40132"],
        ["Jl. Sukajadi No. 88", "Bandung", "Jawa Barat", "40162"],
        ["Jl. Ahmad Yani No. 45", "Bandung", "Jawa Barat", "40285"],
        ["Jl. Gatot Subroto No. 17", "Bandung", "Jawa Barat", "40264"],
        ["Jl. Kaliurang Km 7 No. 21", "Sleman", "DI Yogyakarta", "55581"],
        ["Jl. Gejayan No. 35", "Sleman", "DI Yogyakarta", "55281"],
        ["Jl. Diponegoro No. 19", "Semarang", "Jawa Tengah", "50251"],
        ["Jl. Pandanaran No. 63", "Semarang", "Jawa Tengah", "50134"],
        ["Jl. Margonda Raya No. 72", "Depok", "Jawa Barat", "16424"],
        ["Jl. Dharmawangsa No. 14", "Surabaya", "Jawa Timur", "60286"],
    ] as const;

    const addressIds = userIds.map(() => uuid());

    await prisma.address.createMany({
        data: addressData.map((address, index) => ({
            id: addressIds[index],
            user_id: userIds[index],
            recipient_name: people[index].name,
            phone: people[index].phone,
            address: address[0],
            city: address[1],
            province: address[2],
            postal_code: address[3],
        })),
    });

    // =========================================================
    // 6. MEMBERS
    // =========================================================
    // Karena Member.user_id UNIQUE, setiap User hanya 1 Member.
    // =========================================================

    await prisma.member.createMany({
        data: people.map((person, index) => ({
            id: uuid(),
            user_id: userIds[index],
            full_name: person.name,
            email: person.email,
            phone: person.phone,
        })),
    });

    // =========================================================
    // 7. BUSINESS TYPES
    // =========================================================

    const businessTypes = [
        {
            name: "Perseroan Terbatas",
            code: "PT",
            description: "Badan usaha berbentuk Perseroan Terbatas.",
        },
        {
            name: "Commanditaire Vennootschap",
            code: "CV",
            description: "Badan usaha berbentuk Commanditaire Vennootschap.",
        },
        {
            name: "Usaha Mikro dan Kecil",
            code: "UMK",
            description: "Usaha mikro dan kecil milik perorangan.",
        },
    ];

    const businessTypeIds = businessTypes.map(() => uuid());

    await prisma.businessType.createMany({
        data: businessTypes.map((item, index) => ({
            id: businessTypeIds[index],
            name: item.name,
            code: item.code,
            description: item.description,
        })),
    });

    // =========================================================
    // 8. SELLERS
    // =========================================================
    //
    // Seller 1 = Individual
    // Seller 2 = PT
    // Seller 3 = CV
    // Seller 4 = UMK
    //
    // =========================================================

    const sellerIds = userIds.slice(0, 4).map(() => uuid());

    await prisma.seller.createMany({
        data: sellerIds.map((id, index) => ({
            id,
            user_id: userIds[index],
            seller_type: index === 0 ? "INDIVIDUAL" : "BUSINESS",
            verification_status: "VERIFIED",
            verified_at: new Date(),
        })),
    });

    // =========================================================
    // 9. SELLER BUSINESSES
    // =========================================================

    const sellerBusinessIds = sellerIds.slice(1).map(() => uuid());

    await prisma.sellerBusiness.createMany({
        data: [
            {
                id: sellerBusinessIds[0],
                seller_id: sellerIds[1],
                business_name: "PT Nusantara Gaya Indonesia",
                business_type_id: businessTypeIds[0],
                tax_number: "1234567890123456",
                business_registration_number: "9120301234567",
            },
            {
                id: sellerBusinessIds[1],
                seller_id: sellerIds[2],
                business_name: "CV Sumber Teknologi Mandiri",
                business_type_id: businessTypeIds[1],
                tax_number: "1234567890123457",
                business_registration_number: "9120301234568",
            },
            {
                id: sellerBusinessIds[2],
                seller_id: sellerIds[3],
                business_name: "UMK Rasa Nusantara",
                business_type_id: businessTypeIds[2],
                tax_number: "1234567890123458",
                business_registration_number: "9120301234569",
            },
        ],
    });

    // =========================================================
    // 10. SELLER DOCUMENTS
    // =========================================================

    const sellerDocuments = [
        // Individual
        {
            seller_id: sellerIds[0],
            type: "IDENTITY" as const,
            number: "3273011202940001",
            url: "https://example.com/documents/andi-ktp.pdf",
        },

        // PT
        {
            seller_id: sellerIds[1],
            type: "IDENTITY" as const,
            number: "3273012307890002",
            url: "https://example.com/documents/budi-ktp.pdf",
        },
        {
            seller_id: sellerIds[1],
            type: "TAX" as const,
            number: "1234567890123456",
            url: "https://example.com/documents/pt-nusantara-npwp.pdf",
        },
        {
            seller_id: sellerIds[1],
            type: "BUSINESS_REGISTRATION" as const,
            number: "9120301234567",
            url: "https://example.com/documents/pt-nusantara-nib.pdf",
        },

        // CV
        {
            seller_id: sellerIds[2],
            type: "IDENTITY" as const,
            number: "3273010804920003",
            url: "https://example.com/documents/citra-ktp.pdf",
        },
        {
            seller_id: sellerIds[2],
            type: "TAX" as const,
            number: "1234567890123457",
            url: "https://example.com/documents/cv-sumber-npwp.pdf",
        },
        {
            seller_id: sellerIds[2],
            type: "BUSINESS_REGISTRATION" as const,
            number: "9120301234568",
            url: "https://example.com/documents/cv-sumber-nib.pdf",
        },

        // UMK
        {
            seller_id: sellerIds[3],
            type: "IDENTITY" as const,
            number: "3273011704960004",
            url: "https://example.com/documents/dewi-ktp.pdf",
        },
        {
            seller_id: sellerIds[3],
            type: "TAX" as const,
            number: "1234567890123458",
            url: "https://example.com/documents/rasa-nusantara-npwp.pdf",
        },
        {
            seller_id: sellerIds[3],
            type: "BUSINESS_REGISTRATION" as const,
            number: "9120301234569",
            url: "https://example.com/documents/rasa-nusantara-nib.pdf",
        },
    ];

    await prisma.sellerDocument.createMany({
        data: sellerDocuments.map((document) => ({
            id: uuid(),
            seller_id: document.seller_id,
            document_type: document.type,
            document_number: document.number,
            document_url: document.url,
            verification_status: "VERIFIED",
            verified_at: new Date(),
        })),
    });

    // =========================================================
    // 11. STORES
    // =========================================================
    //
    // Seller 1 -> 1 toko
    // Seller 2 -> 2 toko
    // Seller 3 -> 3 toko
    // Seller 4 -> 2 toko
    //
    // Total = 8 toko
    //
    // store_code UNIQUE GLOBAL -> semua berbeda.
    // =========================================================

    const storeData = [
        {
            seller: 0,
            name: "Andi Apparel",
            code: "A01",
            slug: "andi-apparel",
            city: "Bandung",
            province: "Jawa Barat",
            postal: "40132",
            address: "Jl. Melati No. 12, Bandung",
        },

        {
            seller: 1,
            name: "Nusantara Style Bandung",
            code: "N01",
            slug: "nusantara-style-bandung",
            city: "Bandung",
            province: "Jawa Barat",
            postal: "40162",
            address: "Jl. Sukajadi No. 88, Bandung",
        },
        {
            seller: 1,
            name: "Nusantara Style Jakarta",
            code: "N02",
            slug: "nusantara-style-jakarta",
            city: "Jakarta Selatan",
            province: "DKI Jakarta",
            postal: "12110",
            address: "Jl. Veteran No. 33, Jakarta Selatan",
        },

        {
            seller: 2,
            name: "Sumber Tech Bandung",
            code: "T01",
            slug: "sumber-tech-bandung",
            city: "Bandung",
            province: "Jawa Barat",
            postal: "40285",
            address: "Jl. Ahmad Yani No. 45, Bandung",
        },
        {
            seller: 2,
            name: "Sumber Tech Surabaya",
            code: "T02",
            slug: "sumber-tech-surabaya",
            city: "Surabaya",
            province: "Jawa Timur",
            postal: "60241",
            address: "Jl. Raya Darmo No. 55, Surabaya",
        },
        {
            seller: 2,
            name: "Sumber Tech Yogyakarta",
            code: "T03",
            slug: "sumber-tech-yogyakarta",
            city: "Sleman",
            province: "DI Yogyakarta",
            postal: "55581",
            address: "Jl. Kaliurang Km 7 No. 21, Sleman",
        },

        {
            seller: 3,
            name: "Rasa Nusantara Bogor",
            code: "R01",
            slug: "rasa-nusantara-bogor",
            city: "Bogor",
            province: "Jawa Barat",
            postal: "16128",
            address: "Jl. Pajajaran No. 40, Bogor",
        },
        {
            seller: 3,
            name: "Rasa Nusantara Semarang",
            code: "R02",
            slug: "rasa-nusantara-semarang",
            city: "Semarang",
            province: "Jawa Tengah",
            postal: "50134",
            address: "Jl. Pandanaran No. 63, Semarang",
        },
    ] as const;

    const storeIds = storeData.map(() => uuid());

    await prisma.store.createMany({
        data: storeData.map((store, index) => ({
            id: storeIds[index],
            seller_id: sellerIds[store.seller],
            name: store.name,
            store_code: store.code,
            slug: store.slug,
            description: `Toko resmi ${store.name}.`,
            logo: `https://placehold.co/500x500/png?text=${encodeURIComponent(store.name)}`,
            phone: `+628123450${String(index + 1).padStart(4, "0")}`,
            address: store.address,
            city: store.city,
            province: store.province,
            postal_code: store.postal,
        })),
    });

    // =========================================================
    // 12. CATEGORIES
    // =========================================================

    const categoryData = [
        ["Fashion", "fashion"],
        ["Elektronik", "elektronik"],
        ["Komputer & Aksesoris", "komputer-aksesoris"],
        ["Makanan & Minuman", "makanan-minuman"],
        ["Rumah Tangga", "rumah-tangga"],
        ["Kecantikan", "kecantikan"],
        ["Olahraga", "olahraga"],
        ["Tas & Sepatu", "tas-sepatu"],
    ] as const;

    const categoryIds = categoryData.map(() => uuid());

    await prisma.category.createMany({
        data: categoryData.map((category, index) => ({
            id: categoryIds[index],
            name: category[0],
            slug: category[1],
            description: `Kategori ${category[0]}.`,
        })),
    });

    // =========================================================
    // 13. PRODUCTS
    // =========================================================

    const products = [
        {
            store: 0,
            name: "Kaos Oversize Cotton 24s",
            slug: "kaos-oversize-cotton-24s",
            price: 89000,
            category: [0],
            options: [
                { name: "Warna", values: ["Hitam", "Putih", "Navy"] },
                { name: "Ukuran", values: ["S", "M", "L", "XL"] },
            ],
        },

        {
            store: 1,
            name: "Hoodie Fleece Premium",
            slug: "hoodie-fleece-premium",
            price: 189000,
            category: [0],
            options: [
                { name: "Warna", values: ["Hitam", "Abu-abu"] },
                { name: "Ukuran", values: ["M", "L", "XL"] },
            ],
        },

        {
            store: 2,
            name: "Sneakers Urban Daily",
            slug: "sneakers-urban-daily",
            price: 329000,
            category: [7],
            options: [
                { name: "Warna", values: ["Putih", "Hitam"] },
                { name: "Ukuran", values: ["39", "40", "41", "42", "43"] },
            ],
        },

        {
            store: 3,
            name: "Wireless Mechanical Keyboard",
            slug: "wireless-mechanical-keyboard",
            price: 749000,
            category: [2],
            options: [
                { name: "Switch", values: ["Red", "Brown", "Blue"] },
                { name: "Layout", values: ["75%", "TKL"] },
            ],
        },

        {
            store: 3,
            name: "Mouse Wireless Ergonomis",
            slug: "mouse-wireless-ergonomis",
            price: 259000,
            category: [2],
            options: [
                { name: "Warna", values: ["Hitam", "Putih"] },
                { name: "DPI", values: ["1200", "2400", "3200"] },
            ],
        },

        {
            store: 4,
            name: "Headset Bluetooth ANC",
            slug: "headset-bluetooth-anc",
            price: 699000,
            category: [1],
            options: [
                { name: "Warna", values: ["Hitam", "Putih"] },
            ],
        },

        {
            store: 5,
            name: "Smartwatch Active S2",
            slug: "smartwatch-active-s2",
            price: 899000,
            category: [1, 6],
            options: [
                { name: "Warna", values: ["Hitam", "Silver"] },
                { name: "Strap", values: ["Silikon", "Nylon"] },
            ],
        },

        {
            store: 6,
            name: "Kopi Arabika Gayo",
            slug: "kopi-arabika-gayo",
            price: 85000,
            category: [3],
            options: [
                { name: "Berat", values: ["250g", "500g", "1kg"] },
                { name: "Roast", values: ["Light", "Medium", "Dark"] },
            ],
        },

        {
            store: 7,
            name: "Sambal Cumi Pedas",
            slug: "sambal-cumi-pedas",
            price: 45000,
            category: [3],
            options: [
                { name: "Berat", values: ["150g", "250g", "500g"] },
                { name: "Level Pedas", values: ["Sedang", "Pedas", "Extra Pedas"] },
            ],
        },

        {
            store: 6,
            name: "Granola Madu Kacang",
            slug: "granola-madu-kacang",
            price: 72000,
            category: [3],
            options: [
                { name: "Berat", values: ["250g", "500g"] },
                { name: "Rasa", values: ["Madu", "Cokelat"] },
            ],
        },
    ] as const;

    const productIds = products.map(() => uuid());

    await prisma.product.createMany({
        data: products.map((product, index) => ({
            id: productIds[index],
            store_id: storeIds[product.store],
            name: product.name,
            slug: product.slug,
            description:
                `${product.name} berkualitas dari ${storeData[product.store].name}. ` +
                `Produk tersedia dengan beberapa pilihan sesuai kebutuhan pelanggan.`,
            price: money(product.price),
            stock: 100,
            status: "ACTIVE",
        })),
    });

    // =========================================================
    // 14. PRODUCT IMAGES
    // =========================================================
    //
    // URL publik langsung.
    // =========================================================

    const imageUrls = [
        [
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
            "https://images.unsplash.com/photo-1503341504253-dff4815485f1",
        ],
        [
            "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3",
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
        ],
        [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
            "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3",
        ],
        [
            "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
            "https://images.unsplash.com/photo-1595225476474-87563907a212",
        ],
        [
            "https://images.unsplash.com/photo-1527814050087-3793815479db",
            "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7",
        ],
        [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
            "https://images.unsplash.com/photo-1484704849700-f032a568e944",
        ],
        [
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
            "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
        ],
        [
            "https://images.unsplash.com/photo-1447933601403-0c6688de566e",
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
        ],
        [
            "https://images.unsplash.com/photo-1601050690597-df0568f70950",
            "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f",
        ],
        [
            "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38",
            "https://images.unsplash.com/photo-1498837167922-ddd27525d352",
        ],
    ];

    await prisma.productImage.createMany({
        data: productIds.flatMap((productId, index) => [
            {
                id: uuid(),
                product_id: productId,
                image_url: imageUrls[index][0],
                is_primary: true,
                sort_order: 0,
            },
            {
                id: uuid(),
                product_id: productId,
                image_url: imageUrls[index][1],
                is_primary: false,
                sort_order: 1,
            },
        ]),
    });

    // =========================================================
    // 15. PRODUCT CATEGORIES
    // =========================================================

    await prisma.productCategory.createMany({
        data: products.flatMap((product, productIndex) =>
            product.category.map((categoryIndex) => ({
                product_id: productIds[productIndex],
                category_id: categoryIds[categoryIndex],
            })),
        ),
    });

    // =========================================================
    // 16. PRODUCT OPTIONS + VALUES
    // =========================================================

    const optionValueIdsByProduct: string[][][] = [];

    for (let productIndex = 0; productIndex < products.length; productIndex++) {
        const product = products[productIndex];

        const optionValueIds: string[][] = [];

        for (
            let optionIndex = 0;
            optionIndex < product.options.length;
            optionIndex++
        ) {
            const option = product.options[optionIndex];

            const optionId = uuid();

            await prisma.productOption.create({
                data: {
                    id: optionId,
                    product_id: productIds[productIndex],
                    name: option.name,
                    sort_order: optionIndex,
                },
            });

            const valueIds = option.values.map(() => uuid());

            await prisma.productOptionValue.createMany({
                data: option.values.map((value, valueIndex) => ({
                    id: valueIds[valueIndex],
                    option_id: optionId,
                    value,
                    sort_order: valueIndex,
                })),
            });

            optionValueIds.push(valueIds);
        }

        optionValueIdsByProduct.push(optionValueIds);
    }

    // =========================================================
    // 17. PRODUCT VARIANTS
    // =========================================================
    //
    // Setiap kombinasi dibuat terbatas maksimal 6 variant.
    // =========================================================

    const variantRows: {
        id: string;
        product_id: string;
        sku: string;
        price: string;
        stock: number;
    }[] = [];

    const variantValueRows: {
        variant_id: string;
        option_value_id: string;
    }[] = [];

    const firstVariantByProduct = new Map<string, string>();

    for (let productIndex = 0; productIndex < products.length; productIndex++) {
        const product = products[productIndex];
        const optionValues = optionValueIdsByProduct[productIndex];

        // Produk dengan satu option
        if (product.options.length === 1) {
            const firstValues = optionValues[0].slice(0, 6);

            for (let i = 0; i < firstValues.length; i++) {
                const variantId = uuid();

                variantRows.push({
                    id: variantId,
                    product_id: productIds[productIndex],
                    sku: `${product.slug.slice(0, 8).toUpperCase()}-${i + 1}`,
                    price: money(product.price + i * 5000),
                    stock: 30 + i * 5,
                });

                variantValueRows.push({
                    variant_id: variantId,
                    option_value_id: firstValues[i],
                });

                if (!firstVariantByProduct.has(productIds[productIndex])) {
                    firstVariantByProduct.set(
                        productIds[productIndex],
                        variantId,
                    );
                }
            }

            continue;
        }

        // Produk dengan 2 option
        const firstValues = optionValues[0].slice(0, 3);
        const secondValues = optionValues[1].slice(0, 3);

        let counter = 0;

        for (const firstValue of firstValues) {
            for (const secondValue of secondValues) {
                if (counter >= 6) break;

                const variantId = uuid();

                variantRows.push({
                    id: variantId,
                    product_id: productIds[productIndex],
                    sku: `${product.slug.slice(0, 8).toUpperCase()}-${counter + 1}`,
                    price: money(product.price + counter * 5000),
                    stock: 20 + counter * 5,
                });

                variantValueRows.push(
                    {
                        variant_id: variantId,
                        option_value_id: firstValue,
                    },
                    {
                        variant_id: variantId,
                        option_value_id: secondValue,
                    },
                );

                if (!firstVariantByProduct.has(productIds[productIndex])) {
                    firstVariantByProduct.set(
                        productIds[productIndex],
                        variantId,
                    );
                }

                counter++;
            }
        }
    }

    await prisma.productVariant.createMany({
        data: variantRows,
    });

    await prisma.productVariantValue.createMany({
        data: variantValueRows,
    });

    // =========================================================
    // 18. CART
    // =========================================================

    const cartIds = userIds.map(() => uuid());

    await prisma.cart.createMany({
        data: userIds.map((userId, index) => ({
            id: cartIds[index],
            user_id: userId,
        })),
    });

    // =========================================================
    // 19. CART ITEMS
    // =========================================================

    await prisma.cartItem.createMany({
        data: userIds.flatMap((_, userIndex) => {
            const productIndexA = userIndex % products.length;
            const productIndexB = (userIndex + 3) % products.length;

            return [
                {
                    id: uuid(),
                    cart_id: cartIds[userIndex],
                    product_id: productIds[productIndexA],
                    variant_id:
                        firstVariantByProduct.get(productIds[productIndexA]) ??
                        null,
                    quantity: 1 + (userIndex % 3),
                },
                {
                    id: uuid(),
                    cart_id: cartIds[userIndex],
                    product_id: productIds[productIndexB],
                    variant_id:
                        firstVariantByProduct.get(productIds[productIndexB]) ??
                        null,
                    quantity: 1,
                },
            ];
        }),
    });

    // =========================================================
    // 20. PAYMENT METHODS
    // =========================================================

    const paymentMethods = [
        ["QRIS", "QRIS", "Pembayaran menggunakan QRIS."],
        [
            "BCA_VA",
            "BCA Virtual Account",
            "Pembayaran menggunakan Virtual Account BCA.",
        ],
        [
            "BRI_VA",
            "BRI Virtual Account",
            "Pembayaran menggunakan Virtual Account BRI.",
        ],
        ["GOPAY", "GoPay", "Pembayaran menggunakan GoPay."],
        ["COD", "Cash on Delivery", "Pembayaran tunai saat barang diterima."],
    ] as const;

    const paymentMethodIds = paymentMethods.map(() => uuid());

    await prisma.paymentMethod.createMany({
        data: paymentMethods.map((method, index) => ({
            id: paymentMethodIds[index],
            code: method[0],
            name: method[1],
            description: method[2],
        })),
    });

    // =========================================================
    // 21. COURIERS
    // =========================================================

    const couriers = [
        ["JNE", "JNE Express"],
        ["SICEPAT", "SiCepat Ekspres"],
        ["JNT", "J&T Express"],
        ["IDEXPRESS", "ID Express"],
        ["ANTERAJA", "AnterAja"],
    ] as const;

    const courierIds = couriers.map(() => uuid());

    await prisma.courier.createMany({
        data: couriers.map((courier, index) => ({
            id: courierIds[index],
            code: courier[0],
            name: courier[1],
        })),
    });

    // =========================================================
    // 22. ORDER HISTORY
    // =========================================================
    //
    // 10 User x 5 Order = 50 Order
    //
    // Setiap Order:
    //   1 SellerOrder
    //   2 OrderItem
    //
    // Total:
    //   50 Order
    //   50 SellerOrder
    //   100 OrderItem
    //
    // Semua DELIVERED agar seluruh item bisa memiliki review.
    //
    // Produk dalam satu SellerOrder selalu berasal dari Store
    // yang sama.
    // =========================================================

    const orderRows: {
        id: string;
        user_id: string;
        address_id: string;
        order_number: string;
        status: "DELIVERED";
        subtotal: string;
        shipping_cost: string;
        total_amount: string;
    }[] = [];

    const sellerOrderRows: {
        id: string;
        order_id: string;
        store_id: string;
        order_number: string;
        status: "DELIVERED";
        subtotal: string;
        shipping_cost: string;
        total_amount: string;
    }[] = [];

    const orderItemRows: {
        id: string;
        seller_order_id: string;
        product_id: string;
        product_name: string;
        price: string;
        quantity: number;
        subtotal: string;
    }[] = [];

    /*
     * Agar setiap product tepat 10 kali muncul:
     *
     * Product 0 -> 10
     * Product 1 -> 10
     * ...
     * Product 9 -> 10
     *
     * Untuk product yang berada di store yang sama,
     * kita kombinasikan secara berpasangan.
     */

    const orderProductPairs = [
        // Store 0 - product 0
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],

        // Store 1 - product 1
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1],

        // Store 2 - product 2
        [2, 2],
        [2, 2],
        [2, 2],
        [2, 2],
        [2, 2],

        // Store 3 - product 3 & 4
        [3, 4],
        [3, 4],
        [3, 4],
        [3, 4],
        [3, 4],
        [3, 4],
        [3, 4],
        [3, 4],
        [3, 4],
        [3, 4],

        // Store 4 - product 5
        [5, 5],
        [5, 5],
        [5, 5],
        [5, 5],
        [5, 5],

        // Store 5 - product 6
        [6, 6],
        [6, 6],
        [6, 6],
        [6, 6],
        [6, 6],

        // Store 6 - product 7 & 9
        [7, 9],
        [7, 9],
        [7, 9],
        [7, 9],
        [7, 9],
        [7, 9],
        [7, 9],
        [7, 9],
        [7, 9],
        [7, 9],

        // Store 7 - product 8
        [8, 8],
        [8, 8],
        [8, 8],
        [8, 8],
        [8, 8],
    ] as const;

    for (let index = 0; index < 50; index++) {
        const userIndex = index % userIds.length;

        const [productIndexA, productIndexB] =
            orderProductPairs[index];

        const productA = products[productIndexA];
        const productB = products[productIndexB];

        const quantityA = 1;
        const quantityB =
            productIndexA === productIndexB
                ? 1
                : index % 3 === 0
                  ? 2
                  : 1;

        const subtotal =
            productA.price * quantityA +
            productB.price * quantityB;

        const shipping = 12000 + (index % 4) * 3000;
        const total = subtotal + shipping;

        const orderId = uuid();
        const sellerOrderId = uuid();

        const itemAId = uuid();
        const itemBId = uuid();

        const storeId = storeIds[productA.store];
        const storeCode = storeData[productA.store].code;

        orderRows.push({
            id: orderId,
            user_id: userIds[userIndex],
            address_id: addressIds[userIndex],

            // 20 karakter / sesuai CHAR(20)
            order_number: `ORD${String(index + 1).padStart(17, "0")}`,

            status: "DELIVERED",

            subtotal: money(subtotal),
            shipping_cost: money(shipping),
            total_amount: money(total),
        });

        sellerOrderRows.push({
            id: sellerOrderId,
            order_id: orderId,
            store_id: storeId,

            // <= 25 karakter / sesuai CHAR(25)
            order_number:
                `SO${storeCode}${String(index + 1).padStart(20, "0")}`,

            status: "DELIVERED",

            subtotal: money(subtotal),
            shipping_cost: money(shipping),
            total_amount: money(total),
        });

        orderItemRows.push(
            {
                id: itemAId,
                seller_order_id: sellerOrderId,
                product_id: productIds[productIndexA],
                product_name: productA.name,
                price: money(productA.price),
                quantity: quantityA,
                subtotal: money(productA.price * quantityA),
            },
            {
                id: itemBId,
                seller_order_id: sellerOrderId,
                product_id: productIds[productIndexB],
                product_name: productB.name,
                price: money(productB.price),
                quantity: quantityB,
                subtotal: money(productB.price * quantityB),
            },
        );
    }

    await prisma.order.createMany({
        data: orderRows,
    });

    await prisma.sellerOrder.createMany({
        data: sellerOrderRows,
    });

    await prisma.orderItem.createMany({
        data: orderItemRows,
    });

    // =========================================================
    // 23. PAYMENTS
    // =========================================================

    await prisma.payment.createMany({
        data: orderRows.map((order, index) => ({
            id: uuid(),
            order_id: order.id,
            payment_method_id:
                paymentMethodIds[index % paymentMethodIds.length],
            payment_status: "PAID",
            transaction_id: `TRX2608${String(index + 1).padStart(10, "0")}`,
            paid_at: new Date(
                Date.now() - (50 - Math.min(index, 40)) * 86400000,
            ),
        })),
    });

    // =========================================================
    // 24. SHIPMENTS
    // =========================================================

    const shipmentIds = sellerOrderRows.map(() => uuid());

    await prisma.shipment.createMany({
        data: sellerOrderRows.map((sellerOrder, index) => ({
            id: shipmentIds[index],
            seller_order_id: sellerOrder.id,
            courier_id: courierIds[index % courierIds.length],
            service: index % 2 === 0 ? "REG" : "YES",

            tracking_number:
                `JT2608${String(index + 1).padStart(10, "0")}`,

            status: "DELIVERED",

            shipped_at: new Date(
                Date.now() - (35 - Math.min(index, 25)) * 86400000,
            ),

            delivered_at: new Date(
                Date.now() - (25 - Math.min(index, 20)) * 86400000,
            ),
        })),
    });

    // =========================================================
    // 25. SHIPMENT PROOFS
    // =========================================================

    await prisma.shipmentProof.createMany({
        data: shipmentIds.flatMap((shipmentId, index) => [
            {
                id: uuid(),
                shipment_id: shipmentId,
                photo_url:
                    `https://placehold.co/1200x800/png?text=Shipment+${index + 1}+Proof+1`,
                description:
                    "Bukti foto paket sebelum diserahkan kepada kurir.",
            },
            {
                id: uuid(),
                shipment_id: shipmentId,
                photo_url:
                    `https://placehold.co/1200x800/png?text=Shipment+${index + 1}+Proof+2`,
                description:
                    "Bukti paket setelah proses pengiriman.",
            },
        ]),
    });

    // =========================================================
    // 26. REVIEWS
    // =========================================================
    //
    // 100 OrderItem = 100 Review
    // Setiap Product = tepat 10 Review.
    //
    // Rating menggunakan DECIMAL(2,1):
    // 4.0 - 4.9
    // =========================================================

    const reviewComments = [
        "Barang sesuai deskripsi dan kualitasnya bagus.",
        "Pengiriman cepat dan packing rapi.",
        "Produk sesuai foto dan deskripsi.",
        "Kualitas bagus untuk harga segini.",
        "Barang datang dengan aman.",
        "Seller responsif dan produknya sesuai.",
        "Produk sudah dicoba dan berfungsi dengan baik.",
        "Kemasan rapi dan tidak ada kerusakan.",
        "Cocok dengan kebutuhan saya.",
        "Pengalaman belanja sangat memuaskan.",
    ];

    await prisma.review.createMany({
        data: orderItemRows.map((item, index) => ({
            id: uuid(),

            // User yang melakukan order
            user_id: orderRows[Math.floor(index / 2)].user_id,

            // Satu OrderItem hanya boleh punya satu review
            order_item_id: item.id,

            // DECIMAL(2,1)
            rating: money(4 + ((index % 10) * 0.1)),

            comment: reviewComments[index % reviewComments.length],
        })),
    });

    // =========================================================
    // 27. SUMMARY
    // =========================================================

    console.log("");
    console.log("==========================================");
    console.log("SEED BERHASIL");
    console.log("==========================================");
    console.log("10 Users");
    console.log("10 Profiles");
    console.log("10 Addresses");
    console.log("10 Members");
    console.log("4 Sellers");
    console.log("3 Seller Businesses");
    console.log("10 Seller Documents");
    console.log("8 Stores");
    console.log("8 Categories");
    console.log("10 Products");
    console.log("20 Product Images");
    console.log("Product Options + Values");
    console.log("Product Variants + Variant Values");
    console.log("10 Carts");
    console.log("20 Cart Items");
    console.log("50 Orders");
    console.log("50 Seller Orders");
    console.log("100 Order Items");
    console.log("50 Payments");
    console.log("50 Shipments");
    console.log("100 Shipment Proofs");
    console.log("100 Reviews");
    console.log("10 Reviews per Product");
    console.log("==========================================");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (error) => {
        console.error("SEED ERROR:");
        console.error(error);

        await prisma.$disconnect();
        process.exit(1);
    });
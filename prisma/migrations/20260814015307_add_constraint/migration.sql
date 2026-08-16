-- AlterTable
ALTER TABLE `roles`
    ADD CONSTRAINT `check_roles_level`
        CHECK (`level` BETWEEN 1 AND 10);

-- AlterTable
ALTER TABLE `products`
    ADD CONSTRAINT `check_price_product`
        CHECK (`price` >= 1);

-- AlterTable
ALTER TABLE `cart_items`
    ADD CONSTRAINT `check_cart_items_quantity`
        CHECK (`quantity` >= 1);

-- AlterTable
ALTER TABLE `orders`
    ADD CONSTRAINT `check_order_prices`
        CHECK (
            `subtotal` >= 1
            AND `shipping_cost` >= 0
            AND `total_amount` >= 1
            AND `total_amount` = `subtotal` + `shipping_cost`
        );

-- AlterTable
ALTER TABLE `seller_orders`
    ADD CONSTRAINT `check_seller_order_prices`
        CHECK (
            `subtotal` >= 1
            AND `shipping_cost` >= 0
            AND `total_amount` >= 1
            AND `total_amount` = `subtotal` + `shipping_cost`
);

-- AlterTable
ALTER TABLE `order_items`
    ADD CONSTRAINT `check_order_items_quantity`
        CHECK (`quantity` >= 1);

-- AlterTable
ALTER TABLE `order_items`
    ADD CONSTRAINT `check_item_prices_positive`
        CHECK (
            `price` >= 1
            AND `subtotal` >= 1
        );

-- AlterTable
ALTER TABLE `reviews`
    ADD CONSTRAINT `check_reviews_rating`
        CHECK (`rating` BETWEEN 1.0 AND 5.0);

-- AlterTable
ALTER TABLE profiles
    ADD CONSTRAINT check_profiles_nik
        CHECK (nik REGEXP '^[0-9]{16}$');



SET FOREIGN_KEY_CHECKS = 0;

-- Truy vấn động để lấy tất cả các bảng
SET @tables = NULL;
SELECT GROUP_CONCAT('`', table_name, '`') INTO @tables
FROM information_schema.tables
WHERE table_schema = (SELECT DATABASE());

-- Thực hiện drop các bảng
SET @tables = IFNULL(@tables, 'dummy');
SET @drop_command = CONCAT('DROP TABLE IF EXISTS ', @tables);
PREPARE stmt FROM @drop_command;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET FOREIGN_KEY_CHECKS = 1;


-- Bảng kích thước
CREATE TABLE size (
    id INT NOT NULL AUTO_INCREMENT,
    value ENUM('Large','Medium','Small'),
    PRIMARY KEY (id)
);



-- Bảng loại sản phẩm
CREATE TABLE productCategory (
    id INT NOT NULL AUTO_INCREMENT,
    value ENUM("Pizza","Hamburger","Drink"),
    PRIMARY KEY (id)
);

-- Bảng sản phẩm
CREATE TABLE product (
    id INT NOT NULL AUTO_INCREMENT,
    productCategoryId INT,
    name VARCHAR(100),
    PRIMARY KEY (id),
    FOREIGN KEY (productCategoryId) REFERENCES productCategory(id)  on delete cascade -- Khóa ngoại tham chiếu đến productCategory
);

-- Bảng nhập sản phẩm (chi tiết về biến thể)
CREATE TABLE productEntry (
	id INT NOT NULL AUTO_INCREMENT,
    productId INT,
    sizeId INT,
    description NVARCHAR(255),
    unitPrice DECIMAL(10, 2),
    primary Key (id),
    FOREIGN KEY (productId) REFERENCES product(id) on delete cascade ,   -- Khóa ngoại tham chiếu đến product
    FOREIGN KEY (sizeId) REFERENCES size(id) on delete cascade      -- Khóa ngoại tham chiếu đến size
);


-- Insert data into size table
INSERT INTO size (value) VALUES
('Large'),
('Medium'),
('Small');

-- Insert data into productCategory table
INSERT INTO productCategory (value) VALUES
('Pizza'),
('Hamburger'),
('Drink');

-- Thêm dữ liệu vào bảng product
INSERT INTO product (productCategoryId, name) VALUES
-- Pizza (assuming productCategoryId 1 is for Pizza)
(1, 'Hawaiian Pizza'),
(1, 'Vegetarian Pizza'),
(1, 'Meat Lovers Pizza'),
(1, 'BBQ Chicken Pizza'),
(1, 'Mushroom Pizza'),
(1, 'Four Cheese Pizza'),
(1, 'Seafood Pizza'),
-- Hamburger (assuming productCategoryId 2 is for Hamburger)
(2, 'Bacon Cheeseburger'),
(2, 'Mushroom Swiss Burger'),
(2, 'Spicy Chicken Burger'),
(2, 'Veggie Burger'),
(2, 'Double Cheeseburger'),
(2, 'Fish Burger'),
(2, 'BBQ Burger'),
-- Drink (assuming productCategoryId 3 is for Drink)
(3, 'Lemonade'),
(3, 'Iced Tea'),
(3, 'Milkshake'),
(3, 'Smoothie'),
(3, 'Fresh Orange Juice'),
(3, 'Iced Coffee'),
(3, 'Hot Chocolate');

-- Thêm dữ liệu vào bảng productEntry
INSERT INTO productEntry (productId, sizeId, description, unitPrice) VALUES
-- Pizza
(1, 1, 'Large Hawaiian Pizza with ham and pineapple', 18.99),
(1, 2, 'Medium Hawaiian Pizza with ham and pineapple', 15.99),
(1, 3, 'Small Hawaiian Pizza with ham and pineapple', 12.99),
(2, 1, 'Large Vegetarian Pizza with assorted vegetables', 17.99),
(2, 2, 'Medium Vegetarian Pizza with assorted vegetables', 14.99),
(2, 3, 'Small Vegetarian Pizza with assorted vegetables', 11.99),
(3, 1, 'Large Meat Lovers Pizza with various meats', 19.99),
(3, 2, 'Medium Meat Lovers Pizza with various meats', 16.99),
(3, 3, 'Small Meat Lovers Pizza with various meats', 13.99),
(4, 1, 'Large BBQ Chicken Pizza', 18.99),
(4, 2, 'Medium BBQ Chicken Pizza', 15.99),
(4, 3, 'Small BBQ Chicken Pizza', 12.99),
(5, 1, 'Large Mushroom Pizza', 17.99),
(5, 2, 'Medium Mushroom Pizza', 14.99),
(5, 3, 'Small Mushroom Pizza', 11.99),
(6, 1, 'Large Four Cheese Pizza', 18.99),
(6, 2, 'Medium Four Cheese Pizza', 15.99),
(6, 3, 'Small Four Cheese Pizza', 12.99),
(7, 1, 'Large Seafood Pizza', 20.99),
(7, 2, 'Medium Seafood Pizza', 17.99),
(7, 3, 'Small Seafood Pizza', 14.99),
-- Hamburger
(8, 2, 'Bacon Cheeseburger with crispy bacon', 10.99),
(9, 2, 'Mushroom Swiss Burger with sautéed mushrooms', 10.99),
(10, 2, 'Spicy Chicken Burger with jalapeños', 9.99),
(11, 2, 'Veggie Burger with plant-based patty', 9.99),
(12, 2, 'Double Cheeseburger with two beef patties', 12.99),
(13, 2, 'Fish Burger with crispy fish fillet', 9.99),
(14, 2, 'BBQ Burger with onion rings', 11.99),
-- Drink
(15, 1, 'Large Lemonade', 3.99),
(15, 2, 'Medium Lemonade', 2.99),
(15, 3, 'Small Lemonade', 1.99),
(16, 1, 'Large Iced Tea', 3.99),
(16, 2, 'Medium Iced Tea', 2.99),
(16, 3, 'Small Iced Tea', 1.99),
(17, 1, 'Large Milkshake', 5.99),
(17, 2, 'Medium Milkshake', 4.99),
(17, 3, 'Small Milkshake', 3.99),
(18, 1, 'Large Smoothie', 5.99),
(18, 2, 'Medium Smoothie', 4.99),
(18, 3, 'Small Smoothie', 3.99),
(19, 1, 'Large Fresh Orange Juice', 4.99),
(19, 2, 'Medium Fresh Orange Juice', 3.99),
(19, 3, 'Small Fresh Orange Juice', 2.99),
(20, 1, 'Large Iced Coffee', 4.99),
(20, 2, 'Medium Iced Coffee', 3.99),
(20, 3, 'Small Iced Coffee', 2.99),
(21, 1, 'Large Hot Chocolate', 4.99),
(21, 2, 'Medium Hot Chocolate', 3.99),
(21, 3, 'Small Hot Chocolate', 2.99);




SELECT 
    p.name AS 'Product Name',
    s.value AS 'Size',
    pe.description AS 'Description',
    pe.unitPrice AS 'Price'
FROM product p
JOIN productEntry pe ON p.id = pe.productId
JOIN size s ON pe.sizeId = s.id
JOIN productCategory pc ON p.productCategoryId = pc.id
WHERE pc.value = 'Pizza'
ORDER BY p.name, s.id;

SELECT 
    p.name AS 'Product Name',
    s.value AS 'Size',
    pe.description AS 'Description',
    pe.unitPrice AS 'Price'
FROM product p
JOIN productEntry pe ON p.id = pe.productId
JOIN size s ON pe.sizeId = s.id
JOIN productCategory pc ON p.productCategoryId = pc.id
WHERE pc.value = 'Hamburger'
ORDER BY p.name, s.id;

SELECT 
    p.name AS 'Product Name',
    s.value AS 'Size',
    pe.description AS 'Description',
    pe.unitPrice AS 'Price'
FROM product p
JOIN productEntry pe ON p.id = pe.productId
JOIN size s ON pe.sizeId = s.id
JOIN productCategory pc ON p.productCategoryId = pc.id
WHERE pc.value = 'Drink'
ORDER BY p.name, s.id;

SELECT 
    p.name AS 'Product Name',
    pc.value AS 'Category',
    s.value AS 'Size',
    pe.description AS 'Description',
    pe.unitPrice AS 'Price'
FROM product p
JOIN productEntry pe ON p.id = pe.productId
JOIN size s ON pe.sizeId = s.id
JOIN productCategory pc ON p.productCategoryId = pc.id
ORDER BY pc.value, p.name, s.id;


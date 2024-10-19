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
-- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  

-- Bảng Users (Người dùng)
CREATE TABLE Users (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(50) UNIQUE,
    Email VARCHAR(100) UNIQUE,
    PasswordHash VARCHAR(255),
    FullName VARCHAR(100),
    PhoneNumber VARCHAR(20),
    Address TEXT,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    IsAdmin BOOLEAN DEFAULT FALSE
);

-- Bảng Categories (Danh mục món ăn)
CREATE TABLE Categories (
    CategoryID INT PRIMARY KEY AUTO_INCREMENT,
    CategoryName VARCHAR(50) UNIQUE
);

-- Chèn các danh mục cố định
INSERT INTO Categories (CategoryName) VALUES 
('Pizza'), ('Hamburger'), ('Drink');

-- Bảng Products (Món ăn)
CREATE TABLE Products (
    ProductID INT PRIMARY KEY AUTO_INCREMENT,
    ProductName VARCHAR(100),
    Description TEXT,
    CategoryID INT,
    ImageURL VARCHAR(255),
    IsActive BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
);

-- Bảng ProductSizes (Kích cỡ và giá của món ăn)
CREATE TABLE ProductSizes (
    ProductSizeID INT PRIMARY KEY AUTO_INCREMENT,
    ProductID INT,
    Size ENUM('Small', 'Medium', 'Large'),
    Price DECIMAL(10, 2),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

-- Bảng Orders (Đơn hàng)
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    OrderDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    TotalAmount DECIMAL(10, 2),
    Status ENUM('Pending', 'Processing', 'Completed', 'Cancelled') DEFAULT 'Pending',
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Bảng OrderItems (Chi tiết đơn hàng)
CREATE TABLE OrderItems (
    OrderItemID INT PRIMARY KEY AUTO_INCREMENT,
    OrderID INT,
    ProductID INT,
    ProductSizeID INT,
    Quantity INT,
    Subtotal DECIMAL(10, 2),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID),
    FOREIGN KEY (ProductSizeID) REFERENCES ProductSizes(ProductSizeID)
);
-- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  

INSERT INTO Users (Username, Email, PasswordHash, FullName, PhoneNumber, Address, IsAdmin) VALUES
('user1', 'user1@example.com', 'hashpassword1', 'John Doe', '1234567890', '123 Elm Street', FALSE),
('user2', 'user2@example.com', 'hashpassword2', 'Jane Smith', '0987654321', '456 Oak Avenue', FALSE),
('user3', 'user3@example.com', 'hashpassword3', 'Mike Johnson', '1122334455', '789 Pine Road', FALSE);

-- Pizza products
INSERT INTO Products (ProductName, Description, CategoryID, ImageURL) VALUES
('Margherita', 'Classic Margherita pizza', 1, 'url_to_image'),
('Pepperoni', 'Pepperoni pizza with cheese', 1, 'url_to_image'),
('BBQ Chicken', 'BBQ chicken pizza', 1, 'url_to_image'),
('Hawaiian', 'Hawaiian pizza with pineapple', 1, 'url_to_image'),
('Veggie', 'Vegetarian pizza', 1, 'url_to_image');

-- Sizes and Prices for Pizza
INSERT INTO ProductSizes (ProductID, Size, Price) VALUES
(1, 'Small', 8.99), (1, 'Medium', 12.99), (1, 'Large', 15.99),
(2, 'Small', 9.99), (2, 'Medium', 13.99), (2, 'Large', 16.99),
(3, 'Small', 10.99), (3, 'Medium', 14.99), (3, 'Large', 17.99),
(4, 'Small', 9.49), (4, 'Medium', 13.49), (4, 'Large', 16.49),
(5, 'Small', 8.49), (5, 'Medium', 11.49), (5, 'Large', 14.49);

-- Hamburger products
INSERT INTO Products (ProductName, Description, CategoryID, ImageURL) VALUES
('Cheeseburger', 'Cheeseburger with lettuce and tomato', 2, 'url_to_image'),
('Bacon Burger', 'Bacon burger with cheese', 2, 'url_to_image'),
('Double Patty', 'Double patty burger with cheese', 2, 'url_to_image'),
('Chicken Burger', 'Crispy chicken burger', 2, 'url_to_image'),
('Veggie Burger', 'Vegetarian burger', 2, 'url_to_image');

-- Sizes and Prices for Hamburgers
INSERT INTO ProductSizes (ProductID, Size, Price) VALUES
(6, 'Small', 6.99), (6, 'Medium', 8.99), (6, 'Large', 10.99),
(7, 'Small', 7.99), (7, 'Medium', 9.99), (7, 'Large', 11.99),
(8, 'Small', 8.99), (8, 'Medium', 10.99), (8, 'Large', 12.99),
(9, 'Small', 6.49), (9, 'Medium', 8.49), (9, 'Large', 10.49),
(10, 'Small', 5.99), (10, 'Medium', 7.99), (10, 'Large', 9.99);

-- Drink products
INSERT INTO Products (ProductName, Description, CategoryID, ImageURL) VALUES
('Coke', 'Coca-Cola', 3, 'url_to_image'),
('Pepsi', 'Pepsi', 3, 'url_to_image'),
('Sprite', 'Lemon-lime soda', 3, 'url_to_image'),
('Orange Juice', 'Fresh orange juice', 3, 'url_to_image'),
('Water', 'Bottled water', 3, 'url_to_image');

-- Sizes and Prices for Drinks
INSERT INTO ProductSizes (ProductID, Size, Price) VALUES
(11, 'Small', 1.99), (11, 'Medium', 2.49), (11, 'Large', 2.99),
(12, 'Small', 1.99), (12, 'Medium', 2.49), (12, 'Large', 2.99),
(13, 'Small', 1.99), (13, 'Medium', 2.49), (13, 'Large', 2.99),
(14, 'Small', 2.49), (14, 'Medium', 3.49), (14, 'Large', 4.49),
(15, 'Small', 0.99), (15, 'Medium', 1.49), (15, 'Large', 1.99);

-- Order 1 for User 1
INSERT INTO Orders (UserID, TotalAmount, Status) VALUES
(1, 45.47, 'Completed');
INSERT INTO OrderItems (OrderID, ProductID, ProductSizeID, Quantity, Subtotal) VALUES
(LAST_INSERT_ID(), 1, 2, 2, 25.98),
(LAST_INSERT_ID(), 11, 13, 2, 5.98),
(LAST_INSERT_ID(), 7, 7, 1, 13.51);

-- Order 2 for User 1
INSERT INTO Orders (UserID, TotalAmount, Status) VALUES
(1, 30.97, 'Completed');
INSERT INTO OrderItems (OrderID, ProductID, ProductSizeID, Quantity, Subtotal) VALUES
(LAST_INSERT_ID(), 3, 4, 1, 17.99),
(LAST_INSERT_ID(), 12, 14, 2, 5.98),
(LAST_INSERT_ID(), 9, 10, 1, 6.49);

-- Order 1 for User 2
INSERT INTO Orders (UserID, TotalAmount, Status) VALUES
(2, 40.47, 'Completed');
INSERT INTO OrderItems (OrderID, ProductID, ProductSizeID, Quantity, Subtotal) VALUES
(LAST_INSERT_ID(), 2, 2, 1, 13.99),
(LAST_INSERT_ID(), 8, 9, 1, 12.99),
(LAST_INSERT_ID(), 12, 13, 2, 5.98),
(LAST_INSERT_ID(), 15, 16, 2, 6.51);

-- Order 2 for User 2
INSERT INTO Orders (UserID, TotalAmount, Status) VALUES
(2, 28.47, 'Completed');
INSERT INTO OrderItems (OrderID, ProductID, ProductSizeID, Quantity, Subtotal) VALUES
(LAST_INSERT_ID(), 5, 6, 1, 14.49),
(LAST_INSERT_ID(), 6, 7, 1, 10.99),
(LAST_INSERT_ID(), 14, 15, 1, 2.99);

-- Order 1 for User 3
INSERT INTO Orders (UserID, TotalAmount, Status) VALUES
(3, 37.47, 'Completed');
INSERT INTO OrderItems (OrderID, ProductID, ProductSizeID, Quantity, Subtotal) VALUES
(LAST_INSERT_ID(), 4, 5, 1, 16.49),
(LAST_INSERT_ID(), 13, 14, 2, 5.98),
(LAST_INSERT_ID(), 10, 11, 1, 14.49);

-- Order 2 for User 3
INSERT INTO Orders (UserID, TotalAmount, Status) VALUES
(3, 22.49, 'Completed');
INSERT INTO OrderItems (OrderID, ProductID, ProductSizeID, Quantity, Subtotal) VALUES
(LAST_INSERT_ID(), 1, 1, 1, 8.99),
(LAST_INSERT_ID(), 7, 8, 1, 9.99),
(LAST_INSERT_ID(), 15, 16, 1, 3.51);

-- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  -- --  

-- Xem menu với giá theo kích cỡ
SELECT p.ProductName, c.CategoryName, ps.Size, ps.Price
FROM Products p
JOIN Categories c ON p.CategoryID = c.CategoryID
JOIN ProductSizes ps ON p.ProductID = ps.ProductID
WHERE p.IsActive = TRUE
ORDER BY c.CategoryName, p.ProductName, ps.Size;

-- Xem lịch sử đơn hàng của một người dùng
SELECT o.OrderID, o.OrderDate, o.TotalAmount, o.Status,
       p.ProductName, ps.Size, oi.Quantity, oi.Subtotal
FROM Orders o
JOIN OrderItems oi ON o.OrderID = oi.OrderID
JOIN Products p ON oi.ProductID = p.ProductID
JOIN ProductSizes ps ON oi.ProductSizeID = ps.ProductSizeID
WHERE o.UserID = 2
ORDER BY o.OrderDate DESC;

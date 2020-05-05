USE [ORDERS]
GO

CREATE TABLE OrderInfo (
	[id] [int] IDENTITY(1,1) NOT NULL,
	[customerId] [int] NOT NULL,
	[createdAt] [nvarchar](50) NOT NULL,
	[shippedAt] [nvarchar](50) NULL,	
	[status] [nvarchar](50) NOT NULL,
	[ZIP] [varchar](50) NOT NULL,
	[region] [nvarchar](50) NOT NULL,
	[country] [nvarchar](50) NOT NULL
 CONSTRAINT [PK_OrderInfoTest] PRIMARY KEY CLUSTERED ([id] ASC)
) ON [PRIMARY]
GO

CREATE TABLE ProductInfo (
	[id] [int] IDENTITY(1,1) NOT NULL,
	[productName] [nvarchar](50) NOT NULL,
	[price] [varchar](50) NOT NULL
 CONSTRAINT [PK_ProductInfoIdTest] PRIMARY KEY CLUSTERED ([id] ASC)
) ON [PRIMARY]
GO

CREATE TABLE CustomerInfo (
	[id] [int] IDENTITY(1,1) NOT NULL,
	[firstName] [nvarchar](50) NOT NULL,
	[lastName] [nvarchar](50) NOT NULL,
	[address] [nvarchar](50) NOT NULL,
	[phone] [nvarchar](50) NOT NULL,
	[email] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_CustomerInfoTest] PRIMARY KEY CLUSTERED ([id] ASC)
) ON [PRIMARY]
GO

CREATE TABLE OrdersProducts (
	[orderId] [int] NOT NULL,
	[productId] [int] NOT NULL,
	[quantity] [varchar](50) NOT NULL
) ON [PRIMARY]
GO

ALTER TABLE OrdersProducts
WITH CHECK ADD CONSTRAINT FK_ProductInfo_OrdersProducts FOREIGN KEY(productId)
REFERENCES ProductInfo (id)
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE OrdersProducts
WITH CHECK ADD CONSTRAINT FK_ProductInfo_OrderInfo FOREIGN KEY(orderId)
REFERENCES OrderInfo (id)
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE OrderInfo
WITH CHECK ADD CONSTRAINT FK_OrderInfo_CustomerInfo FOREIGN KEY(customerId)
REFERENCES CustomerInfo (id)
ON UPDATE CASCADE
ON DELETE CASCADE
GO

INSERT INTO CustomerInfo (firstName, lastName, address, phone, email) VALUES
('Maria', 'Anders', 'Obere Str. 57', '030-0074321', 'Maria.Anders@company.com'),
('Laurence', 'Lebihan', '12, rue des Bouchers"', '91.24.45.40', 'Laurence.Lebihan@company.com'),
('Pavel', 'Brown', 'Nemiga Str.23', '33-4863792', 'PavelBrown@company.com'),
('Alexander', 'Green', 'Yanka Kupala Str.8', '29-7561328', 'AlexanderGreen@company.com'),
('Eugene', 'Baker', 'Independence Avenue Str.15', '33-1286459', 'EugeneBaker@company.com')
GO

INSERT INTO OrderInfo (customerId, createdAt, status, 
shippedAt, ZIP, region, country) VALUES
(1, '10.08.1991', 'Accepted', '8.09.1991', '12209', 'Germany', 'Germany'),
(1, '23.12.2006', 'Pending', '13.02.2007', '15008', 'France', 'France'),
(1, '15.04.1998', 'Accepted', '8.09.1991', '12709', 'Poland', 'Poland'),
(2, '23.12.2008', 'Pending', '13.02.2007', '13098', 'Belarus', 'Belarus'),
(2, '11.03.2000', 'Accepted', '8.09.1991', '12200', 'Germany', 'Germany'),
(2, '23.12.2009', 'Accepted', '13.02.2007', '23008', 'France', 'France'),
(3, '10.08.1995', 'Accepted', '8.09.1991', '14209', 'Poland', 'Poland'),
(3, '19.10.2012', 'Pending', '13.02.2007', '13508', 'Belarus', 'Belarus'),
(3, '10.08.1999', 'Accepted', '8.09.1991', '12289', 'Germany', 'Germany'),
(4, '23.12.2010', 'Accepted', '13.02.2007', '13003', 'France', 'France'),
(4, '10.04.1991', 'Accepted', '8.09.1991', '21209', 'Germany', 'Germany'),
(4, '23.06.2006', 'Pending', '13.02.2007', '20008', 'USA', 'USA'),
(5, '13.08.1991', 'Accepted', '8.09.1991', '22200', 'Poland', 'Poland'),
(5, '30.12.2006', 'Pending', '13.02.2007', '23098', 'France', 'France'),
(5, '05.08.1997', 'Accepted', '8.09.1991', '22709', 'USA', 'USA'),
(5, '13.12.2002', 'Accepted', '13.02.2007', '25008', 'France', 'France')
GO

INSERT INTO ProductInfo (productName, price) VALUES
('Aniseed Syrup', 10),
('Alice Mutton', 32),
('Boysenberry Spread', 25),
('Bread', 15),
('Button', 40),
('Chai', 18),
('Chef Antons Cajun Seasoning', 22),
('Chef Antons Gumbo Mix', 36),
('Genen Shouyu', 40),
('Marmalade', 10),
('Pavlova', 120),
('Tofu', 25),
('Queso Cabrales', 21),
('Queso Manchego La Pastora', 38)
GO

INSERT INTO OrdersProducts (orderId, productId, quantity) VALUES
(1, 1, 10), (1, 2, 5), (1, 3, 7), (1, 4, 3),
(2, 3, 6), (2, 4, 8), (2, 5, 15), (2, 6, 9),
(3, 3, 6), (3, 4, 8), (3, 5, 15), (3, 6, 9),
(4, 5, 10), (4, 4, 5), (4, 1, 7), (4, 7, 3),
(5, 3, 6), (5, 4, 8), (5, 5, 15), (5, 6, 9),
(6, 1, 10), (6, 2, 5), (6, 3, 7), (6, 4, 3),
(7, 3, 6), (7, 4, 8), (7, 5, 15), (7, 6, 9),
(8, 1, 10), (8, 2, 5), (8, 3, 7), (8, 4, 3),
(9, 3, 6), (9, 4, 8), (9, 5, 15), (9, 6, 9),
(10, 8, 9), (10, 2, 5), (10, 3, 7), (10, 4, 3),
(11, 9, 7), (11, 4, 8), (11, 5, 15), (11, 6, 9),
(12, 10, 4), (12, 2, 5), (12, 3, 7), (12, 4, 3),
(13, 11, 6), (13, 4, 8), (13, 5, 15), (13, 6, 9),
(14, 12, 7), (14, 2, 5), (14, 3, 7), (14, 4, 3),
(15, 13, 5), (15, 4, 8), (15, 5, 15), (15, 6, 9),
(16, 14, 8), (16, 2, 5), (16, 3, 7), (16, 4, 3)
GO




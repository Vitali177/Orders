USE [ORDERS]
GO

CREATE TABLE [dbo].[OrderInfo](
	[orderId] [int] IDENTITY(1,1) NOT NULL,
	[createdAt] [nvarchar](50) NOT NULL,
	[customer] [nvarchar](50) NOT NULL,
	[orderStatus] [nvarchar](50) NOT NULL,
	[shippedAt] [nvarchar](50) NOT NULL,
	[totalPrice] [nvarchar](50) NOT NULL,
	[currency] [nvarchar](50) NOT NULL,
	[nameShipTo] [nvarchar](50) NOT NULL,
	[addressShipTo] [nvarchar](50) NOT NULL,
	[ZIP] [varchar](50) NOT NULL,
	[region] [nvarchar](50) NOT NULL,
	[country] [nvarchar](50) NOT NULL,
	[firstNameCustomer] [nvarchar](50) NOT NULL,
	[lastNameCustomer] [nvarchar](50) NOT NULL,
	[addressCustomer] [nvarchar](50) NOT NULL,
	[phoneCustomer] [nvarchar](50) NOT NULL,
	[emailCustomer] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_OrderInfoTest] PRIMARY KEY CLUSTERED 
(
	[orderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[ProductInfo](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[orderId] [int] NOT NULL,
	[productName] [nvarchar](50) NOT NULL,
	[price] [varchar](50) NOT NULL,
	[currency] [nvarchar](50) NOT NULL,
	[quantity] [varchar](50) NOT NULL,
	[totalPrice] [varchar](50) NOT NULL
) ON [PRIMARY]
GO

ALTER TABLE ProductInfo
WITH CHECK ADD CONSTRAINT FK_ProductInfo_OrderInfo FOREIGN KEY(orderId)
REFERENCES OrderInfo (orderId)
ON UPDATE CASCADE
ON DELETE CASCADE
GO

INSERT INTO OrderInfo (createdAt, customer, orderStatus, shippedAt, totalPrice, currency, nameShipTo, addressShipTo, ZIP, region, 
country, firstNameCustomer, lastNameCustomer, addressCustomer, phoneCustomer, emailCustomer) VALUES
('10.08.1991', 'Alfreds Futterkiste', 'Accepted', '8.09.1991', '990', 'EUR', 'Maria Anders', 'Obere Str. 57', 
'12209', 'Germany', 'Germany', 'Maria', 'Anders', 'Obere Str. 57', '030-0074321', 'Maria.Anders@company.com'),

('23.12.2006', 'Bon app', 'Pending', '13.02.2007', '585', 'EUR', 'Laurence Lebihan', '12, rue des Bouchers', 
'13008', 'France', 'France', 'Laurence', 'Lebihan', '12, rue des Bouchers"', '91.24.45.40', 'Laurence.Lebihan@company.com')
GO

INSERT INTO ProductInfo (orderId, productName, price, currency, quantity, totalPrice) VALUES
(1, 'Chai', 18, 'EUR', 2, 36),
(1, 'Aniseed Syrup', 10, 'EUR', 3, 30),
(1, 'Chef Antons Cajun Seasoning', 22, 'EUR', 2, 44),
(1, 'Chef Antons Gumbo Mix', 36, 'EUR', 21, 756),

(2, 'Queso Cabrales', 21, 'EUR', 5, 105),
(2, 'Queso Manchego La Pastora', 38, 'EUR', 3, 114),
(2, 'Pavlova', 120, 'EUR', 5, 600),
(2, 'Genen Shouyu', 40, 'EUR', 7, 280)
GO

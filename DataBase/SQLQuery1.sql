
--Create Database Marketplace
use Marketplace


Create table Categories(
 Id int IDENTITY(1,1) PRIMARY KEY,
 [Name] varchar(255) NOT NULL,
)

Create table Products(
 Id int IDENTITY(1,1) PRIMARY KEY,
 Name varchar(255) NOT NULL,
 Code varchar(255) NOT NULL UNIQUE,
 Quantity int NOT NULL,
 Description varchar(max) NOT NULL,
 QuantityForSale int NOT NULL,
 CategoryId int NOT NULL,
 [Location]  varchar(max) NOT NULL,
 Price DECIMAL (10,2) NOT NULL,
 FOREIGN KEY (CategoryId) REFERENCES Categories(Id),

)
Create table Images (
 Id int IDENTITY(1,1) PRIMARY KEY,
 ProductId int NOT NULL,
 img varchar(max) NOT NULL,
 FOREIGN KEY (ProductId) REFERENCES Products(Id),
)

Create table Orders (
 Id int IDENTITY(1,1) PRIMARY KEY,
 Quantity int NOT NULL,
 [Status] varchar(255) NOT NULL,
 OrderDate DATETIME NOT NULL,
 ProductId int NOT NULL,
 UserId int NOT NULL,
 FOREIGN KEY (ProductId) REFERENCES Products(Id)
)






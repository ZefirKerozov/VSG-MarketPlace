
--Create Database Marketplace
use Marketplace
Create table Images (
 Id int IDENTITY(1,1) PRIMARY KEY,
 img varchar(max) NOT NULL,
)

Create table Categories(
 Id int IDENTITY(1,1) PRIMARY KEY,
 [Name] varchar(255) NOT NULL,
)
CREATE TABLE [Location](
 Id int IDENTITY(1,1) PRIMARY KEY,
City varchar(255)NOT NULL,
)
Create table Products(
 Id int IDENTITY(1,1) PRIMARY KEY,
 Name varchar(255) NOT NULL,
 Code varchar(255) NOT NULL UNIQUE,
 Quantity int NOT NULL,
 Description varchar(max) NOT NULL,
 QuantityForSale int NOT NULL,
 ImageId int NOT NULL,
 CategoryId int NOT NULL,
 LocationId int NOT NULL,
 Price DECIMAL (10,2) NOT NULL,
 FOREIGN KEY (ImageId) REFERENCES Images(Id),
 FOREIGN KEY (CategoryId) REFERENCES Categories(Id),
 FOREIGN KEY (LocationId) REFERENCES [Location](Id),

)


Create table Orders (
 Id int IDENTITY(1,1) PRIMARY KEY,
 Quantity int NOT NULL,
 Status varchar(255) NOT NULL,
 OrderDate DATETIME NOT NULL,
 ProductId int NOT NULL,
 UserId int NOT NULL,
 FOREIGN KEY (ProductId) REFERENCES Products(Id)
)






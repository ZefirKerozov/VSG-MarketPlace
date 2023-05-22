using System.Net;
using AutoMapper;
using Markerplace.Domain.Entities;
using Markerplace.Domain.Enums;
using Marketplace.Application.Helpers.Profiles;
using Marketplace.Application.Models.ExceptionModel;
using Marketplace.Application.Models.OrderModels.Dtos;
using Marketplace.Application.Models.OrderModels.Interfaces;
using Marketplace.Application.Models.ProductModels.Interface;
using Marketplace.Application.Services;
using Microsoft.AspNetCore.Http;
using Moq;

namespace OrderServiceTests;

public class Tests
{
    private Mock<IOrdersRepository> _orderRepository;
    private Mock<IProductRepository> _productRepository;
    private IMapper _mapper;
    private IOrderService _ordersService;

    [SetUp]
    public void Setup()
    {
        _orderRepository = new Mock<IOrdersRepository>();
        _productRepository = new Mock<IProductRepository>();
        _mapper = new Mapper(new MapperConfiguration(cfg =>
        {
            cfg.AddProfile<OrderProfile>();
        }));
        _ordersService = new OrdersService(_orderRepository.Object, _productRepository.Object, _mapper);
    }

    [Test]
    public async  Task ChangeStatus_When_Order_Is_Pending()
    {
        int orderId = 1;
        var order = new Order { Id = orderId, Status = OrderStatus.Pending };
        _orderRepository.Setup(repo => repo.GetById(orderId)).ReturnsAsync(order);

        // Act
        await _ordersService.ChangeStatus(orderId);

        // Assert
        Assert.That(order.Status, Is.EqualTo(OrderStatus.Finished));
    }

    [Test]
    public async Task CreateOrderWithValidQuantity()
    {
        // Arrange
        var productId = 1;
        var productName = "Test Product";
        var productPrice = 10.0M;
        var productQuantityForSale = 5;
        var productQuantity = 10;

        var dto = new CreateOrderDto
        {
            ProductId = productId,
            Quantity = 2,
        };

        var product = new Product
        {
            Id = productId,
            Name = productName,
            Price = productPrice,
            QuantityForSale = productQuantityForSale,
            Quantity = productQuantity
        };

        _productRepository.Setup(x => x.GetById(productId)).ReturnsAsync(product);
        _productRepository.Setup(x => x.Update(It.IsAny<Product>())).Returns(Task.CompletedTask);

        // Act
        await _ordersService.CreateOrder(dto, "weg");

        // Assert
        _productRepository.Verify(x => x.Update(It.Is<Product>(p =>
            p.Id == productId &&
            p.Name == productName &&
            p.Price == productPrice &&
            p.QuantityForSale == productQuantityForSale - dto.Quantity &&
            p.Quantity == productQuantity - dto.Quantity
        )), Times.Once);
    }

    [Test]
    public async Task ThrowExceptionWhenQuntityIsMoreThanQtyForSale()
    {
        _productRepository.Setup(x => x.GetById(It.IsAny<int>()))
            .ReturnsAsync(new Product { QuantityForSale = 10 });

        var dto = new CreateOrderDto { ProductId = 1, Quantity = 11 };

        // Act & Assert
        Assert.ThrowsAsync<HttpException>(async () => await _ordersService.CreateOrder(dto, "reg"));
    }
}
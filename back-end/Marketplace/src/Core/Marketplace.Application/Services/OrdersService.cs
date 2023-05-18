using System.Transactions;
using AutoMapper;
using Markerplace.Domain.Entities;
using Markerplace.Domain.Enums;
using Marketplace.Application.Models.OrderModels.Dtos;
using Marketplace.Application.Models.OrderModels.Interfaces;
using Marketplace.Application.Models.ProductModels.Interface;

namespace Marketplace.Application.Services;

public class OrdersService : IOrderService
{
    private readonly IOrdersRepository _ordersRepository;
    private readonly IProductRepository _productRepository;
    private readonly IMapper _mapper;

    public OrdersService(IOrdersRepository ordersRepository, IProductRepository productRepository, IMapper mapper)
    {
        _ordersRepository = ordersRepository;
        _productRepository = productRepository;
        _mapper = mapper;
    }

    public async Task<List<GetOrdersDto>> GetPendingsOrders()
    {
        var result = await _ordersRepository.GetPendingsOrders();
        foreach (var order in result)
        {
            order.Price *= order.Quantity;
            order.Status = ((OrderStatus)int.Parse(order.Status)).ToString();
            order.OrderDate = DateTime.Now.ToString("yyyy-MM-dd HH:mm");
        }

        return result;
    }

    public async Task<List<GetOrdersDto>> GetMyOrders(int userId)
    {
        var result = await _ordersRepository.GetMyOrders(userId);
        foreach (var order in result)
        {
            order.Price *= order.Quantity;
            order.Status = ((OrderStatus)int.Parse(order.Status)).ToString();
            order.OrderDate = DateTime.Now.ToString("yyyy-MM-dd HH:mm");
        }

        return result;
    }

    public async Task ChangeStatus(int id)
    {
        await ExceptionService.ThrowExceptionWhenIdNotFound(id, _ordersRepository);
        var order = await _ordersRepository.GetById(id);
        ExceptionService.ThrowExceptionWhenOrderIsNotPending(order);
        order.Status = OrderStatus.Finished;
        await _ordersRepository.Update(order);
    }

    public async Task CreateOrder(CreateOrderDto dto, int userId, string email)
    {
        await ExceptionService.ThrowExceptionWhenIdNotFound(dto.ProductId, _productRepository);

        var product = await _productRepository.GetById(dto.ProductId);
        ExceptionService.ThrowExceptionWhenNotEnoughQuantity(product.QuantityForSale, dto.Quantity);
        product.QuantityForSale -= dto.Quantity;

        product.Quantity -= dto.Quantity;

        await _productRepository.Update(product);

        var order = _mapper.Map<Order>(dto);

        order.Code = product.Code;

        order.Price = product.Price;

        order.Name = product.Name;

        order.UserId = userId;
        
        await _ordersRepository.Create(order);
    }

    public async Task RejectOrder(int id)
    {
        await ExceptionService.ThrowExceptionWhenIdNotFound(id, _ordersRepository);

        var order = await _ordersRepository.GetById(id);

        await ExceptionService.ThrowExceptionWhenIdNotFound(order.ProductId, _productRepository);

        var product = await _productRepository.GetById(order.ProductId);

        ExceptionService.ThrowExceptionWhenOrderIsNotPending(order);

        product.Quantity += order.Quantity;
        product.QuantityForSale += order.Quantity;
        order.Status = OrderStatus.Cancelled;
        await _productRepository.Update(product);
        await _ordersRepository.Update(order);
    }

    public async Task<string> GetStatusCodeByProductId(int productId)
    {
        var order = await _ordersRepository.GetOrderByProductId(productId);
        if (order != null)
        {
            var orderStatus = ((OrderStatus)int.Parse(order.Status)).ToString();
            return orderStatus;
        }

        return "Without product";
    }
}
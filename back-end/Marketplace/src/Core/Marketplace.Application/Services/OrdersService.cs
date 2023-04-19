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

    public List<GetOrdersDto> GetPendingsOrders()
    {
        var result = _ordersRepository.GetPendingsOrders();
        foreach (var order in result)
        {
            order.Price *= order.Quantity;
            order.Status = ((OrderStatus)int.Parse(order.Status)).ToString();
        }

        return result;
    }

    public List<GetOrdersDto> GetMyOrders(int userId)
    {
        var result = _ordersRepository.GetMyOrders(userId);
        foreach (var order in result)
        {
            order.Price *= order.Quantity;
            order.Status = ((OrderStatus)int.Parse(order.Status)).ToString();
        }

        return result;
    }

    public void ChangeStatus(int id)
    {
        var order = _ordersRepository.GetById(id);
        order.Status = OrderStatus.Finished;
        _ordersRepository.Update(order);
    }

    public void CreateOrder(CreateOrderDto dto)
    {
        var product = _productRepository.GetById(dto.ProductId);

        product.QuantityForSale -= dto.Quantity;

        product.Quantity -= dto.Quantity;

        _productRepository.Update(product);

        var order = _mapper.Map<Orders>(dto);

        _ordersRepository.Create(order);
    }

    public void RejectOrder(int id)
    {
        var order = _ordersRepository.GetById(id);
        var product = _productRepository.GetById(order.ProductId);

        product.Quantity += order.Quantity;
        product.QuantityForSale += order.Quantity;
        
        _productRepository.Update(product);
        _ordersRepository.Delete(id);
    }
}
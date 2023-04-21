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
        var result = _ordersRepository.GetPendingsOrders();
        foreach (var order in result.Result)
        {
            order.Price *= order.Quantity;
            order.Status = ((OrderStatus)int.Parse(order.Status)).ToString();
        }

        return await result;
    }

    public async Task<List<GetOrdersDto>> GetMyOrders(int userId)
    {
     
        var result = _ordersRepository.GetMyOrders(userId);
        foreach (var order in result.Result)
        {
            order.Price *= order.Quantity;
            order.Status = ((OrderStatus)int.Parse(order.Status)).ToString();
        }

        return await result;
    }

    public async Task ChangeStatus(int id)
    {
        var order = _ordersRepository.GetById(id).Result;
        order.Status = OrderStatus.Finished;
      await  _ordersRepository.Update(order);
    }

    public  async Task CreateOrder(CreateOrderDto dto)
    {
        var product = await _productRepository.GetById(dto.ProductId);

        product.QuantityForSale -= dto.Quantity;

        product.Quantity -= dto.Quantity;

       await _productRepository.Update(product);

        var order = _mapper.Map<Orders>(dto);
        
        order.Code = product.Code;

        order.Price = product.Price;

        order.Name = product.Name;
       await _ordersRepository.Create(order);
    }

    public async Task RejectOrder(int id)
    {
        var order = await _ordersRepository.GetById(id);
        var product = await _productRepository.GetById(order.ProductId);

        product.Quantity += order.Quantity;
        product.QuantityForSale += order.Quantity;
        
       await _productRepository.Update(product);
       await _ordersRepository.Delete(id);
    }
}
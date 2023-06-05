using System.Net;
using System.Transactions;
using AutoMapper;
using Markerplace.Domain.Entities;
using Markerplace.Domain.Enums;
using Marketplace.Application.Models.ExceptionModel;
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
        var input = await _ordersRepository.GetAll();
        var orders = _mapper.Map<List<GetOrdersDto>>(input)
            .Where(o => o.Status == OrderStatus.Pending.ToString())
            .Select(o =>
            {
                o.Price *= o.Quantity;
                return o;
            }).ToList();

        return orders;
    }

    public async Task<List<GetOrdersDto>> GetMyOrders(string email)
    {
        var result = await _ordersRepository.GetMyOrders(email);
        foreach (var order in result)
        {
            order.Price *= order.Quantity;
            order.Status = ((OrderStatus)int.Parse(order.Status)).ToString();
        }

        return result;
    }

    public async Task ChangeStatus(int id)
    {
        var entity = await _ordersRepository.GetById(id);

        if (entity == null)
        {
            throw new HttpException($"Order Id not found!", HttpStatusCode.NotFound);
        }
        var order = await _ordersRepository.GetById(id);
        if (order.Status != OrderStatus.Pending)
        {
            throw new HttpException("Order cannot be rejected, because it is not pending!", HttpStatusCode.BadRequest);
        }
        order.Status = OrderStatus.Finished;
        await _ordersRepository.Update(order);
    }

    public async Task CreateOrder(CreateOrderDto dto, string email)
    {
        var entity = await _productRepository.GetById(dto.ProductId);

        if (entity == null)
        {
            throw new HttpException($"Prodict Id not found!", HttpStatusCode.NotFound);
        }

        var product = await _productRepository.GetById(dto.ProductId);
        if (product.QuantityForSale < dto.Quantity)
        {
            throw new HttpException("Not enough quantity for sale!", HttpStatusCode.BadRequest);
        }
        product.QuantityForSale -= dto.Quantity;

        product.Quantity -= dto.Quantity;

        await _productRepository.Update(product);

        var order = _mapper.Map<Order>(dto);

        order.Code = product.Code;

        order.Price = product.Price;

        order.Name = product.Name;

        order.Email = email;
        
        await _ordersRepository.Create(order);
    }

    public async Task RejectOrder(int id)
    {
        var order = await _ordersRepository.GetById(id);

        if (order == null)
        {
            throw new HttpException($"Order Id not found!", HttpStatusCode.NotFound);
        }
        
        var entity = await _productRepository.GetById(order.ProductId);

        if (entity == null)
        {
            throw new HttpException($"Product Id not found!", HttpStatusCode.NotFound);
        }

        var product = await _productRepository.GetById(order.ProductId);

        if (order.Status != OrderStatus.Pending)
        {
            throw new HttpException("Order cannot be rejected, because it is not pending!", HttpStatusCode.BadRequest);
        }

        product.Quantity += order.Quantity;
        product.QuantityForSale += order.Quantity;
        order.Status = OrderStatus.Cancelled;
        await _productRepository.Update(product);
        await _ordersRepository.Update(order);
    }

    public async Task<GetOrderByProductIdDto> GetPendingOrderByProductId(int productId)
    {
       var order =  await _ordersRepository.GetPendingOrderByProductId(productId);
       return order;
    }
}
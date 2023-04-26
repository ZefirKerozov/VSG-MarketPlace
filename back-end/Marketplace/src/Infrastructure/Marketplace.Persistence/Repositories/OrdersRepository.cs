using System.Data.SqlClient;
using Dapper;
using Markerplace.Domain.Entities;
using Marketplace.Application.Models.GenericRepository;
using Marketplace.Application.Models.OrderModels.Dtos;
using Marketplace.Application.Models.OrderModels.Interfaces;
using Microsoft.Extensions.Configuration;

namespace Marketplace.Persistence.Repositories;

public class OrdersRepository : GenericRepository<Order>, IOrdersRepository
{
    public OrdersRepository(IUnitOfWork unitOfWork) :base(unitOfWork)
    {
    }

    public async Task<List<GetOrdersDto>> GetPendingsOrders()
    {

        var query =
            "SELECT Orders.Code, Orders.Price, Orders.Quantity, Orders.OrderDate, Orders.Status, Orders.Id, Orders.UserId  FROM Orders  Where Orders.Status = '0'";

        var result = await Connection.QueryAsync<GetOrdersDto>(query,null,Transaction);
        return  (List<GetOrdersDto>)result;
    }

    public async Task<List<GetOrdersDto>> GetMyOrders(int userId)
    {
        var query = @"SELECT Orders.Name, Orders.Code, Orders.Price, Orders.Quantity, Orders.OrderDate, Orders.Status, Orders.Id FROM Orders  Where Orders.UserId= @userId";

        var result = await Connection.QueryAsync<GetOrdersDto>(query, new{userId}, Transaction);
        return  (List<GetOrdersDto>)result;
    }

    public async Task<GetOrderByProductIdDto> GetOrderByProductId(int productId)
    {
        var query = @"SELECT Id, Quantity, Status, OrderDate, ProductId, UserId, Code, Price, Name FROM Orders WHERE ProductId = @productId";

        var result = await Connection.QueryFirstOrDefaultAsync<GetOrderByProductIdDto>(query,new{ productId},Transaction);

        return result;
    }
}
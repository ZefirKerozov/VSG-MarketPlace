using System.Data.SqlClient;
using Dapper;
using Markerplace.Domain.Entities;
using Marketplace.Application.Models.GenericRepository;
using Marketplace.Application.Models.OrderModels.Dtos;
using Marketplace.Application.Models.OrderModels.Interfaces;
using Microsoft.Extensions.Configuration;

namespace Marketplace.Persistence.Repositories;

public class OrdersRepository : GenericRepository<Orders>, IOrdersRepository
{
    public OrdersRepository(IUnitOfWork unitOfWork) :base(unitOfWork)
    {
    }

    public List<GetOrdersDto> GetPendingsOrders()
    {

        var query =
            "SELECT Orders.Code, Orders.Price, Orders.Quantity, Orders.OrderDate, Orders.Status, Orders.Id, Orders.UserId  FROM Orders  Where Orders.Status = '0'";

        var result = Connection.Query<GetOrdersDto>(query);
        return (List<GetOrdersDto>)result;
    }

    public List<GetOrdersDto> GetMyOrders(int userId)
    {
        var query = @"SELECT Orders.Name Orders.Code, Orders.Price, Orders.Quantity, Orders.OrderDate, Orders.Status, Orders.Id FROM Orders  Where Orders.UserId= @userId";

        var result = Connection.Query<GetOrdersDto>(query, new{userId});
        return (List<GetOrdersDto>)result;
    }
}
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
            "SELECT Products.Name, Products.Price, Orders.Quantity, Orders.OrderDate, Orders.Status FROM Products INNER JOIN Orders ON Products.Id = Orders.ProductID Where Orders.Status = 'Pending'";

        var result = Connection.Query<GetOrdersDto>(query);
        return (List<GetOrdersDto>)result;
    }
}
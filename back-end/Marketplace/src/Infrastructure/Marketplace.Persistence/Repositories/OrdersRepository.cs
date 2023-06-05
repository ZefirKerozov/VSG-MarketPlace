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
            "SELECT [Order].Code, [Order].Price, [Order].Quantity, CONVERT(varchar(16), OrderDate, 120) AS OrderDate, [Order].Status, [Order].Id, [Order].Email  FROM [Order]  Where [Order].Status = '0'";

        var result = await Connection.QueryAsync<GetOrdersDto>(query,null,Transaction);
        return  (List<GetOrdersDto>)result;
    }

    public async Task<List<GetOrdersDto>> GetMyOrders(string email)
    {
        var query = @"SELECT *, CONVERT(varchar(16), OrderDate, 120) AS OrderDate FROM [Order]  Where Email= @email";

        var result = await Connection.QueryAsync<GetOrdersDto>(query, new{email}, Transaction);
        return  (List<GetOrdersDto>)result;
    }

    public async Task<GetOrderByProductIdDto> GetPendingOrderByProductId(int productId)
    {
        var query = @"SELECT Id, Quantity, Status, OrderDate, ProductId, Email, Code, Price, Name FROM [Order] WHERE ProductId = @productId AND Status = '0'";

        var result = await Connection.QueryFirstOrDefaultAsync<GetOrderByProductIdDto>(query,new{ productId},Transaction);

        return result;
    }
}
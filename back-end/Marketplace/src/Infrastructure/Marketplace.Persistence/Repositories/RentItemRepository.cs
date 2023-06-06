using Dapper;
using Markerplace.Domain.Entities;
using Marketplace.Application.Models.GenericRepository;
using Marketplace.Application.Models.RentItemsModels.Dtos;
using Marketplace.Application.Models.RentItemsModels.Interfaces;
using Marketplace.Persistence.Migrations;

namespace Marketplace.Persistence.Repositories;

public class RentItemRepository : GenericRepository<RentItems>, IRentItemRepository
{
    public RentItemRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
    {
    }

    public async Task<List<RentItems>> GetAllItemsForRentByEmail()
    {
        var query = @"SELECT *, CONVERT(varchar(16), OrderDate, 120) AS OrderDate,  CONVERT(varchar(16), EndDate, 120) AS EndDate  FROM RentItems";
        var result = await Connection.QueryAsync<RentItems>(query,null, Transaction);
        return (List<RentItems>)result;
    }

    public async Task<List<GetMyItems>> GetMyItems(string email)
    {
        string query = "SELECT Quantity, FORMAT(OrderDate, 'yyyy-MM-dd HH:mm') AS OrderDate, FORMAT(EndDate, 'yyyy-MM-dd HH:mm') AS EndDate, Code, Name FROM RentItems WHERE Email = @email";
        return (List<GetMyItems>)await Connection.QueryAsync<GetMyItems>(query,new {email },Transaction);
    }

    public async Task<RentItems> GetItemByProductId(int productId)
    {
        string query = @"SELECT * FROM RentItems WHERE @productId = ProductId AND EndDate IS NULL";
        return await Connection.QueryFirstOrDefaultAsync<RentItems>(query, new { productId }, Transaction);
    }
}
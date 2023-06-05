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

    public async Task<List<GetAllItemsByEmailDto>> GetAllItemsForRentByEmail()
    {
        var query = @"SELECT Email, Quantity, CONVERT(varchar(16), OrderDate, 120) AS OrderDate,  CONVERT(varchar(16), EndDate, 120) AS EndDate, ProductId, Code, Name, Id  FROM RentItems GROUP BY Email, Quantity, OrderDate, EndDate, ProductId, Code, Name, Id ORDER BY Email; ";
        var result = await Connection.QueryAsync<GetAllItemsByEmailDto, RentItemsDto, GetAllItemsByEmailDto>(query,
            (itemGroup, item) =>
            {
                itemGroup.Items ??= new List<RentItemsDto>();
                itemGroup.Items.Add(item);
                return itemGroup;
            },null,Transaction,
            splitOn: "Quantity"
        );
        return (List<GetAllItemsByEmailDto>)result;
    }
}
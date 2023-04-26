using Markerplace.Domain.Entities;
using Marketplace.Application.Models.GenericRepository;
using Marketplace.Application.Models.ImageModels.Interface;
using Dapper;
using Marketplace.Application.Models.ImageModels.Dtos;

namespace Marketplace.Persistence.Repositories;

public class ImageRepository :GenericRepository<Image>, IImageRepository
{
    
    public ImageRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
    {
    }

    public async  Task<GetImageDto> GetImageByProductId(int productId)
    {
        var query = @"SELECT i.Id, i.img   FROM Products AS p   JOIN Image AS i on p.Id = i.ProductId WHERE p.Id= @productId";
        var result =  await Connection.QueryFirstOrDefaultAsync<GetImageDto>(query, new {productId}, Transaction);
        return  result;
    }
}
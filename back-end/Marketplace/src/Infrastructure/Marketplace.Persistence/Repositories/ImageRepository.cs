using Markerplace.Domain.Entities;
using Marketplace.Application.Models.GenericRepository;
using Marketplace.Application.Models.ImageModels.Interface;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Dapper;
using Marketplace.Application.Models.ImageModels.Dtos;

namespace Marketplace.Persistence.Repositories;

public class ImageRepository :GenericRepository<Images>, IImageRepository
{
    
    public ImageRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
    {
    }

    public  GetImageDto GetImageByProductId(int productId)
    {
        var query = @"SELECT i.Id, i.img   FROM Products AS p   JOIN Images AS i on p.Id = i.ProductId WHERE p.Id= @productId";

        return Connection.QueryFirst<GetImageDto>(query, new {productId}, Transaction);
    }
}
using System.Net;
using Markerplace.Domain.Entities;
using Markerplace.Domain.Enums;
using Marketplace.Application.Models.ExceptionModel;
using Marketplace.Application.Models.GenericRepository;

namespace Marketplace.Application.Services;

public static class ExceptionService
{
    public static async Task ThrowExceptionWhenIdNotFound<T>(int id, IGenericRepository<T> repo)
    {
        var entity = await repo.GetById(id);

        if (entity == null)
        {
            throw new HttpException($"{typeof(T).Name} Id not found!", HttpStatusCode.NotFound);
        }
    }

    public static void ThrowExceptionWhenNotEnoughQuantity(int saleQty, int orderQty)
    {
        if (orderQty > saleQty)
        {
            throw new HttpException("Not enough quantity for sale!", HttpStatusCode.BadRequest);
        }
    }


    public static void ThrowExceptionWhenOrderIsNotPending(Orders order)
    {
        if (order.Status != OrderStatus.Pending)
        {
            throw new HttpException("Order cannot be rejected, because it is not pending!", HttpStatusCode.BadRequest);
        }
    }

    public static void ThrowExceptionWhenIdsDoNotMatch(int firstId, int secondId)
    {
        if (firstId != secondId)
        {
            throw new HttpException("Requested Ids do not match!", HttpStatusCode.BadRequest);
        }
    }
    
    public static void ThrowExceptionWhenOrderIsNotComplete(string statusCode)
    {
        if (statusCode == OrderStatus.Pending.ToString())
        {
            throw new HttpException("Product can't be delete, because order is not complete!", HttpStatusCode.BadRequest);
        }
    }
}
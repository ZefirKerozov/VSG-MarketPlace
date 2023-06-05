using System.Net;
using AutoMapper;
using Markerplace.Domain.Entities;
using Marketplace.Application.Models.ExceptionModel;
using Marketplace.Application.Models.ProductModels.Interface;
using Marketplace.Application.Models.RentItemsModels.Dtos;
using Marketplace.Application.Models.RentItemsModels.Interfaces;

namespace Marketplace.Application.Services;

public class RentItemService : IRentItemsService
{
    private readonly IRentItemRepository _rentItemRepository;
    private readonly IProductRepository _productRepository;
    private readonly IMapper _mapper;

    public RentItemService(IRentItemRepository rentItemRepository, IProductRepository productRepository, IMapper mapper)
    {
        _rentItemRepository = rentItemRepository;
        _productRepository = productRepository;
        _mapper = mapper;
    }

    public async Task<int> CreateRent(AddItemForRentDto itemForRentDto)
    {
        var product = await _productRepository.GetById(itemForRentDto.ProductId);
        if (product == null)
        {
            throw new HttpException($"Product Id not found!", HttpStatusCode.NotFound);
        }

        if (itemForRentDto.Quantity > product.QuantityForRent)
        {
            throw new HttpException($"Quantity for rent is more than product quantity!", HttpStatusCode.NotFound);
        }

        var item = _mapper.Map<RentItems>(itemForRentDto);
        item.Code = product.Code;
        item.Name = product.Name;
        return await _rentItemRepository.Create(item);
    }

    public async Task<int> ReturnItem(int id)
    {
        var item = await _rentItemRepository.GetById(id);
        if (item == null)
        {
            throw new HttpException($"Item id not found!", HttpStatusCode.NotFound);
        }
        item.EndDate = DateTime.Now;
        return id;
    }

    public async Task<List<GetAllItemsByEmailDto>> GetAllItemsForRent()
    {
        return await _rentItemRepository.GetAllItemsForRentByEmail();
    }
}
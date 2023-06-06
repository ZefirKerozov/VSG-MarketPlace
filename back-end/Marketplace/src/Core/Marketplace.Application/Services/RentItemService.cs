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

        product.QuantityForRent -= itemForRentDto.Quantity;
        await _productRepository.Update(product);
        var item = _mapper.Map<RentItems>(itemForRentDto);
        item.Code = product.Code;
        item.Name = product.Name;
        return await _rentItemRepository.Create(item);
    }

    public async Task<ReturnItemDto> ReturnItem(int id)
    {
        var item = await _rentItemRepository.GetById(id);
        if (item == null)
        {
            throw new HttpException($"Item id not found!", HttpStatusCode.NotFound);
        }

        var product = await _productRepository.GetById(item.ProductId);
        
        if (product == null)
        {
            throw new HttpException($"Product id not found!", HttpStatusCode.NotFound);
        }
        product.QuantityForRent += item.Quantity;
        var date = DateTime.Now.ToString("yyyy/dd/mm hh:mm");
        item.EndDate = date;
        await _rentItemRepository.Update(item);
        await _productRepository.Update(product);
        return new ReturnItemDto()
        {
            Id = item.Id,
            EndDate = date,
        };
    }

    public async Task<List<GetAllItemsByEmailDto>> GetAllItemsForRent()
    {
        var result =  await _rentItemRepository.GetAllItemsForRentByEmail();
        var itemgroup = _mapper.Map<List<RentItemsDto>>(result);
        var items = itemgroup.GroupBy(i => i.Email).Select(group => new GetAllItemsByEmailDto
        {
            Email = group.Key,
            Items = group.ToList()
        }).ToList();;
        return items;
    }

    public async Task<List<GetMyItems>> GetMyItems(string email)
    {
     return await _rentItemRepository.GetMyItems(email);
    }

    public async Task<RentItems> GetItemByProductId(int productId)
    {
        return await _rentItemRepository.GetItemByProductId(productId);
    }
}
﻿namespace Marketplace.Application.Models.RentItemsModels.Dtos;

public class AddItemForRentDto
{
    public int Quantity { get; set; }
    
    public int ProductId { get; set; }

    public string Email { get; set; }
}
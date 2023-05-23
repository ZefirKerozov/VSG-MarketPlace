﻿using FluentValidation;
using Marketplace.Application.Models.ProductModels.Dtos;

namespace Marketplace.Application.Helpers.Validators;

public class EditProductValidator:AbstractValidator<ProductEditDto>
{
    public EditProductValidator()
    {
        RuleFor(x => x.Code).NotEmpty().WithMessage("Code can't be null").NotNull().WithMessage("Code can't be null").Length(0, 255).WithMessage("Length can't be more than 255 characters");
        RuleFor(x => x.Name).NotEmpty().WithMessage("Name can't be null").NotNull().WithMessage("Name can't be null").Length(0, 255).WithMessage("Length can't be more than 255 characters");
        RuleFor(x => x.CategoryId).NotEmpty().WithMessage("Category can't be null").NotNull().WithMessage("Category can't be null");
       

    }
}
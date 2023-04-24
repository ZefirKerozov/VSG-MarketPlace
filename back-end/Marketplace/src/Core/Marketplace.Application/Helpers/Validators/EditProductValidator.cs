using FluentValidation;
using Marketplace.Application.Models.ProductModels.Dtos;

namespace Marketplace.Application.Helpers.Validators;

public class EditProductValidator:AbstractValidator<ProductEditDto>
{
    public EditProductValidator()
    {
        RuleFor(x => x.Quantity).NotEmpty().WithMessage("Quantity can't be null").NotNull().WithMessage("Quantity can't be null");
        RuleFor(x => x.QuantityForSale).NotEmpty().WithMessage("Quantity for sale can't be null").NotNull().WithMessage("Quantity for sale can't be null");
        RuleFor(x => x.Code).NotEmpty().WithMessage("Code can't be null").NotNull().WithMessage("Code can't be null").Length(0, 255).WithMessage("Length can't be more than 255 characters");
        RuleFor(x => x.Name).NotEmpty().WithMessage("Name can't be null").NotNull().WithMessage("Name can't be null").Length(0, 255).WithMessage("Length can't be more than 255 characters");
        RuleFor(x => x.Description).NotEmpty().WithMessage("Description can't be null").NotNull().WithMessage("Description can't be null");
        RuleFor(x => x.CategoryId).NotEmpty().WithMessage("Category can't be null").NotNull().WithMessage("Category can't be null");
        RuleFor(x => x.Location).NotEmpty().WithMessage("Location can't be null").NotNull().WithMessage("Location can't be null").Length(0, 50).WithMessage("Length can't be more than 50 characters");
        RuleFor(x => x.Price).NotEmpty().WithMessage("Price can't be null").NotNull().WithMessage("Price can't be null");
        
    }
}
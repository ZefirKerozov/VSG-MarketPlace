using FluentValidation;
using Markerplace.Domain.Entities;
using Marketplace.Application.Models.OrderModels.Dtos;

namespace Marketplace.Application.Helpers.Validators;

public class CreateOrderValidator :AbstractValidator<CreateOrderDto>
{
    public CreateOrderValidator()
    {
        RuleFor(x => x.Quantity).NotEmpty().WithMessage("Quantity can't be null").NotNull().WithMessage("Quantity can't be null");

    }
}
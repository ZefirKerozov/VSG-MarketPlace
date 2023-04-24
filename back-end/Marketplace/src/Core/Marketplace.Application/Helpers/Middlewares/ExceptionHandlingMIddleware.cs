using System.Net;
using System.Text.Json;
using FluentValidation;
using Marketplace.Application.Models.ExceptionModel;
using Marketplace.Application.Models.GenericRepository;
using Microsoft.AspNetCore.Http;

namespace Marketplace.Application.Helpers.Middlewares;

public class ExceptionHandlingMIddleware
{
    private readonly RequestDelegate _next;

    public ExceptionHandlingMIddleware(RequestDelegate next)
    {
        _next = next;
    } 
    public async Task InvokeAsync(HttpContext context,IUnitOfWork unitOfWork){
        try
        {
            await _next(context);
            unitOfWork.Transaction.Commit();
        }
        catch (Exception e)
        {
            unitOfWork.Transaction.Rollback();
            List<ErrorDetails> problems = new List<ErrorDetails>();
            if (e is HttpException httpException)
            {
                problems.Add(new ErrorDetails()
                {
                    StatusCode = (int)httpException.HttpStatusCode,
                    Message = e.Message
                });
            }
            else if (e is ValidationException validationException)
            {
                foreach (var error in validationException.Errors)
                {
                    problems.Add(new ErrorDetails()
                    {
                        StatusCode = 400,
                        Message = error.ErrorMessage
                    });
                }
            }

            context.Response.StatusCode = (int)problems[0].StatusCode;
            context.Response.ContentType = "application/json";
            var json = JsonSerializer.Serialize(problems);
    
            await context.Response.WriteAsync(json);
        }
    }


    
} 
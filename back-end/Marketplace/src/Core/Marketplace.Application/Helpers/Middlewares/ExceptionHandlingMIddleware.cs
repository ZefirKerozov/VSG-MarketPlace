using System.Net;
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
        catch (HttpException e)
        {
            unitOfWork.Transaction.Rollback();
            context.Response.StatusCode = (int)e.HttpStatusCode;
            context.Response.ContentType = "aplication/json";

            await context.Response.WriteAsync(new ErrorDetails
            {
                StatusCode = context.Response.StatusCode,
                Message = e.Message
            }.ToString());
            
        }
    }


    
} 
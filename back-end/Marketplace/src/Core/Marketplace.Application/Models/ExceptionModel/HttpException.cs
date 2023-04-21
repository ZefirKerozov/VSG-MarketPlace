using System.Net;

namespace Marketplace.Application.Models.ExceptionModel;

public class HttpException :Exception
{
    public HttpException(string Message, HttpStatusCode httpStatusCode) : base(Message)
    {
        HttpStatusCode = httpStatusCode;
    }

    public HttpStatusCode HttpStatusCode { get; }
}
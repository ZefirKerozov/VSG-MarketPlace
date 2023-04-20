using Microsoft.AspNetCore.Mvc;

namespace Marketplace.API.Controllers;

[Route("api/Category")]
[ApiController]
public class CategoryController: ControllerBase
{
    [HttpGet]
    [Route("All")]
    public List<GatAllCategories> GetAllCategories()
    {
        
    }
}
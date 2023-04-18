using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Markerplace.Domain.Entities;
using Marketplace.Application.Models.ImageModels.Dtos;
using Marketplace.Application.Models.ImageModels.Interface;
using Microsoft.Extensions.Configuration;

namespace Marketplace.Application.Services;

public class ImageService :IImageService
{
    private readonly IImageRepository _imageRepository;
    private readonly IConfiguration _config;
    private readonly Cloudinary _cloudinary;


    public ImageService(IImageRepository imageRepository, IConfiguration config)
    {
        _imageRepository = imageRepository;
        _config = config;
        var cloudinaryAccount = new Account(
            _config["Cloudinary:CloudName"],
            _config["Cloudinary:APIKey"],
            _config["Cloudinary:APISecret"]);
        _cloudinary = new Cloudinary(cloudinaryAccount);
    }
    public void DeleteImages(int id)
    {
        var image = _imageRepository.GetById(id);
        _cloudinary.Destroy(new DeletionParams(image.img));
        _imageRepository.Delete(id);
    }

    public void UploadImage(int productId, AddImageDto image)
    {
        _cloudinary.Api.Secure = true;

        //Turn file into byte array
        byte[] bytes;
        using (var memoryStream = new MemoryStream())
        {
            image.Image.CopyTo(memoryStream);
            bytes = memoryStream.ToArray();
        }
        string base64 = Convert.ToBase64String(bytes);

        //construct image path
        
        var prefix = @"data:image/png;base64,";
        var imagePath = prefix + base64;

        //upload to cloudinary
        var uploadParams = new ImageUploadParams()
        {
            File = new FileDescription(imagePath),
            Folder = "MarketPlace/"
        };

        var uploadResult =  _cloudinary.Upload(@uploadParams);

         SaveImageInDatabase(productId, uploadResult.PublicId);
    }
    private  void SaveImageInDatabase(int productId, string publicId)
    {
       
            Images newImage = new Images()
            {
                ProductId = productId,
                img = publicId
            };

            _imageRepository.Create(newImage);
        
        
    }
}
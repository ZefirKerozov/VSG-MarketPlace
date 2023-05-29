using System.Net;
using Marketplace.Application.Models.ExceptionModel;
using Microsoft.AspNetCore.Http;
using OfficeOpenXml;

namespace Marketplace.Application.Services;

public class ExcelService
{
    public void Read(string filePath){
        if (string.IsNullOrEmpty(filePath))
        {
            throw new HttpException("File path is missing.", HttpStatusCode.NotFound);
        }

        // Check if the file exists
        if (!File.Exists(filePath))
        {
            throw new HttpException("Wrong path!", HttpStatusCode.NotFound);
        }

        using (var package = new ExcelPackage(new FileInfo(filePath)))
        {
            // Assuming the Excel file has only one worksheet, you can access it like this:
            var worksheet = package.Workbook.Worksheets[1];

            // Read the data from the Excel worksheet
            var rowCount = worksheet.Dimension.Rows;
            var columnCount = worksheet.Dimension.Columns;

            for (int row = 1; row <= rowCount; row++)
            {
                for (int col = 1; col <= columnCount; col++)
                {
                    var cellValue = worksheet.Cells[row, col].Value;
                    // Process the cell value as needed
                }
            }
        }
    } 
    
    }
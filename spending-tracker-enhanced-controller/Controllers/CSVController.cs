using System.Globalization;
using CsvHelper;
using CsvHelper.Configuration;
using Microsoft.AspNetCore.Mvc;

namespace spending_tracker_enhanced_controller.Controllers;

[ApiController]
[Route("[controller]")]
public class CSVController : ControllerBase
{
    private readonly ILogger<CSVController> _logger;
    // private readonly YourDbContext _dbContext;

    public CSVController(ILogger<CSVController> logger)
    {
        _logger = logger;
        // _dbContext = dbContext;
    }

    [HttpPost("UploadFile")]
    public async Task<IActionResult> OnFileSelected(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("File is not selected");

        using (var reader = new StreamReader(file.OpenReadStream()))
        using (var csv = new CsvReader(reader, new CsvConfiguration(CultureInfo.InvariantCulture)
        {
            Delimiter = "\t", // Set the delimiter to tab
        }))
        {
            var records = csv.GetRecords<CSVTransactionModel>().ToList();

            // TODO: add to mysql DB

            // Process the records as needed

            return Ok("File uploaded and data saved to the database");
        }
    }
}

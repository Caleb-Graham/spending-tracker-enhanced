using System.Globalization;
using CsvHelper;
using CsvHelper.Configuration;
using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace spending_tracker_enhanced_controller.Controllers;

[ApiController]
[Route("[controller]")]
public class CSVController : ControllerBase
{
    private readonly ILogger<CSVController> _logger;
    private readonly IConfiguration _configuration;

    public CSVController(ILogger<CSVController> logger, IConfiguration configuration)
    {
        _logger = logger;
        _configuration = configuration;
    }

    [HttpPost("UploadFile")]
    public async Task<IActionResult> OnFileSelected(IFormFile file)
    {
        try
        {
            // Retrieve connection string from appsettings.json
            var connectionString = _configuration.GetConnectionString("DefaultConnection");

            // Check if connectionString is not null before using it
            if (connectionString == null)
            {
                // Log or handle the situation where the connection string is not found
                return BadRequest("Connection string not found in appsettings.json");
            }
            var dbHelper = new DBHelper(connectionString);

            if (file == null || file.Length == 0)
                return BadRequest("File is not selected");

            using (var reader = new StreamReader(file.OpenReadStream()))
            using (var csv = new CsvReader(reader, new CsvConfiguration(CultureInfo.InvariantCulture)
            {
                Delimiter = "\t", // Set the delimiter to tab
            }))
            {
                var records = csv.GetRecords<CSVTransactionModel>().ToList();

                foreach (var record in records)
                {
                    var parameters = new Dictionary<string, object>
                {
                    { "@Date", record.Date },
                    { "@Category", record.Category },
                    { "@Amount", record.Amount },
                    { "@Note", record.Note },
                    { "@Account", record.Account }
                };

                    await dbHelper.ExecuteNonQueryAsync("INSERT INTO expenses (Date, Category, Amount, Note, Account) VALUES (@Date, @Category, @Amount, @Note, @Account)", parameters);
                }
            }

            return Ok(true);
        }
        catch (Exception ex)
        {
            // Log the exception for debugging purposes
            Console.WriteLine($"Error: {ex.Message}");

            // You might want to provide a more user-friendly error message in a production environment
            return BadRequest("Failed to upload file and save data to the database");
        }
    }

    [HttpGet("GetAllExpenses")]
    public async Task<IActionResult> GetAllExpenses()
    {
        try
        {
            // Retrieve connection string from appsettings.json
            var connectionString = _configuration.GetConnectionString("DefaultConnection");

            // Check if connectionString is not null before using it
            if (connectionString == null)
            {
                // Log or handle the situation where the connection string is not found
                return BadRequest("Connection string not found in appsettings.json");
            }

            var dbHelper = new DBHelper(connectionString);

            // Retrieve all data from the "expenses" table
            var expenses = await dbHelper.QueryAsync<CSVTransactionModel>("SELECT * FROM expenses");

            // Handle the retrieved data as needed
            return Ok(expenses);
        }
        catch (Exception ex)
        {
            // Log the exception for debugging purposes
            Console.WriteLine($"Error: {ex.Message}");

            // You might want to provide a more user-friendly error message in a production environment
            return BadRequest("Failed to retrieve data from the 'expenses' table");
        }
    }
}

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
            var csvHelper = new CSVFileHelper();

            if (file == null || file.Length == 0)
                return BadRequest("File is not selected");

            using (var reader = new StreamReader(file.OpenReadStream()))
            using (var csv = new CsvReader(reader, new CsvConfiguration(CultureInfo.InvariantCulture)
            {
                Delimiter = "\t", // Set the delimiter to tab
            }))
            {
                var records = csv.GetRecords<CSVTransaction>().ToList();

                foreach (var record in records)
                {
                    var recordType = csvHelper.GetType(record.Amount);

                    await dbHelper.ExecuteNonQueryAsync(@"
                   INSERT INTO categories (name, type)
                    VALUES (@Category, @Type)
                    ON CONFLICT (name, type) DO NOTHING;", new Dictionary<string, object>
                    {
                        { "@Category", record.Category },
                        { "@Type", recordType }
                    });

                    var categoryId = await csvHelper.GetCategoryID(record.Category, recordType, connectionString);
                    var parameters = new Dictionary<string, object>
                    {
                        { "@Date", record.Date },
                        { "@CategoryID", categoryId },
                        { "@Amount", record.Amount },
                        { "@Note", record.Note },
                        { "@Account", record.Account }
                    };

                    if (record.Amount > 0)
                    {
                        await dbHelper.ExecuteNonQueryAsync(@"
                        INSERT INTO income 
                        (user_id, category_id, amount, description, date) 
                        VALUES (1, @CategoryID, @Amount, @Note, @Date)", parameters);
                    }

                    if (record.Amount < 0)
                    {
                        await dbHelper.ExecuteNonQueryAsync(@"
                        INSERT INTO expenses 
                        (user_id, category_id, amount, description, date) 
                        VALUES (1, @CategoryID, @Amount, @Note, @Date)", parameters);
                    }


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

    // TODO: pretty sure this is a duplicate and can be removed
    // [HttpGet("GetExpenses")]
    // public async Task<IActionResult> GetExpenses()
    // {
    //     try
    //     {
    //         // Retrieve connection string from appsettings.json
    //         var connectionString = _configuration.GetConnectionString("DefaultConnection");

    //         // Check if connectionString is not null before using it
    //         if (connectionString == null)
    //         {
    //             // Log or handle the situation where the connection string is not found
    //             return BadRequest("Connection string not found in appsettings.json");
    //         }

    //         var dbHelper = new DBHelper(connectionString);

    //         // Retrieve all data from the "expenses" table
    //         var expenses = await dbHelper.QueryAsync<Expense>("SELECT * FROM expenses");

    //         // Handle the retrieved data as needed
    //         return Ok(expenses);
    //     }
    //     catch (Exception ex)
    //     {
    //         // Log the exception for debugging purposes
    //         Console.WriteLine($"Error: {ex.Message}");

    //         // You might want to provide a more user-friendly error message in a production environment
    //         return BadRequest("Failed to retrieve data from the 'expenses' table");
    //     }
    // }
}

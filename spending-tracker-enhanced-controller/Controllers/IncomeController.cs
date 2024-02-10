using Microsoft.AspNetCore.Mvc;

namespace spending_tracker_enhanced_controller.Controllers;

[ApiController]
[Route("[controller]")]
public class IncomeController : ControllerBase
{
    private readonly IConfiguration _configuration;

    public IncomeController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpGet("GetIncome")]
    public async Task<IActionResult> GetIncome()
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

            // Retrieve all data from the "income" table
            var income = await dbHelper.QueryAsync<IncomeModel>(@"
                            SELECT
                                categories.name AS category_name,
                                SUM(income.amount) AS total_amount
                            FROM
                                income
                            JOIN
                                categories ON income.category_id = categories.category_id
                            GROUP BY
                                categories.name, categories.type
                            ORDER BY
                                total_amount DESC;
                            ");

            // Handle the retrieved data as needed
            return Ok(income);
        }
        catch (Exception ex)
        {
            // Log the exception for debugging purposes
            Console.WriteLine($"Error: {ex.Message}");

            // You might want to provide a more user-friendly error message in a production environment
            return BadRequest("Failed to retrieve data from the 'income' table");
        }
    }
}

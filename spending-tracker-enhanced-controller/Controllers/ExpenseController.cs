using Microsoft.AspNetCore.Mvc;

namespace spending_tracker_enhanced_controller.Controllers;

[ApiController]
[Route("[controller]")]
public class ExpensesController : ControllerBase
{
    private readonly IConfiguration _configuration;

    public ExpensesController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpGet("GetExpenses")]
    public async Task<IActionResult> GetExpenses()
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
            var expenses = await dbHelper.QueryAsync<Expense>(@"
                            SELECT
                                categories.name AS category_name,
                                SUM(expenses.amount) AS total_amount
                            FROM
                                expenses
                            JOIN
                                categories ON expenses.category_id = categories.category_id
                            GROUP BY
                                categories.name, categories.type
                            ORDER BY
                                total_amount DESC;
                            ");

            // Handle the retrieved data as needed
            return Ok(expenses);
        }
        catch (Exception ex)
        {
            // Log the exception for debugging purposes
            Console.WriteLine($"Error: {ex.Message}");

            return BadRequest("Failed to retrieve data from the 'expenses' table");
        }
    }
}

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
    public async Task<IActionResult> GetIncome([FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
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

            // Construct the SQL query based on the provided start and end dates
            string sqlQuery = @"
            WITH RECURSIVE CategoryHierarchy AS (
                -- Anchor member: select all categories that don't have a parent category
                SELECT category_id AS top_level_category_id, category_id, name, parent_category_id
                FROM categories
                WHERE parent_category_id IS NULL
                                
                UNION ALL
                                
                -- Recursive member: join to find children of the current level
                SELECT ch.top_level_category_id, c.category_id, c.name, c.parent_category_id
                FROM categories c
                JOIN CategoryHierarchy ch ON c.parent_category_id = ch.category_id
            ),
            AggregatedIncome AS (
                -- Join the hierarchy with income to get income related to all categories
                SELECT ch.top_level_category_id, i.amount
                FROM CategoryHierarchy ch
                INNER JOIN income i ON ch.category_id = i.category_id";

            // Append condition for start date if provided
            if (startDate.HasValue)
            {
                sqlQuery += $" WHERE i.date >= '{startDate.Value:yyyy-MM-dd}'";
            }

            // Append condition for end date if provided
            if (endDate.HasValue)
            {
                // Use "AND" if a condition was previously added
                sqlQuery += (startDate.HasValue ? " AND" : " WHERE") + $" i.date <= '{endDate.Value:yyyy-MM-dd}'";
            }

            // Close the AggregatedIncome CTE and continue with the main query
            sqlQuery += @"
            )
            -- Aggregate income for each top-level category
            SELECT ch.name AS category_name, SUM(ai.amount) AS total_amount
            FROM AggregatedIncome ai
            INNER JOIN categories ch ON ai.top_level_category_id = ch.category_id
            GROUP BY ch.name
            ORDER BY total_amount DESC;";

            // Retrieve data using the constructed SQL query
            var income = await dbHelper.QueryAsync<Income>(sqlQuery);

            // Handle the retrieved data as needed
            return Ok(income);
        }
        catch (Exception ex)
        {
            // Log the exception for debugging purposes
            Console.WriteLine($"Error: {ex.Message}");

            return BadRequest("Failed to retrieve data from the 'income' table");
        }
    }

}

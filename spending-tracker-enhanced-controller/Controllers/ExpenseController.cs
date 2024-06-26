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

    [HttpGet("GetParentExpenses")]
    public async Task<IActionResult> GetParentExpenses([FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
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
            AggregatedExpenses AS (
                -- Join the hierarchy with expenses to get expenses related to all categories
                SELECT ch.top_level_category_id, e.amount
                FROM CategoryHierarchy ch
                JOIN expenses e ON ch.category_id = e.category_id";

            // Append condition for start date if provided
            if (startDate.HasValue)
            {
                sqlQuery += $" WHERE e.date >= '{startDate.Value.ToString("yyyy-MM-dd")}'";
            }

            // Append condition for end date if provided
            if (endDate.HasValue)
            {
                // Use "AND" if a condition was previously added
                sqlQuery += (startDate.HasValue ? " AND" : " WHERE") + $" e.date <= '{endDate.Value.ToString("yyyy-MM-dd")}'";
            }

            // Close the AggregatedExpenses CTE and continue with the main query
            sqlQuery += @"
            )
            -- Aggregate expenses for each top-level category
            SELECT 
                ch.name AS category_name,
                SUM(ae.amount) AS total_amount,
                SUM(ae.amount) * 100.0 / SUM(SUM(ae.amount)) OVER () AS percent_of_total
            FROM AggregatedExpenses ae
            JOIN categories ch ON ae.top_level_category_id = ch.category_id
            GROUP BY ch.name
            ORDER BY total_amount ASC";

            // Retrieve data using the constructed SQL query
            var expenses = await dbHelper.QueryAsync<Expense>(sqlQuery);

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

    [HttpGet("GetChildExpenses")]
    public async Task<IActionResult> GetChildExpenses([FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
    {
        try
        {
            // Retrieve connection string from appsettings.json
            var connectionString = _configuration.GetConnectionString("DefaultConnection");

            // Check if connectionString is not null before using it
            if (connectionString == null)
            {
                return BadRequest("Connection string not found in appsettings.json");
            }

            var dbHelper = new DBHelper(connectionString);

            // Base SQL query
            string sqlQuery = @"
            SELECT
                categories.name AS category_name,
                SUM(expenses.amount) AS total_amount,
                SUM(expenses.amount) * 100.0 / SUM(SUM(expenses.amount)) OVER () AS percent_of_total
            FROM
                expenses
            JOIN
                categories ON expenses.category_id = categories.category_id";

            // Append condition for start date if provided
            if (startDate.HasValue)
            {
                sqlQuery += $" WHERE expenses.date >= '{startDate.Value:yyyy-MM-dd}'";
            }

            // Append condition for end date if provided
            if (endDate.HasValue)
            {
                sqlQuery += (startDate.HasValue ? " AND" : " WHERE") + $" expenses.date <= '{endDate.Value:yyyy-MM-dd}'";
            }

            // Continue with grouping and ordering
            sqlQuery += @"
            GROUP BY
                categories.name
            ORDER BY
                total_amount ASC";

            // Retrieve data using the constructed SQL query
            var expenses = await dbHelper.QueryAsync<Expense>(sqlQuery);

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

using Microsoft.AspNetCore.Mvc;

namespace spending_tracker_enhanced_controller.Controllers;

[ApiController]
[Route("[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly IConfiguration _configuration;

    public CategoriesController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpGet("GetCategories")]
    public async Task<IActionResult> GetCategories()
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
            var categories = await dbHelper.QueryAsync<CategoriesModel>(@"SELECT * FROM Categories ORDER BY name");

            // Handle the retrieved data as needed
            return Ok(categories);
        }
        catch (Exception ex)
        {
            // Log the exception for debugging purposes
            Console.WriteLine($"Error: {ex.Message}");

            return BadRequest("Failed to retrieve data from the 'categories' table");
        }
    }

    [HttpPost("AddCategory")]
    public async Task<IActionResult> AddCategory(CategoriesModel category)
    {
        try
        {
            // Check if the received category is valid
            if (category == null)
            {
                return BadRequest("Invalid category data");
            }

            // Retrieve connection string from appsettings.json
            var connectionString = _configuration.GetConnectionString("DefaultConnection");

            // Check if connectionString is not null before using it
            if (connectionString == null)
            {
                return BadRequest("Connection string not found in appsettings.json");
            }

            var dbHelper = new DBHelper(connectionString);

            var parameters = new Dictionary<string, object>
                    {
                        { "@Name", category.Name },
                        { "@Type", category.Type },
                    };

            // Insert the new category into the "Categories" table
            var success = await dbHelper.ExecuteNonQueryAsync(@"INSERT INTO Categories (name, type) VALUES (@Name, @Type)", parameters);

            return Ok(true);
        }
        catch (Exception ex)
        {
            // Log the exception for debugging purposes
            Console.WriteLine($"Error: {ex.Message}");

            return BadRequest("Failed to add the category");
        }
    }

    [HttpPost("UpdateCategory")]
    public async Task<IActionResult> UpdateCategory(CategoriesModel category)
    {
        try
        {
            // Check if the received category is valid
            if (category == null || category.Category_ID <= 0)
            {
                return BadRequest("Invalid category data");
            }

            // Retrieve connection string from appsettings.json
            var connectionString = _configuration.GetConnectionString("DefaultConnection");

            // Check if connectionString is not null before using it
            if (connectionString == null)
            {
                return BadRequest("Connection string not found in appsettings.json");
            }

            var dbHelper = new DBHelper(connectionString);

            var parameters = new Dictionary<string, object>
                {
                    { "@Id", category.Category_ID },
                    { "@Name", category.Name },
                    { "@Type", category.Type },
                };

            // Update the existing category in the "Categories" table
            var success = await dbHelper.ExecuteNonQueryAsync(@"UPDATE Categories SET name = @Name, type = @Type WHERE Id = @Id", parameters);

            return Ok(true);
        }
        catch (Exception ex)
        {
            // Log the exception for debugging purposes
            Console.WriteLine($"Error: {ex.Message}");

            return BadRequest("Failed to update the category");
        }
    }

    [HttpDelete("DeleteCategory/{categoryId}")]
    public async Task<IActionResult> DeleteCategory(int categoryId)
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

            var parameters = new Dictionary<string, object>
                    {
                        { "@CategoryId", categoryId },
                    };

            // Delete the category from the "Categories" table based on the categoryId
            var success = await dbHelper.ExecuteNonQueryAsync(@"DELETE FROM Categories WHERE Id = @CategoryId", parameters);

            return Ok(true);
        }
        catch (Exception ex)
        {
            // Log the exception for debugging purposes
            Console.WriteLine($"Error: {ex.Message}");

            return BadRequest("Failed to delete the category");
        }
    }
}

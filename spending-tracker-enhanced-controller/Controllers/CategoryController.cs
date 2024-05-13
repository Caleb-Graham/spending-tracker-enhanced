using Microsoft.AspNetCore.Mvc;

namespace spending_tracker_enhanced_controller.Controllers;

[ApiController]
[Route("[controller]")]
public class CategoryController : ControllerBase
{
    private readonly IConfiguration _configuration;

    public CategoryController(IConfiguration configuration)
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
            var categories = await dbHelper.QueryAsync<Category>(@"
            SELECT 
                c.*, 
                parent.name AS parent_category_name
            FROM 
                Categories c
            LEFT JOIN 
                Categories parent ON c.parent_category_id = parent.category_id
            ORDER BY 
                c.name
            ");

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
    public async Task<IActionResult> AddCategory(Category category)
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

            // Prepare parameters for the SQL query
            var parameters = new Dictionary<string, object>
        {
            { "@Name", category.Name },
            { "@Type", category.Type }
        };

            // Add ParentName parameter if it's not null
            if (category.Parent_Category_Name != null)
            {
                parameters.Add("@ParentName", category.Parent_Category_Name);
            }
            else
            {
                parameters.Add("@ParentName", DBNull.Value);
            }

            // Insert the new category into the "Categories" table
            var success = await dbHelper.ExecuteNonQueryAsync(@"INSERT INTO 
            Categories (name, type, parent_category_id) 
            VALUES (@Name, @Type, (SELECT category_id FROM categories WHERE name = @ParentName))", parameters);

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
    public async Task<IActionResult> UpdateCategory(CategoryRequest category)
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
                    { "@OldName", category.OldCategoryName },
                    { "@Type", category.Type },
                };

            // Add ParentName parameter if it's not null
            if (category.Parent_Category_Name != null)
            {
                parameters.Add("@ParentName", category.Parent_Category_Name);
            }
            else
            {
                parameters.Add("@ParentName", DBNull.Value);
            }

            // Update the existing category in the "Categories" table
            var success = await dbHelper.ExecuteNonQueryAsync(@"
            UPDATE Categories 
            SET name = @Name, type = @Type, parent_category_id = (SELECT category_id FROM categories WHERE name = @ParentName)
            WHERE name = @OldName", parameters);

            return Ok(true);
        }
        catch (Exception ex)
        {
            // Log the exception for debugging purposes
            Console.WriteLine($"Error: {ex.Message}");

            return BadRequest("Failed to update the category");
        }
    }

    [HttpDelete("DeleteCategory/{categoryName}")]
    public async Task<IActionResult> DeleteCategory(string categoryName)
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
                        { "@CategoryName", categoryName },
                    };

            // Delete the category from the "Categories" table based on the CategoryName
            var success = await dbHelper.ExecuteNonQueryAsync(@"
                DELETE FROM Categories 
                WHERE name = @CategoryName", parameters);

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

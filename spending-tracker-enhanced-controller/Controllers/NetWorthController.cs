using Microsoft.AspNetCore.Mvc;

namespace spending_tracker_enhanced_controller.Controllers;

[ApiController]
[Route("[controller]")]
public class NetWorthController : ControllerBase
{
    private readonly IConfiguration _configuration;

    public NetWorthController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpGet("GetNetWorthAccounts")]
    public async Task<IActionResult> GetNetWorthAccounts()
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
            var netWorthAccounts = await dbHelper.QueryAsync<NetWorthAccount>(@"
             SELECT 
                *
            FROM 
                Net_Worth_Accounts nwa
            ORDER BY 
                nwa.name
            ");

            // Handle the retrieved data as needed
            return Ok(netWorthAccounts);
        }
        catch (Exception ex)
        {
            // Log the exception for debugging purposes
            Console.WriteLine($"Error: {ex.Message}");

            return BadRequest("Failed to retrieve data from the 'NetWorthAccount' table");
        }
    }

    [HttpPost("AddNetWorthAccount")]
    public async Task<IActionResult> AddNetWorthAccount(NetWorthAccount account)
    {
        try
        {
            // Check if the received category is valid
            if (account == null)
            {
                return BadRequest("Invalid account data");
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
            { "@Name", account.Name },
            { "@Type", account.Type }
        };

            // Insert the new category into the "Categories" table
            var success = await dbHelper.ExecuteNonQueryAsync(@"INSERT INTO 
            Net_Worth_Accounts (name, type) 
            VALUES (@Name, @Type)", parameters);

            return Ok(true);
        }
        catch (Exception ex)
        {
            // Log the exception for debugging purposes
            Console.WriteLine($"Error: {ex.Message}");

            return BadRequest("Failed to add the account");
        }
    }

    // [HttpPost("UpdateNetWorthAccount")]
    // public async Task<IActionResult> UpdateNetWorthAccount(CategoryRequest account)
    // {
    //     try
    //     {
    //         // Check if the received category is valid
    //         if (category == null)
    //         {
    //             return BadRequest("Invalid category data");
    //         }

    //         // Retrieve connection string from appsettings.json
    //         var connectionString = _configuration.GetConnectionString("DefaultConnection");

    //         // Check if connectionString is not null before using it
    //         if (connectionString == null)
    //         {
    //             return BadRequest("Connection string not found in appsettings.json");
    //         }

    //         var dbHelper = new DBHelper(connectionString);

    //         var parameters = new Dictionary<string, object>
    //             {
    //                 { "@Name", category.Name },
    //                 { "@OldName", category.OldCategoryName },
    //                 { "@Type", category.Type },
    //                 { "@OldCategoryType", category.OldCategoryType },
    //             };

    //         // Add ParentName parameter if it's not null
    //         if (category.Parent_Category_Name != null)
    //         {
    //             parameters.Add("@ParentName", category.Parent_Category_Name);
    //         }
    //         else
    //         {
    //             parameters.Add("@ParentName", DBNull.Value);
    //         }

    //         // Update the existing category in the "Categories" table
    //         var success = await dbHelper.ExecuteNonQueryAsync(@"
    //         UPDATE Categories 
    //         SET name = @Name, type = @Type, parent_category_id = (SELECT category_id FROM categories WHERE name = @ParentName)
    //         WHERE name = @OldName AND type = @OldCategoryType", parameters);

    //         return Ok(true);
    //     }
    //     catch (Exception ex)
    //     {
    //         // Log the exception for debugging purposes
    //         Console.WriteLine($"Error: {ex.Message}");

    //         return BadRequest("Failed to update the category");
    //     }
    // }

    [HttpDelete("DeleteNetWorthAccount/{accountName}")]
    public async Task<IActionResult> DeleteNetWorthAccount(string accountName)
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
                        { "@AccountName", accountName },
                    };

            // Delete the category from the "Categories" table based on the CategoryName
            var success = await dbHelper.ExecuteNonQueryAsync(@"
                DELETE FROM Net_Worth_Accounts 
                WHERE name = @AccountName", parameters);

            return Ok(true);
        }
        catch (Exception ex)
        {
            // Log the exception for debugging purposes
            Console.WriteLine($"Error: {ex.Message}");

            return BadRequest("Failed to delete the account");
        }
    }

    // [HttpPost("AddAccountBalance")]
    // public async Task<IActionResult> AddAccountBalance(AccountBalance accountBalance)
    // {
    //     try
    //     {
    //         // Check if the received category is valid
    //         if (accountBalance == null)
    //         {
    //             return BadRequest("Invalid accountBalance data");
    //         }

    //         // Retrieve connection string from appsettings.json
    //         var connectionString = _configuration.GetConnectionString("DefaultConnection");

    //         // Check if connectionString is not null before using it
    //         if (connectionString == null)
    //         {
    //             return BadRequest("Connection string not found in appsettings.json");
    //         }

    //         var dbHelper = new DBHelper(connectionString);

    //         // Prepare parameters for the SQL query
    //         var parameters = new Dictionary<string, object>
    //     {
    //         { "@Name", account.Name },
    //         { "@Type", account.Type }
    //     };

    //         // Insert the new category into the "Categories" table
    //         var success = await dbHelper.ExecuteNonQueryAsync(@"INSERT INTO 
    //         Net_Worth_Accounts (name, type) 
    //         VALUES (@Name, @Type)", parameters);

    //         return Ok(true);
    //     }
    //     catch (Exception ex)
    //     {
    //         // Log the exception for debugging purposes
    //         Console.WriteLine($"Error: {ex.Message}");

    //         return BadRequest("Failed to add the account");
    //     }
    // }

}

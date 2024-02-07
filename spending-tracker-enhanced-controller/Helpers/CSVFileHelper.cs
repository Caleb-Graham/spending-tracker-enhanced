using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

public class CSVFileHelper
{
    public CSVFileHelper()
    {
    }

    public async Task<int> GetCategoryID(string categoryName, string categoryType, string connectionString)
    {
        var dbHelper = new DBHelper(connectionString);

        var query = "SELECT category_id FROM categories WHERE name = @CategoryName AND type = @CategoryType;";
        var parameters = new Dictionary<string, object>
    {
        { "CategoryName", categoryName },
        { "CategoryType", categoryType }
    };

        // Use your dbHelper to execute the query and retrieve the category ID
        int categoryId = await dbHelper.ExecuteScalarAsync<int>(query, parameters);

        return categoryId;
    }


    public string GetType(decimal number)
    {
        return (number > 0) ? "Income" : "Expense";
    }
}

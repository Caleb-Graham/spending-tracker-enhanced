using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

public class PostgresUtility
{
    private readonly string _connectionString;

    public PostgresUtility(string connectionString)
    {
        _connectionString = connectionString;
    }

    public async Task<int> ExecuteNonQueryAsync(string sql, Dictionary<string, object> parameters = null)
    {
        using (var connection = new NpgsqlConnection(_connectionString))
        {
            await connection.OpenAsync();

            using (var command = new NpgsqlCommand(sql, connection))
            {
                if (parameters != null)
                {
                    foreach (var param in parameters)
                    {
                        command.Parameters.AddWithValue(param.Key, param.Value);
                    }
                }

                return await command.ExecuteNonQueryAsync();
            }
        }
    }

    public async Task<T> ExecuteScalarAsync<T>(string sql, Dictionary<string, object> parameters = null)
    {
        using (var connection = new NpgsqlConnection(_connectionString))
        {
            await connection.OpenAsync();

            using (var command = new NpgsqlCommand(sql, connection))
            {
                if (parameters != null)
                {
                    foreach (var param in parameters)
                    {
                        command.Parameters.AddWithValue(param.Key, param.Value);
                    }
                }

                var result = await command.ExecuteScalarAsync();
                return (T)Convert.ChangeType(result, typeof(T));
            }
        }
    }

    public async Task<IEnumerable<T>> QueryAsync<T>(string sql, Dictionary<string, object> parameters = null)
    {
        var result = new List<T>();

        using (var connection = new NpgsqlConnection(_connectionString))
        {
            await connection.OpenAsync();

            using (var command = new NpgsqlCommand(sql, connection))
            {
                if (parameters != null)
                {
                    foreach (var param in parameters)
                    {
                        command.Parameters.AddWithValue(param.Key, param.Value);
                    }
                }

                using (var reader = await command.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        var item = Activator.CreateInstance<T>();
                        foreach (var property in typeof(T).GetProperties())
                        {
                            if (property.PropertyType == typeof(Guid))
                            {
                                property.SetValue(item, reader.GetGuid(reader.GetOrdinal(property.Name)));
                            }
                            else
                            {
                                property.SetValue(item, reader[property.Name] is DBNull ? null : reader[property.Name]);
                            }
                        }
                        result.Add(item);
                    }
                }
            }
        }

        return result;
    }
}

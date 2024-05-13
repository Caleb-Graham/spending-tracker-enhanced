public class Category
{
    public int Category_ID { get; set; }
    public required string Name { get; set; }
    public required string Type { get; set; }
    public int? Parent_Category_ID { get; set; }
    public string? Parent_Category_Name { get; set; }
}
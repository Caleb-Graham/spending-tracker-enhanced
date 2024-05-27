public class CategoryRequest
{
    public int Category_ID { get; set; }
    public required string Name { get; set; }
    public required string OldCategoryName { get; set; }
    public required string Type { get; set; }
    public required string OldCategoryType { get; set; }
    public string? Parent_Category_Name { get; set; }
}
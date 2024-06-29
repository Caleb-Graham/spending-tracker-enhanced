public class AccountBalance
{
    public int Account_Balance_ID { get; set; }
    public int Account_ID { get; set; }
    public required DateTime Date { get; set; }
    public required double Balance { get; set; }
}
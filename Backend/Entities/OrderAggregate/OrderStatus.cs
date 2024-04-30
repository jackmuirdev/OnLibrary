namespace Backend.Entities.OrderAggregate
{
    public enum OrderStatus
    {
        Pending,
        PaymentReceived,
        PaymentFailed,
        Shipped,
        Complete
    }
}
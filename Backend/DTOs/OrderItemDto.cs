namespace Backend.DTOs
{
    public class OrderItemDto
    {
        public int ProductId { get; set; }
        public string Title { get; set; }
        public string Image { get; set; }
        public long Price { get; set; }
        public int Quantity { get; set; }
    }
}
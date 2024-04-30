namespace Backend.DTOs
{
    public class BasketItemDto
    {
        public int ProductId { get; set; }
        public string Title { get; set; }
        public long Price { get; set; }
        public string Image { get; set; }
        public string Author { get; set; }
        public string Category { get; set; }
        public int Quantity { get; set; }
    }
}
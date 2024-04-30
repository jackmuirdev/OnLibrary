using Microsoft.EntityFrameworkCore;

namespace Backend.Entities.OrderAggregate
{
    [Owned]
    public class ProductItemOrdered
    {
        public int ProductId { get; set; }
        public string Title { get; set; }
        public string Image { get; set; }
    }
}
using System.ComponentModel.DataAnnotations;

namespace Backend.Entities.OrderAggregate
{
    public class ProductItemOrdered
    {
        [Key]
        public int ProductId { get; set; }
        public string Title { get; set; }
        public string Image { get; set; }
    }
}
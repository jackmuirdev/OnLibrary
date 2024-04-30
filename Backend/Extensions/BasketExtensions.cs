using Backend.DTOs;
using Backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Extensions
{
    public static class BasketExtensions
    {
        public static BasketDto MapBasketToDto(this Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                PaymentIntentId = basket.PaymentIntentId,
                ClientSecret = basket.ClientSecret,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Title = item.Product.Title,
                    Price = item.Product.Price,
                    Quantity = item.Quantity,
                    Image = item.Product.Image,
                    Author = item.Product.Author,
                    Category = item.Product.Category
                }).ToList()
            };
        }

        public static IQueryable<Basket> RetrieveBasketWithItems(this IQueryable<Basket> query, string buyerId)
        {
            return query.Include(i => i.Items).ThenInclude(p => p.Product).Where(x => x.BuyerId == buyerId);
        }
    }
}
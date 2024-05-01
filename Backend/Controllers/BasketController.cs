using Backend.Data;
using Backend.DTOs;
using Backend.Entities;
using Backend.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly ILogger<BasketController> _logger; // Inject ILogger

        public BasketController(StoreContext context, ILogger<BasketController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket(GetBuyerId());

            if (basket == null)
            {
                _logger.LogWarning("Basket not found for buyer: {BuyerId}", GetBuyerId());
                return NotFound();
            }

            return basket.MapBasketToDto();
        }

        [HttpPost]
        public async Task<ActionResult> AddItemToBasket(int productId, int quantity = 1)
        {
            _logger.LogInformation("AddItemToBasket method called."); // Log method entry
            
            try
            {
                var basket = await RetrieveBasket(GetBuyerId());
                
                if (basket == null)
                {
                    _logger.LogInformation("Basket not found. Creating new basket.");
                    basket = CreateBasket();
                }
                else
                {
                    _logger.LogInformation("Basket found.");
                }

                var product = await _context.Products.FindAsync(productId);

                if (product == null)
                {
                    _logger.LogWarning("Product not found with ID: {ProductId}", productId);
                    return BadRequest(new ProblemDetails { Title = "Product not found" });
                }

                _logger.LogInformation("Adding item to basket.");

                basket.AddItem(product, quantity);

                var result = await _context.SaveChangesAsync() > 0;

                if (result)
                {
                    _logger.LogInformation("Item added to basket successfully.");
                    return CreatedAtRoute("GetBasket", basket.MapBasketToDto());
                }
                else
                {
                    _logger.LogError("Failed to save changes to database.");
                    return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while adding item to basket.");
                return StatusCode(500, new ProblemDetails { Title = "Internal Server Error" });
            }
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity = 1)
        {
            var basket = await RetrieveBasket(GetBuyerId());

            if (basket == null)
            {
                _logger.LogWarning("Basket not found for buyer: {BuyerId}", GetBuyerId());
                return NotFound();
            }

            basket.RemoveItem(productId, quantity);

            var result = await _context.SaveChangesAsync() > 0;

            if (result)
            {
                _logger.LogInformation("Item removed from basket successfully.");
                return Ok();
            }
            else
            {
                _logger.LogError("Failed to save changes to database.");
                return BadRequest(new ProblemDetails { Title = "Problem removing item from the basket" });
            }
        }

        private async Task<Basket> RetrieveBasket(string buyerId)
        {
            if (string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("buyerId");
                return null;
            }

            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(basket => basket.BuyerId == buyerId);
        }

        private string GetBuyerId()
        {
            return User.Identity?.Name ?? Request.Cookies["buyerId"];
        }

        private Basket CreateBasket()
        {
            var buyerId = User.Identity?.Name;
            if (string.IsNullOrEmpty(buyerId))
            {
                buyerId = Guid.NewGuid().ToString();
                var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
                Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            }

            var basket = new Basket { BuyerId = buyerId };
            _context.Baskets.Add(basket);
            return basket;
        }
    }
}

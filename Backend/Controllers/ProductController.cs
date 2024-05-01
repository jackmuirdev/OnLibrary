using Backend.Data;
using Backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using Backend.DTOs;
using Backend.Services;

namespace Backend.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;
        public ProductsController(StoreContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            var products = await _context.Products.ToListAsync();
            return products;
        }

        [HttpGet("{id}", Name = "GetProduct")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null) return NotFound();

            return product;
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands = await _context.Products.Select(p => p.Author).Distinct().ToListAsync();
            var categories = await _context.Products.Select(p => p.Category).Distinct().ToListAsync();

            return Ok(new { brands, categories });
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct([FromForm] CreateProductDto productDto)
        {
            var product = _mapper.Map<Product>(productDto);

            _context.Products.Add(product);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtAction("GetProduct", new { Id = product.Id }, product);

            return BadRequest(new ProblemDetails { Title = "Problem creating product" });
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult<Product>> UpdateProduct(int id, [FromForm] UpdateProductDto productDto)
        {
            if (id != productDto.Id)
            {
                return BadRequest();
            }

            var product = await _context.Products.FindAsync(id);

            if (product == null) return NotFound();

            _mapper.Map(productDto, product);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok(product);

            return BadRequest(new ProblemDetails { Title = "Problem updating product" });
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null) return NotFound();

            _context.Products.Remove(product);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem deleting product" });
        }
    }
}

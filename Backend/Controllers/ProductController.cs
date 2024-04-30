using Backend.Data;
using Backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Extensions;
using Backend.RequestHelpers;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using Backend.DTOs;
using Backend.Services;

namespace Backend.Controllers;
public class ProductsController : BaseApiController
{
    private readonly StoreContext _context;
    private readonly IMapper _mapper;
    private readonly ImageService _imageService;
    public ProductsController(StoreContext context, IMapper mapper, ImageService imageService)
    {
        _context = context;
        _mapper = mapper;
        _imageService = imageService;
    }

    [HttpGet]
    public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery]ProductParams productParams)
    {
        var query = _context.Products
            .Sort(productParams.OrderBy)
            .Search(productParams.SearchTerm)
            .Filter(productParams.Authors, productParams.Categories)
            .AsQueryable();

        var products = await PagedList<Product>.ToPagedList(query,
            productParams.PageNumber, productParams.PageSize);

        Response.AddPaginationHeader(products.MetaData);

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

        return Ok(new {brands, categories});
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<Product>> CreateProduct([FromForm]CreateProductDto productDto)
    {
        var product = _mapper.Map<Product>(productDto);

        if (productDto.File != null)
        {
            var imageResult = await _imageService.AddImageAsync(productDto.File);

            if (imageResult.Error != null) return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });

            product.Image = imageResult.SecureUrl.ToString();

        }

        _context.Products.Add(product);

        var result = await _context.SaveChangesAsync() > 0;

        if (result) return CreatedAtAction("GetProduct", new { Id = product.Id }, product);

        return BadRequest(new ProblemDetails { Title = "Problem creating product" });
    }

    [Authorize(Roles = "Admin")]
    [HttpPut]
    public async Task<ActionResult<Product>> UpdateProduct([FromForm]UpdateProductDto productDto)
    {
        var product = await _context.Products.FindAsync(productDto.Id);

        if (product == null) return NotFound();

        _mapper.Map(productDto, product);

        if (productDto.File != null)
        {
            var imageResult = await _imageService.AddImageAsync(productDto.File);

            if (imageResult.Error != null) return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });

            product.Image = imageResult.SecureUrl.ToString();
        }

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
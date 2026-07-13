
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using SQLitePCL;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
       readonly IGenericRepository<Product> _productsRepo;
       readonly IGenericRepository<ProductBrand> _productsBrandRepo;

       readonly IGenericRepository<ProductType> _productsTypeRepo;

        public ProductsController(
            IGenericRepository<Product> productsRepo,
            IGenericRepository<ProductBrand> productsBrandRepo,
            IGenericRepository<ProductType> productsTypeRepo
            )
        {
            _productsRepo = productsRepo;
            _productsBrandRepo = productsBrandRepo;
            _productsTypeRepo = productsTypeRepo;
           
        }


        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Product>>> GetProducts()
        {
            var products = await _productsRepo.ListAllAsync();
            return Ok(products);
        }



        [HttpGet("{id}")]

        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _productsRepo.GetByIdAsync(id);

            if(product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }


        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
        {
            var brands = await _productsBrandRepo.ListAllAsync();
            return Ok(brands);
        }



        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
        {
            var types = await _productsTypeRepo.ListAllAsync();
            return Ok(types);
        }









    }

}
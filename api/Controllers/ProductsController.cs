
using System.ComponentModel;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;
using ski_net_demo.Controllers;
using ski_net_demo.Dtos;
using SQLitePCL;

namespace api.Controllers
{
    public class ProductsController : BaseApiController
    {
       readonly IGenericRepository<Product> _productsRepo;
       readonly IGenericRepository<ProductBrand> _productsBrandRepo;

       readonly IGenericRepository<ProductType> _productsTypeRepo;

       readonly IMapper _mapper;

        public ProductsController(
            IGenericRepository<Product> productsRepo,
            IGenericRepository<ProductBrand> productsBrandRepo,
            IGenericRepository<ProductType> productsTypeRepo,
            IMapper mapper
            )
        {
            _productsRepo = productsRepo;
            _productsBrandRepo = productsBrandRepo;
            _productsTypeRepo = productsTypeRepo;
            _mapper = mapper;

           
        }


        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Product>>> GetProducts()
        {
            var spec = new ProductsWithTypesAndBrandsSpecification();
            var products = await _productsRepo.ListAsync(spec);
            var mappedProductsToDto =  _mapper.Map<IReadOnlyList<ProductToReturnDto>>(products);
            return Ok(mappedProductsToDto);
        }



        [HttpGet("{id}")]

        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(id);
            var product = await _productsRepo.GetEntityWithSpec(spec);

            if(product == null)
            {
                return NotFound();
            }

            return new ProductToReturnDto
            {
                 
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                PictureUrl = product.PictureUrl,
                Price = product.Price,
                ProductBrand = product.ProductBrand?.Name,  
                ProductType = product.ProductType?.Name,

            };
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
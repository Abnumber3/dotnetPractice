using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ski_net_demo.Controllers
{
    public class BasketController : BaseApiController
    {
        readonly IBasketRepository _basketRepository;
        public BasketController(IBasketRepository basketRepository)
        {
            _basketRepository = basketRepository;
        }


    // Get basket and and create one if it doesnt exist but it does not store new one in redis
        [HttpGet("{basketId}")]
        public async Task<ActionResult<CustomerBasket>> GetBasketById(string basketId)
        {
            var basket = await _basketRepository.GetBasketAsync(basketId);

           return Ok(basket ?? new CustomerBasket(basketId));
        }


        [HttpPost]
        public async Task<ActionResult<CustomerBasket>> UpdateBasket(CustomerBasket basket)
        {
            var updatedBasket = await _basketRepository.UpdateOrCreateBasketAsync(basket);

            return Ok(updatedBasket);

            //updated
        }


        


        [HttpDelete("{basketId}")]

        public async Task<IActionResult> DeleteBasket(string basketId)
        {
            var deleted = await _basketRepository.DeleteBasketAsync(basketId);

            if (!deleted) return NotFound();

            return NoContent();
        }






    }
}
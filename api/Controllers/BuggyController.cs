using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using ski_net_demo.Errors;

namespace ski_net_demo.Controllers
{

    
    public class BuggyController : BaseApiController
    {
        private readonly StoreContext _context;
        public BuggyController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet("notfound")]
        public ActionResult GetNotFoundRequest()
        {
            var thing = _context.Products.Find(123);

            if(thing == null)
            {
                return NotFound(new ApiResponse(404));
            }
            return Ok();
        }


          [HttpGet("servererror")]
        public ActionResult GetServerError()
        {
            var thing = _context.Products.Find(123);

            var thingToReturn = thing!.ToString();

            return Ok(thingToReturn);
        }



          [HttpGet("badrequest")]
        public ActionResult GetBadRequest()
        {
            return BadRequest();
        }



          [HttpGet("badrequest/{id}")]
        public ActionResult GetNotFoundRequest(int id)
        {
            return Ok();
        }
        
        
    }
}
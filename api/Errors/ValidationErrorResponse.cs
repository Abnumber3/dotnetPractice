using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ski_net_demo.Errors
{
    public class ValidationErrorResponse : ApiResponse
    {
        public ValidationErrorResponse() : base(400)
        {
        }

        public IEnumerable<string>? Errors { get; set; } 
    }
}
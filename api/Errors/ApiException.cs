using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ski_net_demo.Errors
{
    public class ApiException : ApiResponse
    {
        public ApiException(int statusCode, string? message = null, string? details = null) : base(statusCode, message)
        {
            Details = details; 
        }

        public string? Details { get; set; }
    }
}
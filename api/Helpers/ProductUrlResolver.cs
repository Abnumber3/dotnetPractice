using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Core.Entities;
using ski_net_demo.Dtos;

namespace ski_net_demo.Helpers
{
    public class ProductUrlResolver : IValueResolver<Product, ProductToReturnDto, string?>
    {
        public IConfiguration _config;

        public ProductUrlResolver(IConfiguration config)
        {
            _config = config;
            
        }
        public string? Resolve(Product source, ProductToReturnDto destination, string? destMember, ResolutionContext context)
        {
            if(!string.IsNullOrEmpty(source.PictureUrl))
            {
                return _config["ApiUrl"] + source.PictureUrl;
            }

            return null;
        }
    }
}
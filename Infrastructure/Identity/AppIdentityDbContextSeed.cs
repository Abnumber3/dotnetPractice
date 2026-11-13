using System;

using System.Collections.Generic;

using System.ComponentModel;

using System.Linq;

using System.Threading.Tasks;

using Core.Entities.Identity;

using Microsoft.AspNetCore.Identity;



namespace Infrastructure.Identity

{

    public class AppIdentityDbContextSeed

    {

        public static async Task SeedUserAsync(UserManager<AppUser> userManager)

        {

            if (!userManager.Users.Any())

            {

                var defaultUser = new AppUser

                {

                    DisplayName = "Bob",

                    Email = "bob@test.com",

                    UserName = "Bobyman4",

                    Address = new Address

                    {

                        FirstName = "Bob",

                        LastName = "Bobby",

                        Street = "123 Main St",

                        City = "New York",

                        State = "NY",

                        Zipcode = "10001"

                    }



                };



                var result = await userManager.CreateAsync(defaultUser, "Pa$$w0rd");

                if (!result.Succeeded)
                {
                    var errors = string.Join(", ",
                        result.Errors.Select(e => e.Description));

                    throw new Exception($"User seeding failed: {errors}");
                }



            }

        }

    }

}
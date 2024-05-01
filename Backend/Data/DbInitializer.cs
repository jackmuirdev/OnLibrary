using Backend.Entities;
using Microsoft.AspNetCore.Identity;

namespace Backend.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(StoreContext context, UserManager<User> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new User
                {
                    UserName = "Bob",
                    Email = "bob@test.com"
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Member");

                var admin = new User
                {
                    UserName = "Admin",
                    Email = "admin@test.com"
                };

                await userManager.CreateAsync(admin, "Pa$$w0rd");
                await userManager.AddToRolesAsync(admin, new[] {"Admin", "Member"});
            }

            if (context.Products.Any()) return;

            var products = new List<Product>
            {
                new Product
                {
                    Id = 1,
                    Title = "The Great Gatsby",
                    Description =
                        "The Great Gatsby, F. Scott Fitzgerald's third book, stands as the supreme achievement of his career. This exemplary novel of the Jazz Age has been acclaimed by generations of readers.",
                    Price = 1500,
                    Image = "/images/book-gatsby.png",
                    Pdf = "/pdf/book-gatsby.pdf",
                    Author = "Scribner",
                    Category = "Books"
                },
                new Product
                {
                    Id = 2,
                    Title = "To Kill a Mockingbird",
                    Description =
                        "To Kill a Mockingbird is a novel by Harper Lee published in 1960. It was immediately successful, winning the Pulitzer Prize, and has become a classic of modern American literature.",
                    Price = 1200,
                    Image = "/images/book-mockingbird.png",
                    Pdf = "/pdf/book-mockingbird.pdf",
                    Author = "J. B. Lippincott & Co.",
                    Category = "Books"
                },
                new Product
                {
                    Id = 3,
                    Title = "1984",
                    Description =
                        "1984 is a dystopian novel by George Orwell published in 1949. The novel is set in Airstrip One, a province of the superstate Oceania, in a world of perpetual war, omnipresent government surveillance, and public manipulation.",
                    Price = 1100,
                    Image = "/images/book-1984.png",
                    Pdf = "/pdf/book-1984.pdf",
                    Author = "Secker & Warburg",
                    Category = "Books"
                },
                new Product
                {
                    Id = 4,
                    Title = "Pride and Prejudice",
                    Description =
                        "Pride and Prejudice is a romantic novel of manners written by Jane Austen in 1813. The novel follows the character development of Elizabeth Bennet, the dynamic protagonist of the book.",
                    Price = 1000,
                    Image = "/images/book-prideprejudice.png",
                    Pdf = "/pdf/book-prideprejudice.pdf",
                    Author = "Jane Austen",
                    Category = "Books"
                },
                new Product
                {
                    Id = 5,
                    Title = "The Catcher in the Rye",
                    Description =
                        "The Catcher in the Rye is a novel by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951. A classic novel originally published for adults, it has since become popular with adolescent readers for its themes of teenage angst and alienation.",
                    Price = 1300,
                    Image = "/images/book-catcherintherye.png",
                    Pdf = "/pdf/book-catcherintherye.pdf",
                    Author = "J. D. Salinger",
                    Category = "Books"
                },
                new Product
                {
                    Id = 6,
                    Title = "The Lord of the Rings",
                    Description =
                        "The Lord of the Rings is an epic high-fantasy novel by English author and scholar J. R. R. Tolkien. Set in Middle-earth, the world at some distant time in the past, the story began as a sequel to Tolkien's 1937 children's book The Hobbit.",
                    Price = 2000,
                    Image = "/images/book-lordoftherings.png",
                    Pdf = "/pdf/book-lordoftherings.pdf",
                    Author = "J. R. R. Tolkien",
                    Category = "Books"
                },
            };

            foreach (var product in products)
            {
                context.Products.Add(product);
            }

            context.SaveChanges();
        }
    }
}

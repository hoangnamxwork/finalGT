using FinalGTAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace FinalGTAPI.Data
{
    public class FinalGTDbContext : DbContext
    {
        public FinalGTDbContext(DbContextOptions<FinalGTDbContext> options) : base(options)
            { }

        public DbSet<UserModel> Users { get; set; }

        public DbSet<QuizModel> Quizes { get; set; }
    }
}

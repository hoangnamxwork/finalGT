using FinalGTAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace FinalGTAPI.Data
{
    public class FinalGTDbContext : DbContext
    {
        public FinalGTDbContext(DbContextOptions<FinalGTDbContext> options) : base(options)
            { }

        public DbSet<User> Users { get; set; }

        public DbSet<Quiz> Quizes { get; set; }

        public DbSet<Subject> Subjects { get; set; }

        public DbSet<Result> Results { get; set; }

        public DbSet<TestResult> TestResults { get; set; }

        public DbSet<QuizDifficulty> QuizDifficulties { get; set; }
    }
}

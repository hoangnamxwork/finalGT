using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FinalGTAPI.Models
{
    public class User
    {
        [Key]
        public int UserID { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        [EmailAddress]
        public string? Email { get; set; }

        public string? UserName { get; set; }

        public string? Password { get; set; }

        public string? Role { get; set; } = "Student";

        public string? Token { get; set; }

        public Result? Result { get; set; }

        public List<TestResult>? TestResults { get; set; }
    }
}

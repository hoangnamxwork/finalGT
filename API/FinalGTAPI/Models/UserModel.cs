using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinalGTAPI.Models
{
    [Table("User")]
    public class UserModel
    {
        [Key]
        public int UserID { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }

        public string FullName { get; set; } = string.Empty;

        public string Gender { get; set; }

        public int Age { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }


    }
}

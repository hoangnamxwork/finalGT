using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace FinalGTAPI.Models
{
    [Table("Result")]
    public class Result
    {
        [Key]
        public int ResultID { get; set; }

        public double AvgScore { get; set; } = 0;

        public int UserID { get; set; }

        [JsonIgnore]
        public User? User { get; set; }
    
        public List<Subject>? Subjects { get; set; }
    }
}

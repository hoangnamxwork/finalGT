using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FinalGTAPI.Models
{
    public class TestResult
    {
        [Key]
        public int TestID { get; set; }

        public DateTime DateTest { get; set; }

        public double TestScore { get; set; }

        public int UserID { get; set; }

        [JsonIgnore]        
        public User? User { get; set; }

        public int SubjectID { get; set; }

        [JsonIgnore]
        public Subject? Subject { get; set; }
    }
}

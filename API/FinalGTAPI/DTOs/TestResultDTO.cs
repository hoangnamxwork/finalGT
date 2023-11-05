using System.ComponentModel.DataAnnotations;

namespace FinalGTAPI.DTOs
{
    public class TestResultDTO
    {
        [Key]
        public int TestID { get; set; }

        public DateTime DateTest { get; set; }

        public double TestScore { get; set; }

        public int UserID { get; set; }

        public int SubjectID { get; set; }
    }
}

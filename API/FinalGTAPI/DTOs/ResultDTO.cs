using System.ComponentModel.DataAnnotations;

namespace FinalGTAPI.DTOs
{
    public class ResultDTO
    {
        [Key]
        public int ResultID { get; set; }

        public double AvgScore { get; set; } = 0;

        public double highestScore { get; set; } = 0;

        public int testMade { get; set; } = 0;

        public int UserID { get; set; }

        public int SubjectID { get; set; }
    }
}

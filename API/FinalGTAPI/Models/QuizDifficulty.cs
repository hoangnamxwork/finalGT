using System.ComponentModel.DataAnnotations;

namespace FinalGTAPI.Models
{
    public class QuizDifficulty
    {
        [Key]

        public int QuizDiffId { get; set; }

        public string QuizDiff { get; set; }
    }
}

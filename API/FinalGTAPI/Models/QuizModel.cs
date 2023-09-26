using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinalGTAPI.Models
{
    [Table("Quiz")]
    public class QuizModel
    {
        [Key]
        public int QuizID { get; set; }

        public string QuizContent { get; set; }

        public string? QuizImage { get; set; }

        public int Option1 { get; set; }

        public int Option2 { get; set; }

        public int Option3 { get; set; }

        public int Option4 { get; set; }

        public int Answer { get ; set; }
    }
}

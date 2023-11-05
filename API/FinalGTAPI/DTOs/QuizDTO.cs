using System.ComponentModel.DataAnnotations;

namespace FinalGTAPI.DTOs
{
    public class QuizDTO
    {
        [Key]
        public int QuizID { get; set; }

        public string? QuizContent { get; set; }

        public string? Option1 { get; set; }

        public string? Option2 { get; set; }

        public string? Option3 { get; set; }

        public string? Option4 { get; set; }

        public int Answer { get; set; }

        public int SubjectID { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinalGTAPI.DTOs
{
    public class QuizDTO
    {
        [Key]
        public int QuizID { get; set; }

        public string? QuizContent { get; set; }

        public int? QuizDiffId { get; set; }

        public string? Option1 { get; set; }

        public string? Option2 { get; set; }

        public string? Option3 { get; set; }

        public string? Option4 { get; set; }

        public int? Answer { get; set; }

        public int? SubjectID { get; set; }

        public DateTime quizCreatedAt { get; set; } 

        public DateTime quizUpdatedAt { get; set; }
    }
}

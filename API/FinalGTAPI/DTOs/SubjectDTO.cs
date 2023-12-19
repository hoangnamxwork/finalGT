using System.ComponentModel.DataAnnotations;

namespace FinalGTAPI.DTOs
{
    public class SubjectDTO
    {
        [Key]
        public int SubjectID { get; set; }

        public string SubjectName { get; set; }
    }
}

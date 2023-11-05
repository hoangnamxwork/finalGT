using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinalGTAPI.Models
{
    public class Subject
    {
        [Key]
        public int SubjectID { get; set; }

        public string? SubjectName { get; set; }

        [JsonIgnore]
        public List<Quiz>? Quiz { get; set; }

        [JsonIgnore]
        public List<TestResult>? TestResults { get; set; }

        public int? ResultID { get; set; }

        [JsonIgnore]
        public Result? Result { get; set; }

    }
}

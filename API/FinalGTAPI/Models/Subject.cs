using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinalGTAPI.Models
{
    public class Subject
    {
        [Key]
        public int SubjectID { get; set; }

        public string SubjectName { get; set; }

        [JsonIgnore]
        public List<Quiz>? Quiz { get; set; }

        [JsonIgnore]
        public List<TestResult>? TestResults { get; set; }

        [JsonIgnore]
        public List<Result>? Result { get; set; }

    }
}

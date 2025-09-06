using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QuestionAPI.models
{
    public class QuestionPapers
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string InstituteName { get; set; }
        public string CourseName { get; set; }
        public string ExamName { get; set; }
        public string ModuleName { get; set; }
        public string TechnologyName { get; set; }
        public string SubjectName { get; set; }
        public string SubjectCode { get; set; }
        public string Duration { get; set; }
        public string FullMarks { get; set; }
        public string Notes { get; set; }


        public ICollection<QuestionSections>? QuestionSections {  get; set; }
        

    }
}
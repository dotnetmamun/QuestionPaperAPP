using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.Extensions.Options;

namespace QuestionAPI.models
{
    public class QuestionSections
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [ForeignKey(nameof(QuestionPaper))]
        public int QuestionPaperId { get; set; }
        public string SectionName { get; set; }
        public int RequiredQts { get; set; }
        public double MarksPerQts { get; set; }
        public ICollection<Questions>? Questions { get; set; }

        public QuestionPapers? QuestionPaper { get; set; }


    }
}

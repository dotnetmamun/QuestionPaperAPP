using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QuestionAPI.models
{
    public class Questions
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [ForeignKey(nameof(QuestionSections))]
        public int QuestionSectionId { get; set; }
        [Required]
        public string QuestionName {  get; set; }


        
        public QuestionSections? QuestionSections { get; set; }
    }
}
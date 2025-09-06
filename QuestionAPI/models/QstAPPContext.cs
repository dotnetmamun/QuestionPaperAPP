using Microsoft.EntityFrameworkCore;

namespace QuestionAPI.models
{
    public class QstAPPContext: DbContext
    {
        public QstAPPContext(DbContextOptions<QstAPPContext> options)
            : base(options)
        {
        }

        
        public DbSet<QuestionPapers> QuestionPapers { get; set; } = default!;
        public DbSet<Questions> Questions { get; set; } = default!;
        public DbSet<QuestionSections> QuestionSections { get; set; } = default!;
    }
}

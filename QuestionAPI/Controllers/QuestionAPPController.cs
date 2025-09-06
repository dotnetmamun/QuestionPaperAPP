using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuestionAPI.models;

namespace QuestionAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class QuestionAPPController : ControllerBase
    {
        private readonly QstAPPContext _context;

        public QuestionAPPController(QstAPPContext context)
        {
            _context = context;
        }

        // GET: QuestionAPP
        [HttpGet]
        public async Task<ActionResult<IEnumerable<QuestionPapers>>> GetQuestionPapers()
        {
            return await _context.QuestionPapers.Include(qp => qp.QuestionSections).ThenInclude(qs => qs.Questions).ToListAsync();
        }

        // GET: QuestionAPP/5
        [HttpGet("{id}")]
        public async Task<ActionResult<QuestionPapers>> GetQuestionPapers(int id)
        {
            var questionPapers = await _context.QuestionPapers.Include(qp => qp.QuestionSections)
        .ThenInclude(qs => qs.Questions)
    .FirstOrDefaultAsync(qp => qp.Id == id);

            if (questionPapers == null)
            {
                return NotFound();
            }

            return questionPapers;
        }

        // PUT: QuestionAPP/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuestionPaper(int id, QuestionPapers questionPaper)
        {
            if (id != questionPaper.Id)
            {
                return BadRequest();
            }

            var existingPaper = await _context.QuestionPapers
                .Include(qp => qp.QuestionSections)
                    .ThenInclude(qs => qs.Questions)
                .FirstOrDefaultAsync(qp => qp.Id == id);

            if (existingPaper == null)
            {
                return NotFound();
            }

            // Update main fields
            _context.Entry(existingPaper).CurrentValues.SetValues(questionPaper);

            // --- Update Sections ---
            // Remove deleted sections
            foreach (var existingSection in existingPaper.QuestionSections.ToList())
            {
                if (!questionPaper.QuestionSections.Any(s => s.Id == existingSection.Id))
                {
                    _context.QuestionSections.Remove(existingSection);
                }
            }

            foreach (var section in questionPaper.QuestionSections)
            {
                var existingSection = existingPaper.QuestionSections
                    .FirstOrDefault(s => s.Id == section.Id);

                if (existingSection != null)
                {
                    // Update section fields
                    _context.Entry(existingSection).CurrentValues.SetValues(section);

                    // --- Update Questions inside section ---
                    foreach (var existingQuestion in existingSection.Questions.ToList())
                    {
                        if (!section.Questions.Any(q => q.Id == existingQuestion.Id))
                        {
                            _context.Questions.Remove(existingQuestion);
                        }
                    }

                    foreach (var question in section.Questions)
                    {
                        var existingQuestion = existingSection.Questions
                            .FirstOrDefault(q => q.Id == question.Id);

                        if (existingQuestion != null)
                        {
                            _context.Entry(existingQuestion).CurrentValues.SetValues(question);
                        }
                        else
                        {
                            existingSection.Questions.Add(question);
                        }
                    }
                }
                else
                {
                    // New section
                    existingPaper.QuestionSections.Add(section);
                }
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: QuestionAPP
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<QuestionPapers>> PostQuestionPaper(QuestionPapers questionPaper)
        {
            if (questionPaper.QuestionSections != null)
            {
                foreach (var section in questionPaper.QuestionSections)
                {
                    if (section.Questions != null)
                    {
                        foreach (var question in section.Questions)
                        {
                            question.QuestionSections = null; // Avoid circular reference
                        }
                    }
                }
            }

            _context.QuestionPapers.Add(questionPaper);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetQuestionPapers), new { id = questionPaper.Id }, questionPaper);
        }


        // DELETE: QuestionAPP/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestionPaper(int id)
        {
            var questionPaper = await _context.QuestionPapers
                .Include(qp => qp.QuestionSections)
                    .ThenInclude(qs => qs.Questions)
                .FirstOrDefaultAsync(qp => qp.Id == id);

            if (questionPaper == null)
            {
                return NotFound();
            }

            _context.QuestionPapers.Remove(questionPaper);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool QuestionPapersExists(int id)
        {
            return _context.QuestionPapers.Any(e => e.Id == id);
        }
    }
}

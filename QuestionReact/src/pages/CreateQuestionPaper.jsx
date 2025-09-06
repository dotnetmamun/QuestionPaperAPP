import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CreateQuestionPaper() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    instituteName: '',
    courseName: '',
    examName: '',
    moduleName: '',
    technologyName: '',
    subjectName: '',
    subjectCode: '',
    duration: '',
    fullMarks: '',
    notes: '',
    questionSections: []
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleAddSection = () => {
    setForm(prev => ({
      ...prev,
      questionSections: [...prev.questionSections, { sectionName: '', requiredQts: '', marksPerQts: '', questions: [] }]
    }))
  }

  const handleSectionChange = (index, e) => {
    const { name, value } = e.target
    const sections = [...form.questionSections]
    sections[index][name] = value
    setForm(prev => ({ ...prev, questionSections: sections }))
  }

  const handleRemoveSection = (index) => {
    const sections = [...form.questionSections]
    sections.splice(index, 1)
    setForm(prev => ({ ...prev, questionSections: sections }))
  }

  const handleAddQuestion = (sectionIndex) => {
    const sections = [...form.questionSections]
    sections[sectionIndex].questions.push({ questionName: '' })
    setForm(prev => ({ ...prev, questionSections: sections }))
  }

  const handleQuestionChange = (sectionIndex, questionIndex, e) => {
    const sections = [...form.questionSections]
    sections[sectionIndex].questions[questionIndex].questionName = e.target.value
    setForm(prev => ({ ...prev, questionSections: sections }))
  }

  const handleRemoveQuestion = (sectionIndex, questionIndex) => {
    const sections = [...form.questionSections]
    sections[sectionIndex].questions.splice(questionIndex, 1)
    setForm(prev => ({ ...prev, questionSections: sections }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('https://localhost:7243/QuestionAPP', form)
      .then(() => {
        navigate('/')
      })
      .catch(error => {
        console.error(error)
        alert('Failed to create question paper!')
      })
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Create Question Paper</h1>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Master Fields */}
        <div className="grid grid-cols-2 gap-4">
          {['name', 'instituteName', 'courseName', 'examName', 'moduleName', 'technologyName', 'subjectName', 'subjectCode', 'duration', 'fullMarks', 'notes'].map(field => (
            <input
              key={field}
              type="text"
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="border p-2 rounded w-full"
              required
            />
          ))}
        </div>

        {/* Sections */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Sections</h2>
          {form.questionSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="border rounded p-4 mb-6 bg-gray-50">
              <div className="flex gap-4 mb-4">
                <input
                  type="text"
                  name="sectionName"
                  value={section.sectionName}
                  onChange={(e) => handleSectionChange(sectionIndex, e)}
                  placeholder="Section Name"
                  className="border p-2 rounded flex-1"
                  required
                />
                <input
                  type="number"
                  name="requiredQts"
                  value={section.requiredQts}
                  onChange={(e) => handleSectionChange(sectionIndex, e)}
                  placeholder="Required Qts"
                  className="border p-2 rounded w-32"
                  required
                />
                <input
                  type="number"
                  step="0.01"
                  name="marksPerQts"
                  value={section.marksPerQts}
                  onChange={(e) => handleSectionChange(sectionIndex, e)}
                  placeholder="Marks per Qts"
                  className="border p-2 rounded w-32"
                  required
                />
                <button type="button" onClick={() => handleRemoveSection(sectionIndex)} className="text-red-500 font-bold text-lg">×</button>
              </div>

              {/* Questions inside this Section */}
              <div className="pl-4">
                <h3 className="text-lg font-semibold mb-2">Questions</h3>
                {section.questions.map((q, questionIndex) => (
                  <div key={questionIndex} className="flex gap-2 mb-2 items-center">
                    <input
                      type="text"
                      value={q.questionName}
                      onChange={(e) => handleQuestionChange(sectionIndex, questionIndex, e)}
                      placeholder="Question Name"
                      className="border p-2 rounded flex-1"
                      required
                    />
                    <button type="button" onClick={() => handleRemoveQuestion(sectionIndex, questionIndex)} className="text-red-500 font-bold text-lg">×</button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddQuestion(sectionIndex)}
                  className="bg-green-500 text-white px-3 py-1 rounded mt-2"
                >
                  + Add Question
                </button>
              </div>
            </div>
          ))}
          <button type="button" onClick={handleAddSection} className="bg-blue-600 text-white px-4 py-2 rounded">
            + Add Section
          </button>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="bg-purple-700 hover:bg-purple-800 text-white font-semibold px-6 py-3 rounded-lg">
            Submit
          </button>
        </div>

      </form>
    </div>
  )
}

export default CreateQuestionPaper

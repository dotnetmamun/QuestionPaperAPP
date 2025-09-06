import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function QuestionPaperDetail() {
  const { id } = useParams()
  const [paper, setPaper] = useState(null)

  useEffect(() => {
    axios.get(`https://localhost:7243/QuestionAPP/${id}`) // adjust your API
      .then(response => setPaper(response.data))
      .catch(error => console.error(error))
  }, [id])

  const handlePrint = () => {
    window.print()
  }

  if (!paper) return <div className="text-center">Loading...</div>

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Link to="/" className="text-blue-500 underline mb-4 block">← Back to list</Link>
      <span className="btn p-3 rounded-lg bg-gray-100 cursor-pointer" onClick={handlePrint}>
        Download
      </span>

      
      <div className="mb-6 text-center">
        <h2 className="text-center text-2xl">{paper.instituteName}</h2>
        <p><strong>{paper.courseName}</strong> </p>
        <p><strong>{paper.examName}</strong> </p>
        <p><strong>{paper.moduleName}</strong> </p>
        <p><strong>{paper.technologyName}</strong> </p>
      </div>

      <div className="m-2">
        <div className="text-left inline">
            Subject: {paper.subjectName} <br />
            Duration: {paper.duration} hrs
        </div>
        <div className="text-right inline float-right">
            Code: {paper.subjectCode} <br />
            FullMarks: {paper.fullMarks}
        </div>
      </div>

      <div className="notes">
        <h3 className="text-center">
            
                {paper.notes}
            
        </h3>
      </div>

      {/* Sections */}
      <div className="mb-6">
        
        {paper.questionSections?.map(section => (
          <>
            <div key={section.id} className="mb-4 p-3  rounded">
                <h2 className="text-xl font-semibold mb-2 text-center">
                    {section.sectionName} ({section.marksPerQts} x {section.requiredQts} = {section.marksPerQts*section.requiredQts})
                </h2>
                
            </div>
            {/* Questions */}
            <div>
                
                {section.questions?.map(q => (
                <div key={q.id} className="p-2 ">
                    {q.questionName}
                </div>
                ))}
            </div>
          </>
        ))}
      </div>

      
    </div>
  )
}

export default QuestionPaperDetail

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function QuestionPaperList() {
  const [papers, setPapers] = useState([])

  useEffect(() => {
    axios.get('https://localhost:7243/QuestionAPP') // adjust your API
      .then(response => setPapers(response.data))
      .catch(error => console.error(error))
  }, [])

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Question Papers</h1>
      <div className="grid gap-4">
        {papers.map(paper => (
          <Link to={`/questionpaper/${paper.id}`} key={paper.id} className="block p-4 bg-white shadow-md rounded hover:bg-gray-100 transition">
            <h2 className="text-xl font-semibold">{paper.name}</h2>
            <p className="text-gray-500">{paper.examName}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default QuestionPaperList

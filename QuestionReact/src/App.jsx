


import { Routes, Route } from 'react-router-dom'
import QuestionPaperList from './pages/QuestionPaperList'
import QuestionPaperDetail from './pages/QuestionPaperDetail'
import CreateQuestionPaper from './pages/CreateQuestionPaper'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<QuestionPaperList />} />
          <Route path="/questionpaper/:id" element={<QuestionPaperDetail />} />
          <Route path="/create" element={<CreateQuestionPaper />} />
        </Routes>
      </div>
    </>
  )
}

export default App


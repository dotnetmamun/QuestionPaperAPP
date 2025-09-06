# 📚 Academic Question Paper Management System

## 📖 Overview
This project is a **full-stack application** that enables **academic institutions** to create, manage, and generate question papers digitally. The backend is built using **ASP.NET Core Web API**, and the frontend is developed with **React** to consume the API endpoints.

This system simplifies the question paper creation process by providing a question management interface and paper generation functionality.

---

## ✨ Features
### **Backend (ASP.NET Core Web API)**
- Simple and lightweight API design.
- Manage **courses**, **subjects**, and **questions**.
- CRUD operations for question management.
- Single endpoint for question operations: `/QuestionAPP`.
- Follows **Repository Pattern** for clean architecture.

### **Frontend (React)**
- Responsive **React UI** to interact with the Web API.
- Create, view, edit, and delete questions.
- Generate question paper through a simple interface.
- Dynamic rendering of questions and subjects.

---

## 🛠 Tech Stack
| Layer           | Technology |
|----------------|------------|
| **Frontend**   | React, React Router DOM, Axios, TailwindCSS/Bootstrap |
| **Backend**    | ASP.NET Core Web API (.NET 7 or above) |
| **Database**   | SQL Server / MariaDB |
| **Tools**      | Visual Studio 2022, VS Code |

---

## 📂 Project Structure

### **Backend (ASP.NET Core Web API)**
```
/AcademicQuestionPaperAPI
│
├── Controllers      # API Controllers
├── Models           # Entity Models
├── Repositories     # Repository Interfaces & Implementations
├── Services         # Business Logic Layer
├── Data             # DbContext and Migrations
└── Program.cs       # Application startup
```

### **Frontend (React)**
```
/question-paper-client
│
├── src
│   ├── components   # UI Components
│   ├── pages        # Pages like Dashboard, Question Management
│   ├── services     # Axios API calls
│   ├── routes       # React Router configuration
│   └── App.js       # Root component
└── package.json
```

---

## 🚀 Getting Started

### **1. Clone the Repository**
```bash
git clone https://github.com/dotnetmamun/QuestionPaperAPP.git
cd QuestionPaperAPP
```

### **2. Setup Backend**
```bash
cd QuestionAPI
```
- Open the project in **Visual Studio 2022**.
- Update the `appsettings.json` with your **database connection string**.
```json
"ConnectionStrings": {
  "DefaultConnection": "Server=YOUR_SERVER;Database=QuestionPaperDB;Trusted_Connection=True;"
}
```
- Run database migrations:
```bash
dotnet ef database update
```
- Run the API:
```bash
dotnet run
```
The API will run at: `https://localhost:5001`

---

### **3. Setup Frontend**
```bash
cd question-paper-client
npm install
npm start
```
The frontend will run at: `http://localhost:3000`

---

## 🌐 API Endpoint
| Endpoint         | Method | Description |
|-----------------|--------|-------------|
| `/QuestionAPP`   	    | GET    | Get all questions |
| `/QuestionAPP`   	    | POST   | Add a new question |
| `/QuestionAPP/{id}`   | GET    | Get details of specific question |
| `/QuestionAPP/{id}`   | PUT    | Update existing question |
| `/QuestionAPP/{id}`   | DELETE | Delete question |

---

## 🔮 Future Enhancements
- Export question papers to PDF.
- Add difficulty levels and categorization for questions.
- Add question tagging for better organization.
- Support for multiple question types (MCQ, descriptive, etc.).

---

## 🤝 Contribution
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit changes (`git commit -m 'Add new feature'`).
4. Push to branch (`git push origin feature-name`).
5. Open a pull request.

---

## 📜 License
This project is licensed under the MIT License.

---

## 👨‍💻 Author
**Abdullah Al Mamun**  
GitHub: [dotnetmamun](https://github.com/dotnetmamun)

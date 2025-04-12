<h1 align="center">
  CodeWeave – The AI-Powered Roadmap Generator
</h1>

<p align="center">
  <img src="https://img.shields.io/github/stars/Naman-56-56/codeweave?style=for-the-badge" />
  <img src="https://img.shields.io/github/forks/Naman-56-56/codeweave?style=for-the-badge" />
  <img src="https://img.shields.io/github/issues/Naman-56-56/codeweave?style=for-the-badge" />
  <img src="https://img.shields.io/github/license/Naman-56-56/codeweave?style=for-the-badge" />
</p>

<p align="center">
  <b>Plan, Visualize, and Execute Your Projects Like Never Before</b><br>
  <sub>Turn your project goals into reality with structured roadmaps and AI suggestions tailored to your tech stack.</sub>
</p>

---

## 🧠 What is CodeWeave?

> CodeWeave is a futuristic roadmap generation tool designed to turn a project's vision into actionable, trackable, and shareable steps using AI-assisted planning.

Whether you're building a portfolio site or managing a full-stack application, **CodeWeave** helps you break it down into achievable tasks, align them with timelines, and share your progress—all in one place.

Now with **Gemini API-powered AI**, you can generate project outlines, roadmaps, and task suggestions intelligently based on your project goals.

---

## ✨ Features

- ⚡ **AI-powered Roadmap Creation (via Gemini API)**
- 🧱 **Custom Task Blocks**
- 📆 **Timeline & Milestone Visualization**
- 🎯 **Goal-Based Flow Suggestions**
- 🌐 **Responsive, Modern UI**
- 🗂 **Export Roadmaps as PDFs or JSON**
- 🧑‍💻 **Developer-Focused Architecture**
- 🔐 **User Authentication & Authorization**
- 📱 **Mobile-First Design**

---

## 🧩 Tech Stack

| Frontend     | Backend        | Database   | Styling        |
|--------------|----------------|------------|----------------|
| HTML, JS     | Django (Python)| PostgreSQL | CSS / Bootstrap |

> AI Integrations: Google Gemini API

---

## 🚀 Quickstart

### 🧱 Clone and Set Up

```bash
git clone https://github.com/ritikawat07/codeweave.git
cd codeweave
```

### 📦 Create a Virtual Environment

```bash
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
```

### 🔧 Install Requirements

```bash
pip install -r requirements.txt
```

### 🔑 Setup Environment

1. Copy the example env file:
   ```bash
   cp .env.example .env
   ```

2. Get your API keys:
   - Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
   - PDF Generation API key from [api.market](https://api.market/store/yakpdf)

3. Add them to the `.env` file:
   ```
   GEMINI_API_KEY=your_api_key_here
   SECRET_KEY=your_django_secret_key
   DEBUG=True
   ALLOWED_HOSTS=localhost,127.0.0.1
   PDF_API_KEY=your_pdf_api_key  # Get this from api.market
   ```

4. Set up the database:
   ```bash
   python manage.py migrate
   ```

5. Create a superuser (optional):
   ```bash
   python manage.py createsuperuser
   ```

> Make sure your `.env` file is not committed to version control.

---

### 🧪 Run the App

```bash
python manage.py runserver
```

Visit: `http://127.0.0.1:8000`

---

## 🗂️ Project Structure

```
codeweave/
├── manage.py           # Django management script
├── codeweave/         # Main project directory
│   ├── settings.py    # Project settings
│   ├── urls.py        # URL configuration
│   └── wsgi.py        # WSGI configuration
├── api/               # API endpoints and logic
├── projects/          # Project management app
├── users/            # User authentication and profiles
├── templates/        # HTML templates
├── static/           # Static files (CSS, JS, images)
├── dev_env/          # Development environment setup
├── requirements.txt  # Python dependencies
├── .env             # Environment variables
├── .env.example     # Sample environment variables
├── .gitignore       # Git ignore rules
├── LICENSE          # Project license
└── README.md        # Project documentation
```

---

## 🔮 Future Vision

> CodeWeave isn't just a tool—it's a platform evolving with AI.

### 🛸 Planned Features

- [ ] 📌 Drag-and-Drop Kanban Task Boards
- [x] 🤖 AI-Generated Tasks Based on Project Name (via Gemini)
- [ ] 🧠 GPT-powered Suggestions for Stack Selection
- [ ] 📡 Real-Time Collaboration with WebSockets
- [ ] 📥 GitHub Project Integration
- [ ] 📊 Visual Analytics on Roadmap Progress
- [ ] 💾 Cloud Sync + Export Options (JSON, Markdown, Notion API)
- [ ] 🔄 CI/CD Pipeline Integration
- [ ] 📱 Progressive Web App (PWA) Support

---

## 🤝 Contribution Guide

We'd 💙 your help!

```bash
# Fork it 🍴
# Clone your version
git checkout -b feature/AmazingFeature

# Code something cool 🤖
git commit -m "Added an amazing feature"
git push origin feature/AmazingFeature
# Open a Pull Request 🚀
```

### 🧪 Testing

Before submitting a PR, please ensure:
1. All tests pass: `python manage.py test`
2. Code follows PEP 8 style guide
3. Documentation is updated
4. New features include appropriate tests

---

## 📜 License

This project is licensed under the **Apache 2.0 License**.  
See the [LICENSE](LICENSE) file for details.

---


### 👨‍💻 Developers
- **Ankit** – Core Developer, Frontend and API Handling 
- **Naman** – Core Developer, Backend, Hosting and API Handling
- **Lehar** – Co Developer, Backend 
- **Ritika** – Co Developer, Frontend 

---
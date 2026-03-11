# CareerPath Prediction — Quickstart Guide

## Prerequisites

Install the following before getting started:

| Tool | Download | Notes |
|------|----------|-------|
| **Python 3.x** | [python.org/downloads](https://www.python.org/downloads/) | ✅ Check **"Add Python to PATH"** during install |
| **Node.js** | [nodejs.org](https://nodejs.org/) | LTS version recommended |
| **Git** | [git-scm.com](https://git-scm.com/) | To clone the repo |

---

## 1. Clone the Repository

```bash
git clone https://github.com/Mahidharan/careerpath-predection.git
cd careerpath-predection
```

---

## 2. Run the Backend (Flask + ML)

Open a terminal and run:

```bash
cd backend
python -m pip install -r requirements.txt
python app.py
```

✅ Backend will start at **http://localhost:5000**

You should see:
```
Model trained successfully
* Running on http://127.0.0.1:5000
```

---

## 3. Run the Frontend (React + Vite)

Open a **new terminal** (keep the backend running) and run:

```bash
cd frontend
npm install
npm run dev
```

✅ Frontend will start at **http://localhost:5173**

---

## 4. Open the App

Go to **http://localhost:5173** in your browser.

The frontend communicates with the backend at `http://localhost:5000`, so **both must be running** at the same time.

---

## Project Structure

```
careerpath-predection/
├── backend/
│   ├── app.py              # Flask API server
│   ├── dataset.csv         # Training data
│   ├── generate_data.py    # Script to regenerate dataset
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── pages/          # Home, Predict, Result, Dataset, About
│   │   └── components/     # Navbar, Footer, Layout
│   └── package.json
└── QUICKSTART.md
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/predict` | Submit skill scores, get career prediction |
| `GET` | `/dataset_info` | View dataset summary |

---

## Troubleshooting

**`python` not found**
> Make sure Python is installed and **added to PATH**. Try `python3` instead of `python`.

**`pip` not found**
> Use `python -m pip install ...` instead of `pip install ...`

**Frontend can't reach backend**
> Make sure `python app.py` is running in a separate terminal on port `5000`.

**Port already in use**
> Kill the process using the port or restart your terminal.

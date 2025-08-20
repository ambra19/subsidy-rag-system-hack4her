# Subsidy AI Navigator

Part of the Hack4Her 2025 Hackathon, this project comes as an AI Navigator for processing childcare subsidy applications. Built on top of the TapeAgents framework for the ServiceNow challenge.

[Screenshot](frontend/src/images/Hack4Her.png)

## Prerequisites

- **Node.js** 18+ and npm/yarn
- **Python** 3.10 - 3.12
- **Git**

## Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/subsidy-ai-navigator.git
cd subsidy-ai-navigator
```

### 2. Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### 3. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -e .

# Start the backend server
python api.py
```

## 📁 Project Structure

```
subsidy-ai-navigator/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── hooks/             # Custom React hooks
│   └── lib/               # Utility functions
├── backend/                # Python backend
│   ├── api.py             # FastAPI application
│   ├── my_agent.py        # AI agent implementation
│   └── docs/              # Data and documentation
├── public/                 # Static assets
└── package.json            # Frontend dependencies
```

## 🔧 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `python api.py` - Start the FastAPI server
- `python -m pytest` - Run tests (if available)

## 🌐 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Add your API keys and configuration here
```


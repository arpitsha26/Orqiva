<p align="center">
  <img src="https://img.shields.io/badge/Orqiva-AI%20Workspace-D7FF38?style=for-the-badge&labelColor=101110" alt="Orqiva" />
</p>

<h1 align="center">◇ ORQIVA</h1>

<p align="center">
  <b>One interface. Multiple intelligent agents. Think beyond.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/React_19-Vite_8-61DAFB?style=flat-square&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/LangGraph-LangChain-1C3C3C?style=flat-square&logo=langchain&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Firebase-Auth-FFCA28?style=flat-square&logo=firebase&logoColor=black" />
  <img src="https://img.shields.io/badge/Redis-Session-DC382D?style=flat-square&logo=redis&logoColor=white" />
  <img src="https://img.shields.io/badge/Razorpay-Billing-0C2451?style=flat-square&logo=razorpay&logoColor=white" />
</p>

---

## 📖 Overview

**Orqiva** is a full-stack AI workspace platform built on a microservices architecture. It provides a unified chat interface that intelligently routes user queries to specialized AI agents — from general conversation and web search to code generation, PDF/PPT creation, and image analysis — all powered by a LangGraph-based agentic workflow.

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React 19 + Vite)               │
│   SideBar │ ChatArea │ Artifact │ BillingDrawer                 │
│   Firebase Auth (Google) · Redux Toolkit · TailwindCSS v4       │
└──────────────────────────┬──────────────────────────────────────┘
                           │ HTTP (Axios)
                           ▼
┌──────────────────────────────────────────────────────────────────┐
│                    API GATEWAY  (:8000)                          │
│   Express · CORS · Cookie-Parser · express-http-proxy · Morgan  │
│                                                                  │
│   /api/auth    ──▶  Auth Service   (:8001)                      │
│   /api/chat    ──▶  Chat Service   (:8002)   (protected)        │
│   /api/agent   ──▶  Agent Service  (:8003)   (protected)        │
│   /api/billing ──▶  Billing Service(:8004)   (protected)        │
│   /api/me      ──▶  Gateway (getCurrentUser) (protected)        │
└──────────────────────────────────────────────────────────────────┘
                           │
         ┌─────────────────┼─────────────────┐
         ▼                 ▼                 ▼
   ┌───────────┐    ┌───────────┐    ┌───────────┐
   │  MongoDB  │    │   Redis   │    │ AWS S3    │
   │ (per-svc) │    │ (session) │    │ (files)   │
   └───────────┘    └───────────┘    └───────────┘
```

### Microservices

| Service     | Port   | Responsibilities                                                         |
| ----------- | ------ | ------------------------------------------------------------------------ |
| **Gateway** | `8000` | API routing, CORS, auth middleware, request proxying                      |
| **Auth**    | `8001` | Firebase Admin token verification, user CRUD, Redis session management   |
| **Chat**    | `8002` | Conversation & message persistence (MongoDB)                             |
| **Agent**   | `8003` | LangGraph agentic workflow, multi-agent routing, file processing         |
| **Billing** | `8004` | Razorpay payment order creation & verification, payment history          |

---

## 🤖 AI Agent System

The Agent service uses **LangGraph** (`@langchain/langgraph`) to build a stateful, graph-based workflow that routes user queries to the appropriate specialized agent.

```
                     ┌──────────┐
                     │  START   │
                     └────┬─────┘
                          ▼
                     ┌──────────┐
                     │  Router  │  ← LLM-based intent classification
                     └────┬─────┘    (or file-type detection)
                          │
        ┌─────┬─────┬─────┼─────┬──────┬──────┬─────────────┐
        ▼     ▼     ▼     ▼     ▼      ▼      ▼             ▼
     ┌─────┐┌────┐┌──────┐┌───┐┌───┐┌──────┐┌──────┐┌──────────────┐
     │Chat ││Search││Coding││PDF││PPT││Vision││PDFRag││ImageAnalyzer │
     └──┬──┘└──┬──┘└──┬───┘└─┬─┘└─┬─┘└──┬───┘└──┬───┘└──────┬───────┘
        │      │      │      │    │     │       │            │
        │      └──▶Chat     │    │     │       │            │
        ▼          ▼   ▼     ▼    ▼     ▼       ▼            ▼
                     ┌──────────┐
                     │   END    │
                     └──────────┘
```

### Available Agents

| Agent              | Purpose                                              | Key Tools / Deps                             |
| ------------------ | ---------------------------------------------------- | -------------------------------------------- |
| **Chat**           | General conversation & explanations                  | LangChain LLM (Google GenAI / Groq / OpenRouter) |
| **Search**         | Real-time web search → feeds results into Chat       | `@langchain/tavily`                          |
| **Coding**         | Code generation, debugging, architecture design      | LLM with code-focused prompts                |
| **PDF**            | PDF document generation                              | `pdfkit`                                     |
| **PPT**            | PowerPoint presentation generation                   | `pptxgenjs`                                  |
| **Vision**         | Image generation / creation                          | Google Generative AI                         |
| **PDF RAG**        | Upload & query PDF documents via RAG                 | `pdf-parse`, `@langchain/qdrant`, `@langchain/textsplitters` |
| **Image Analyzer** | Upload & analyze images                              | Multimodal LLM                               |

The **Router** uses an LLM to classify user intent, or falls back to file MIME-type detection for uploaded files (PDF → `pdfRag`, images → `imageAnalyzer`). Users can also manually select an agent to bypass auto-routing.

---

## 🖥 Frontend

| Technology           | Usage                                   |
| -------------------- | --------------------------------------- |
| **React 19**         | UI framework                            |
| **Vite 8**           | Build tooling & dev server              |
| **TailwindCSS v4**   | Utility-first styling                   |
| **Redux Toolkit**    | Global state (user, conversations, messages) |
| **Firebase**         | Google OAuth sign-in (client-side)      |
| **Monaco Editor**    | Code artifact rendering                 |
| **React Markdown**   | Markdown message rendering with GFM     |
| **React Syntax Highlighter** | Code block highlighting         |
| **Framer Motion**    | Animations & transitions                |
| **Lucide React**     | Icon system                             |
| **Axios**            | HTTP client (with credentials)          |

### Key Components

- **`SideBar`** — Conversation list, new chat, agent selection
- **`ChatArea`** — Main message thread & input
- **`ChatInput`** — Message composer with file upload
- **`MessageBubble`** — Rendered AI/user messages with markdown
- **`Artifact`** — Side panel for generated artifacts (code, documents)
- **`BillingDrawer`** — Usage & payment management via Razorpay
- **`LoadingAnimation`** — AI thinking indicator

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **Docker** (for Redis)
- **MongoDB** instance (local or Atlas)
- **Firebase** project with Google sign-in enabled
- **Razorpay** account (for billing features)

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/Orqiva.git
cd Orqiva
```

### 2. Start Redis

```bash
cd backend
docker compose up -d
```

### 3. Configure environment variables

Each service has its own `.env` file. Create/update the following:

<details>
<summary><b>backend/gateway/.env</b></summary>

```env
PORT=8000
AUTH_SERVICE=http://localhost:8001
CHAT_SERVICE=http://localhost:8002
AGENT_SERVICE=http://localhost:8003
BILLING_SERVICE=http://localhost:8004
FRONTEND_URL="http://localhost:5173"
REDIS_URL="redis://localhost:6379"
```
</details>

<details>
<summary><b>backend/services/auth/.env</b></summary>

```env
PORT=8001
MONGO_URI=<your-mongodb-connection-string>
REDIS_URL="redis://localhost:6379"
FIREBASE_PROJECT_ID=<your-firebase-project-id>
FIREBASE_CLIENT_EMAIL=<your-service-account-client-email>
FIREBASE_PRIVATE_KEY="<your-service-account-private-key>"
```

Set these Firebase service-account values in the auth service's environment
when deploying. Store the private key with `\n` in place of line breaks (and
keep it quoted where your environment provider requires it); the auth service
converts those escaped newlines when it initializes Firebase Admin. Do not
commit the private key or a service-account JSON file.
</details>

<details>
<summary><b>backend/services/chat/.env</b></summary>

```env
PORT=8002
MONGO_URI=<your-mongodb-connection-string>
```
</details>

<details>
<summary><b>backend/services/agent/.env</b></summary>

```env
PORT=8003
MONGO_URI=<your-mongodb-connection-string>
GOOGLE_API_KEY=<your-google-genai-key>
GROQ_API_KEY=<your-groq-key>
OPENROUTER_API_KEY=<your-openrouter-key>
TAVILY_API_KEY=<your-tavily-key>
QDRANT_URL=<your-qdrant-url>
AWS_ACCESS_KEY_ID=<your-aws-key>
AWS_SECRET_ACCESS_KEY=<your-aws-secret>
AWS_S3_BUCKET=<your-bucket-name>
AWS_REGION=<your-region>
```
</details>

<details>
<summary><b>backend/services/billing/.env</b></summary>

```env
PORT=8004
MONGO_URI=<your-mongodb-connection-string>
RAZORPAY_KEY_ID=<your-razorpay-key>
RAZORPAY_KEY_SECRET=<your-razorpay-secret>
```
</details>

<details>
<summary><b>frontend/.env</b></summary>

```env
VITE_FIREBASE_API_KEY=<your-firebase-api-key>
VITE_SERVER_URL="http://localhost:8000"
VITE_RAZORPAY_KEY_ID=<your-razorpay-key-id>
```
</details>

### 4. Install dependencies & start services

**Backend** — run each service in a separate terminal:

```bash
# Gateway
cd backend/gateway
npm install
npm run dev

# Auth Service
cd backend/services/auth
npm install
npm run dev

# Chat Service
cd backend/services/chat
npm install
npm run dev

# Agent Service
cd backend/services/agent
npm install
npm run dev

# Billing Service
cd backend/services/billing
npm install
npm run dev
```

**Frontend:**

```bash
cd frontend
npm install
npm run dev
```

The app will be available at **http://localhost:5173**.

---

## 📁 Project Structure

```
Orqiva/
├── backend/
│   ├── docker-compose.yml          # Redis container
│   ├── shared/
│   │   └── redis/                  # Shared Redis client
│   ├── gateway/                    # API Gateway (port 8000)
│   │   ├── controllers/
│   │   ├── middleware/             # Auth middleware (JWT/session)
│   │   ├── utils/                  # Proxy helpers
│   │   └── index.js
│   └── services/
│       ├── auth/                   # Auth Service (port 8001)
│       │   ├── config/             # Firebase Admin, DB
│       │   ├── controllers/
│       │   ├── models/             # User model
│       │   ├── routes/
│       │   └── index.js
│       ├── chat/                   # Chat Service (port 8002)
│       │   ├── config/
│       │   ├── controllers/
│       │   ├── models/             # Conversation, Message models
│       │   ├── routes/
│       │   └── index.js
│       ├── agent/                  # Agent Service (port 8003)
│       │   ├── agents/             # 8 specialized AI agents
│       │   ├── config/             # LLM model registry
│       │   ├── controllers/
│       │   ├── graph/              # LangGraph workflow
│       │   │   ├── graph.js        # StateGraph definition
│       │   │   ├── router.js       # Intent classifier
│       │   │   └── state.js        # Agent state schema
│       │   ├── routes/
│       │   ├── utils/
│       │   └── index.js
│       └── billing/                # Billing Service (port 8004)
│           ├── config/
│           ├── controllers/
│           ├── models/             # Payment model
│           ├── routes/
│           └── index.js
└── frontend/
    ├── public/
    ├── utils/                      # Firebase config, Axios instance
    ├── src/
    │   ├── components/             # UI components
    │   ├── features/               # API call functions
    │   ├── pages/                  # Page components
    │   ├── redux/                  # Store, slices (user, conversation, message)
    │   ├── styles/
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    └── vite.config.js
```

---

## 🔑 Key API Routes

| Method | Endpoint           | Auth | Service | Description                    |
| ------ | ------------------ | ---- | ------- | ------------------------------ |
| POST   | `/api/auth/login`  | ✗    | Auth    | Firebase token → session       |
| GET    | `/api/me`          | ✓    | Gateway | Get current user               |
| GET    | `/api/chat/`       | ✓    | Chat    | List conversations             |
| POST   | `/api/chat/`       | ✓    | Chat    | Create conversation            |
| PUT    | `/api/chat/:id`    | ✓    | Chat    | Update conversation            |
| GET    | `/api/chat/:id`    | ✓    | Chat    | Get messages                   |
| POST   | `/api/agent/`      | ✓    | Agent   | Send message → agent pipeline  |
| POST   | `/api/billing/order`  | ✓ | Billing | Create Razorpay order          |
| POST   | `/api/billing/verify` | ✓ | Billing | Verify payment                 |

---

## 🐳 Docker Support

Each microservice includes a `Dockerfile` for containerized deployment. Redis is managed via `docker-compose.yml` in the backend root.

```bash
# Start Redis
cd backend
docker compose up -d
```

---

## 🛠 Tech Stack Summary

| Layer        | Technologies                                                              |
| ------------ | ------------------------------------------------------------------------- |
| **Frontend** | React 19, Vite 8, TailwindCSS v4, Redux Toolkit, Firebase Auth, Monaco   |
| **Gateway**  | Express 5, express-http-proxy, cookie-parser, cors, morgan                |
| **Auth**     | Express 5, Firebase Admin SDK, Mongoose, ioredis                          |
| **Chat**     | Express 5, Mongoose                                                       |
| **Agent**    | Express 5, LangGraph, LangChain (Google GenAI, Groq, OpenRouter, Tavily, Qdrant), pdfkit, pptxgenjs, AWS S3 |
| **Billing**  | Express 5, Mongoose, Razorpay SDK                                         |
| **Infra**    | MongoDB, Redis, Docker, AWS S3                                            |

---

## 📄 License

ISC

---

<p align="center">
  <b> In production (Arpit Sharma) ... Deployed soon.....</b>
</p>

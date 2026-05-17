
# 🧱 Namma‑Mistri – Smart Construction Site Assistant

Namma‑Mistri is a smart construction assistant app designed for builders, masons, and construction workers to manage daily site activities with ease and accuracy. 🏗️  

---

## ✨ Key Features

- 🔐 Secure login and password reset for safe access  
- 👤 User profiles to personalize site and worker management  
- 🏘️ Multi‑site management to track multiple projects from one place  
- 📏 Material calculator with customizable wall thickness and dimensions  
- 👷 Labor wage tracking to monitor daily and weekly payouts  
- 📸 Site photo management to capture and organize site progress  
- 📊 Simple, clean interface tailored for on‑site usage  

---

## 🚀 Tech Stack

- ⚙️ Framework: AI Studio web app template  
- 💻 Language: TypeScript (Vite + Node.js)  
- 🌐 Frontend: Vite‑based SPA  
- 🔄 Backend: Node/TypeScript server (`server.ts`)  
- 📦 Package manager: npm  

Generated from the official `google-gemini/aistudio-repository-template` and customized for the Namma‑Mistri construction workflow.

---

## 🧪 Run Locally

### Prerequisites

- Node.js (LTS version recommended)  
- npm

### Steps

1. **Clone the repository**  
   ```bash
   git clone https://github.com/soundaryareddy268-cloud/Namma---Mistri.git
   cd Namma---Mistri
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Configure environment variables**  
   - Copy `.env.example` to `.env.local`.  
   - Set your Gemini API key:  
     ```env
     GEMINI_API_KEY=your_gemini_api_key_here
     ```

4. **Run the development server**  
   ```bash
   npm run dev
   ```

5. **Open the app**  
   - Visit the local URL shown in the terminal (usually `http://localhost:5173` or similar).

---

## 🌐 View in AI Studio

You can also view and manage this app directly in Google AI Studio:

- AI Studio app link:  
  `https://ai.studio/apps/a4fb250f-7e1e-4cdf-a0eb-b461fef22427`

---

## 📁 Project Structure (High Level)

- `src/` – Frontend source code (components, pages, logic)  
- `server.ts` – Server setup and API integration  
- `index.html` – Entry HTML file  
- `metadata.json` – AI Studio app configuration  
- `package.json` – Dependencies and scripts  
- `tsconfig.json` – TypeScript configuration  
- `vite.config.ts` – Vite configuration  

---

## 🛣️ Roadmap Ideas

- 📅 Daily task planner for site activities  
- 📊 Cost estimation reports for materials and labor  
- 🔔 Alerts for low material stock and upcoming payments  
- 🌐 Multi‑language support for local crews  

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  

1. Fork the repo  
2. Create a feature branch  
3. Commit your changes  
4. Open a pull request describing your changes

---

## 📝 License

This project is currently private/personal.  
If you plan to open source it, add a standard license file (for example, MIT or Apache‑2.0) and update this section accordingly.
```

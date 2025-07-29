# AI React Component Generator

An AI-driven, full-stack web application where users can generate, preview, and save React components in real-time using natural language prompts.

### **🚀 Live Demo**

**[Click here to view the live application](https://react-component-gen.netlify.app/)**

---

### ## 📖 Overview

This project is a micro-frontend playground designed for rapid component creation. Authenticated users can interact with an AI through a conversational UI to generate React components, see a live preview, and inspect the generated JSX and CSS. All work can be saved to a user's account and loaded in future sessions.

---

### ## ✨ Key Features

* **User Authentication:** Secure user registration and login using JWT.
* **AI-Powered Generation:** Leverages the Google Gemini API to translate natural language into React components.
* **Live Preview Sandbox:** Renders generated components instantly and securely in an `iframe`.
* **Session Persistence:** Save and load your work, including generated code, to a MongoDB database.
* **Code Inspection & Export:** View syntax-highlighted JSX and CSS and copy the code to your clipboard.

---

### ## 🛠️ Tech Stack

**Frontend:**
* React (Vite)
* React Router for navigation
* React Context API for state management
* Axios for API communication

**Backend:**
* Node.js & Express.js
* MongoDB with Mongoose
* JSON Web Tokens (JWT) for authentication
* Google Gemini API for AI generation

---

### ## 🚀 Technical Deep Dive

#### ### Architecture

The application is built on a modern, decoupled full-stack architecture, ensuring a clear separation of concerns between the client and server.

**Flow Diagram:**
```
[User's Browser]
      |
      v
[React Frontend (on Netlify)] --- REST API Call (HTTPS) ---> [Node.js/Express Backend (on Render)]
      | (UI/State)                                                     | (Business Logic / Auth)
      |                                                                |
      |                               +--------------------------------+-----------------+
      |                               |                                |                 |
      v                               v                                v                 v
[React Context API]           [MongoDB Atlas]               [Google Gemini API]    [JWT Middleware]
(Global Auth State)           (User & Session Data)         (AI Generation)        (Route Protection)
```

* **Frontend:** A single-page application built with **React (Vite)** and deployed on **Netlify**. It handles all user interface elements, state, and client-side routing.
* **Backend:** A **Node.js/Express** server deployed on **Render**. It exposes a REST API to handle user authentication, session persistence, and acts as a secure intermediary for requests to the AI model.
* **Database:** **MongoDB Atlas** is used to persist user account information and saved component generation sessions.
* **External AI Service:** The **Google Gemini API** is used for the core code generation logic.

#### ### State-Management & Persistence Strategy

* **Frontend State Management:** We chose the built-in **React Context API** to manage global application state.
    * **Reasoning:** For this application's scope, the primary global concern is user authentication status (`user`, `token`, `loading` state). The Context API provides a clean, lightweight solution for sharing this data across the entire component tree without the overhead and boilerplate of a larger library like Redux. An `AuthContext` was created to handle login, logout, and persisting auth state between page loads by leveraging `localStorage`.

* **Backend Persistence Strategy:** User and session data are persisted in a **MongoDB** database, managed via **Mongoose**.
    * **Reasoning:** MongoDB's flexible, document-based (NoSQL) structure is ideal for this application. It easily accommodates the semi-structured data of our "sessions," which include prompts and generated code snippets that may vary. Mongoose was used to provide schema validation, ensuring data integrity for critical fields like user references and emails.

#### ### Key Decisions & Trade-offs

* **Component Sandboxing:**
    * **Decision:** Generated components are rendered inside an **`<iframe>`** using the `srcDoc` attribute.
    * **Trade-off:** This approach provides maximum security and style isolation. The generated code (JSX and CSS) cannot interfere with the main application's DOM or styles. The trade-off is that communication between the parent application and the sandboxed component is more complex, though it was not required for the current feature set.

* **Authentication:**
    * **Decision:** Implemented a stateless authentication system using **JSON Web Tokens (JWT)**.
    * **Trade-off:** JWTs are efficient and allow the backend to remain stateless, which is excellent for scalability. The user's session is stored client-side. The trade-off is that JWTs cannot be easily invalidated on the server before their expiration (unlike traditional database sessions). For this application, a short token expiration time ('1h') was deemed a reasonable balance.

* **AI Response Handling:**
    * **Decision:** A data cleaning function was implemented on the backend to parse the text response from the Gemini API.
    * **Trade-off:** It was observed that the AI model would sometimes wrap its valid JSON output in Markdown code fences (e.g., ```json ... ```). The cleaning logic robustly extracts the JSON object from the string before parsing. This adds a minor processing step but makes the system resilient to these common AI formatting variations, preventing crashes and improving reliability.

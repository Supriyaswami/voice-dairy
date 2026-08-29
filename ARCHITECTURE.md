# ECHO DIARY Architecture

Tagline: "Speak your day. Relive your memories."

## 1. Product Intent

ECHO DIARY is an AI-powered personal diary web application where a user speaks about their day, reviews the transcript, and converts it into a polished diary entry without losing factual accuracy.

This product is not a generic voice recorder and not a notes app. The core promise is:

- preserve the original voice memory
- preserve the factual transcript
- improve the writing without inventing details
- make the final reading experience feel like opening a real diary

## 2. Architecture Goals

The system is designed around these goals:

- clear separation between frontend, backend, AI, and storage concerns
- replaceable infrastructure for audio storage, speech-to-text, and diary generation
- secure authentication and protected diary access
- scalable code organization for future AI features
- calm, premium user experience across desktop and mobile

## 3. High-Level System Design

The application will use a split frontend/backend architecture.

### Frontend

- React + Vite single-page application
- handles UI, routing, recording, transcript editing, diary editing, playback, theme, and authenticated user flows
- communicates only with the backend API

### Backend

- Node.js + Express API server
- handles authentication, diary CRUD, audio upload orchestration, AI orchestration, and response shaping
- owns security, validation, and storage abstraction

### Database

- MongoDB with Mongoose
- stores users and diary metadata/content

### AI Pipeline

- Faster Whisper service converts saved audio to raw transcript
- Ollama service converts edited transcript to polished diary text
- backend orchestrates both services so the frontend stays simple

### File Storage

- audio stored locally at first
- storage access hidden behind a service abstraction so Cloudinary or S3 can be added later without changing controllers or business rules

## 4. Core User Flow

1. User logs in.
2. User opens the home page and records their memory.
3. Browser captures audio and sends it to backend storage.
4. Backend stores the audio and returns a file reference.
5. Backend sends the audio to Faster Whisper and receives a raw transcript.
6. Frontend shows the transcript in an editable textarea.
7. User edits the transcript and submits it for diary generation.
8. Backend sends the edited transcript to Ollama with strict instructions to preserve facts.
9. Frontend shows the generated diary in an editable diary editor.
10. User saves the final diary entry.
11. Backend stores date, time, transcript, diary text, and audio reference in MongoDB.
12. Later, user can search, browse calendar entries, open a diary page, read it, and replay the original recording.

## 5. Application Layers

The codebase will be organized into layers so responsibilities stay clear.

### Presentation Layer

Frontend pages, components, layouts, and hooks.

Responsibilities:

- display UI
- manage local interaction state
- handle routing
- call backend services
- render loading, error, empty, and success states

### API Layer

Express routes and controllers.

Responsibilities:

- receive HTTP requests
- validate request shape
- call business services
- return consistent API responses

### Domain/Business Layer

Backend services.

Responsibilities:

- authentication logic
- storage logic
- transcription orchestration
- diary generation orchestration
- diary save/retrieve/delete flows

### Data Layer

Mongoose models and database configuration.

Responsibilities:

- schema definitions
- database persistence
- indexing and query support

### Infrastructure Layer

External integrations and platform concerns.

Responsibilities:

- local file storage
- Faster Whisper integration
- Ollama integration
- JWT handling
- environment configuration

## 6. Frontend Architecture

The frontend will be feature-oriented but still use the requested folder structure.

### Route Groups

- public routes: home landing if unauthenticated, login, register
- protected routes: dashboard/home, transcript editor, generated diary editor, diary list, calendar, diary detail, profile

### State Strategy

- React Context for authentication and user session
- local component state for recording, transcript editing, and diary editing
- reusable hooks for time, theme, audio recording state, API requests, and protected navigation

### UI Design Direction

- Apple + Notion inspired minimalism
- premium diary aesthetic for reading pages
- soft shadows, paper textures, subtle notebook lines, rounded cards, elegant type scale
- strong light and dark themes
- Framer Motion used selectively for meaningful transitions and recording feedback

## 7. Backend Architecture

The backend will follow controller -> service -> model boundaries.

### Controllers

Thin request handlers.

Responsibilities:

- parse request input
- call appropriate service
- map result to HTTP response

### Services

Business logic lives here.

Responsibilities:

- register/login user
- upload and resolve audio paths
- transcribe audio
- generate diary text
- save and query diaries

### Middleware

Cross-cutting request concerns.

Responsibilities:

- JWT authentication
- error handling
- request validation
- upload middleware

## 8. Storage Abstraction Strategy

Audio storage must be easy to swap later. To support that, the backend will never let controllers directly depend on the filesystem.

Instead:

- controllers call a storage service
- storage service exposes methods like `saveAudio`, `deleteAudio`, `getAudioUrl`
- local disk implementation is used first
- future S3 or Cloudinary implementations can match the same interface

This keeps business logic stable when storage changes.

## 9. AI Safety Strategy

Diary generation must behave like an editor, not a storyteller.

To enforce that:

- backend owns the prompt template for Ollama
- prompt explicitly forbids invented facts, people, places, conversations, or timeline additions
- raw transcript remains stored separately
- user reviews transcript before AI generation
- user reviews diary before final save

This creates a human-in-the-loop architecture instead of blind AI generation.

## 10. Data Model Design

### User

- name
- email
- password
- profilePhoto
- createdAt

### Diary

- userId
- title
- day
- date
- time
- audioPath
- transcript
- diary
- createdAt
- updatedAt

### Notes on design

- `userId` links diary ownership to authenticated user
- `audioPath` is stored as a storage reference, not UI logic
- transcript and diary are stored separately to preserve both original memory and polished writing

## 11. API Design Approach

Planned endpoints:

- `POST /register`
- `POST /login`
- `GET /profile`
- `POST /upload-audio`
- `POST /transcribe`
- `POST /generate-diary`
- `POST /save-diary`
- `GET /diaries`
- `GET /diary/:id`
- `DELETE /diary/:id`

Design rules:

- JWT required for protected routes
- consistent JSON response format
- validation before business logic
- no frontend-direct access to AI or database

## 12. Security Design

- passwords hashed with bcrypt
- JWT-based authentication for protected APIs
- route-level authorization so users can access only their own diaries
- file upload validation for audio types and size
- environment variables for secrets and service configuration
- sanitized error messages for production responses

## 13. Search and Retrieval Design

Search will be backed by diary queries that can match:

- day/date/month/year
- transcript content
- diary content

The architecture should allow future upgrades such as:

- natural language search
- semantic search
- memory timeline extraction

## 14. Future-Ready Extension Points

The system is intentionally designed so future features can be added without rewriting core flows.

Planned extensions supported by this architecture:

- mood detection service
- memory timeline generation
- weekly, monthly, yearly summaries
- automatic tags
- AI chat with diary history
- voice search
- semantic retrieval over transcript and diary data

The main reason this is possible is that the architecture preserves three separate assets:

- original audio
- raw transcript
- final diary entry

## 15. Build Order

The project will be implemented in this order:

1. project architecture
2. folder structure
3. dependency installation
4. backend setup
5. frontend setup
6. authentication
7. voice recording
8. audio upload
9. Faster Whisper integration
10. transcript editing
11. Ollama integration
12. diary generation
13. MongoDB integration
14. diary UI
15. calendar
16. search
17. profile
18. dark mode
19. final polishing

## 16. Why This First File Exists

This file exists to lock the product and technical direction before scaffolding code.

It prevents common early-project problems:

- mixing frontend and backend responsibilities
- coupling controllers to storage details
- letting AI logic spread into UI code
- building features in the wrong order
- making future upgrades harder than necessary

This document is the blueprint the rest of the project will follow.

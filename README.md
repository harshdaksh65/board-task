## Task Board 

Interactive task board with authentication, built using React, Vite, Tailwind CSS, and shadcn/ui. Users can log in, manage tasks across Todo/Doing/Done columns, and keep data in the browser with local storage.

---

## Features

- Login screen with hardcoded credentials and "Remember me" option
- Protected dashboard route
- Fixed columns: **Todo**, **Doing**, **Done**
- Create, edit, delete tasks
- Drag & drop tasks between columns
- Search by title
- Filter by priority (Low / Medium / High)
- Sort by due date (within each column)
- Per-browser persistence using `localStorage` / `sessionStorage`
- Reset board with confirmation modal
- Reusable UI components (columns, task cards, modals)

---

## Tech Stack

- React (via Vite)
- React Router
- Tailwind CSS (with new `@theme` API)
- shadcn/ui components (DropdownMenu, etc.)
- lucide-react icons
- react-toastify for notifications

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/harshdaksh65/board-task.git
cd "Hintro frontend Assignment"
npm install
```

### 2. Environment variables

Auth credentials are configured via Vite env variables.

1. Copy the example file:
	 ```bash
	 cp .env.example .env
	 ```
2. Edit `.env` and set your desired login credentials

> Note: These values are still bundled in client-side code; this setup only keeps them out of source control, not fully secret.

### 3. Run the dev server

```bash
npm run dev
```

Then open the printed URL (default: http://localhost:5173).

### 4. Build for production

```bash
npm run build
npm run preview
```

---

## Authentication & Remember Me

- Auth logic lives in `src/context/AuthContext.jsx`.
- Credentials are read from `import.meta.env.VITE_AUTH_EMAIL` and `VITE_AUTH_PASSWORD`.
- On login, the app returns detailed error messages:
	- Wrong email only → `Invalid email`
	- Wrong password only → `Invalid password`
	- Both wrong → `Invalid email and password`

### Storage behavior

- If **Remember me is checked**:
	- User info is stored in `localStorage` under a `user` key.
	- The session persists across browser restarts.
- If **Remember me is not checked**:
	- User info is stored only in `sessionStorage`.
	- User is logged out when the tab/window closes.

---

## Task Board & Persistence

- Task state and logic live in `src/context/TodoContext.jsx`.
- Tasks are stored in `localStorage` under the key `taskboard-tasks`.
- Each task contains:
	- `id`, `title`, `description`
	- `priority` (Low, Medium, High)
	- `dueDate`
	- `tags` (array)
	- `column` (Todo / Doing / Done)
	- `createdAt`

> Currently, tasks are **per browser**, not per user: if multiple users log in on the same browser, they will see the same task list because all tasks are stored under one key in `localStorage`.

---

## UI & Components

- `src/Components/Login.jsx` – Login form with email, password, and Remember me
- `src/Components/Dashboard.jsx` – Wraps `Navbar` and `ToDo`
- `src/Components/ToDo.jsx` – Main board page (search, filters, columns, modals)
- `src/Components/Column.jsx` – Single column (Todo/Doing/Done)
- `src/Components/TaskCard.jsx` – Individual task card
- `src/Components/DragAndDrop.jsx` – `useDragAndDrop` hook encapsulating drag & drop logic
- `src/Components/Modal.jsx` – Base modal wrapper
- `src/Components/TaskFormModal.jsx` – Create/Edit task modal using `Modal`
- `src/Components/ConfirmModal.jsx` – Generic confirmation modal (used for Reset Board)

Theme and design tokens are defined in `src/index.css` using the Tailwind `@theme` API, including custom colors such as `--color-primary`, `--color-secondary`, and `--color-background`.

---

## Scripts

- `npm run dev` – Start Vite dev server
- `npm run build` – Build for production
- `npm run preview` – Preview production build

---

## Notes / Limitations

- Authentication is front-end only and intended for demo purposes.
- Task data is stored in the browser (no backend). Clearing storage or switching devices will reset tasks.
- Per-user task separation is not implemented yet; adding this would require storing tasks keyed by user or moving to a backend.

---

## License

This project is for assignment/learning purposes.

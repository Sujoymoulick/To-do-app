# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fullstack todo application with a React frontend and Express backend. The backend stores todos in memory (no persistence).

## Commands

```bash
npm run dev        # Start Vite dev server (port 5173)
npm run server     # Start Express API server (port 3001)
npm run build      # TypeScript compile + Vite production build
npm run lint       # Run ESLint
npm run preview    # Preview production build
```

## Architecture

- `src/` - React frontend (TypeScript)
- `server/` - Express API backend (plain JavaScript, ESM)

The frontend communicates with the backend at `http://localhost:3001`. API endpoints:
- `GET /api/todos` - List all todos
- `POST /api/todos` - Create todo
- `PATCH /api/todos/:id` - Toggle completion
- `DELETE /api/todos/:id` - Delete todo

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite with React Compiler (Babel preset)
- **Backend**: Express 5, plain JS (ESM), in-memory storage
- **Linting**: ESLint 9 with typescript-eslint

## Development

Run both servers simultaneously for fullstack development:
```bash
npm run server &
npm run dev
```
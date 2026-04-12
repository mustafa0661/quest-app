# React + TypeScript Project Architecture and Coding Standards

This document defines the code writing standards and file structure for the frontend side of the project. Artificial intelligence (LLM) development must adhere to these rules for all UI and logic development.

## 1. File and Folder Structure (Feature-Based)
The project is maintained in a feature-based structure to ensure scalability:
- `src/components`: Global and reusable UI components (Button, Input, Modal, etc.).
- `src/features`: Main features of the application (Post, Comment, Auth). Each feature contains its own `components`, `hooks`, `services`, and `types`.
- `src/pages`: Page-level components that combine features and map to routes.
- `src/services`: Global API configurations (Axios instance, Interceptors).
- `src/hooks`: Global custom React hooks.
- `src/types`: Global TypeScript interfaces.
- `src/store`: Client State management (Zustand).
- `src/utils`: Helper functions and constants.

## 2. Technology Stack
- **Framework:** React 18+ (Vite)
- **Language:** TypeScript (Required)
- **Routing:** React Router DOM v6+
- **Styling:** Tailwind CSS + `clsx`/`tailwind-merge` (for dynamic classes)
- **Server State / Fetching:** TanStack Query (React Query)
- **Client State:** Zustand
- **Form Handling & Validation:** React Hook Form + Zod
- **API Client:** Axios
- **UI Notifications:** Sonner or React Hot Toast
- **Icons:** Lucide-React

## 3. Coding Rules & Best Practices
- **Components:** Functional components and Arrow Function structure must be used. Use `.tsx` extension for components and `.ts` for pure logic.
- **Naming Conventions:** Component files and names must be `PascalCase` (e.g., `PostCard.tsx`). Hooks and utilities must be `camelCase` (e.g., `useFetchPosts.ts`).
- **TypeScript:** The use of `any` is strictly prohibited. Interfaces or Types must be defined for all props, API requests, and responses.
- **Component Size:** If a component exceeds 150-200 lines, extract parts into smaller sub-components.
- **Logic Separation:** Keep components clean. Complex business logic and data fetching MUST be abstracted into custom hooks (e.g., `usePosts()`).
- **Data Fetching:** Do NOT use `useEffect` for fetching data. Always use TanStack Query (`useQuery`, `useMutation`, `useInfiniteQuery`).
- **Pagination & Infinite Scroll:** For social feeds (posts, comments), implement Infinite Scroll using TanStack Query's `useInfiniteQuery` integrating with the backend's `Pageable` structure.
- **Forms:** Always use React Hook Form integrated with Zod resolvers for client-side validation before sending data to the API.
- **Security & Interceptors:** Use Axios Interceptors to automatically attach the JWT token to outgoing requests and globally catch 401/403/500 errors to display Toast notifications based on the backend's `ProblemDetail` structure.

## 4. AI Prompt Instructions
"When creating a new UI feature or page:
1. Define the TypeScript interfaces (`types/`) based on the backend DTOs.
2. If it's a form, create the Zod schema.
3. Write the Axios API calls (`services/`).
4. Create custom hooks using TanStack Query for state and fetching (`hooks/`).
5. Create the responsive UI components using Tailwind CSS (`components/`), keeping them dumb/presentational where possible.
6. Assemble them in the main feature component or page.
Never use `any`, and never fetch data directly inside a `useEffect`."

---
*Project Goal: A modern, fast, responsive, and user-friendly social media interface.*
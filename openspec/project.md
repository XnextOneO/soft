# Project Context

## Purpose

This project is a specialized frontend application designed for banking and business administration tasks. It provides a dense, data-rich interface for managing payment documents (SWIFT/ISO20022), business partners, accounts, and reference books (calendars, currencies). The system features complex forms, virtualization for large datasets, and synchronization with external banking systems.

## Tech Stack

- **Core:** React 19, TypeScript 5.8, Vite 6.3.
- **Architecture:** Feature-Sliced Design (FSD).
- **Routing:** TanStack Router (File-based, type-safe routing).
- **State Management:**
  - **Server State:** TanStack Query v5 (React Query).
  - **Global App State:** Zustand (Auth, User, Permissions).
  - **Domain/UI State:** MobX (Reference Books, Menu state).
- **Styling:**
  - **Primary:** Mantine v8 (UI Kit).
  - **Secondary:** Ant Design v5 (Used specifically for the Navigation Menu).
  - **Custom:** CSS Modules (SCSS) and `postcss-preset-mantine`.
- **UI Libraries:**
  - **Tables:** `mantine-react-table` (based on TanStack Table, handles virtualization).
  - **Forms:** `react-hook-form` + `@hookform/resolvers` + `yup` (Validation).
  - **Icons:** `@tabler/icons-react`, `react-icons`.
- **Internationalization:** i18next (React-i18next, Backend loader, Browser detector).
- **Tooling:** Ladle (Component isolation), Husky (Git hooks), npm-check-updates.
- **Testing:** Vitest (Unit), Playwright (E2E).

## Project Conventions

### Code Style & Quality Assurance

- **Linter & Formatter:** We use **ESLint** (Mantine & Standard configs), **Prettier**, and **Stylelint** (for SCSS).
- **Strict Typing:**
  - TypeScript is configured with strict mode.
  - `ts:check` runs `tsc --noEmit`.
- **Env Consistency:** A custom Vite plugin (`vite-dotenv-checker`) ensures `.env` and `.env.example` are consistent during development.
- **Dependencies:** `npm install` must be run with `--legacy-peer-deps` due to the React 19 + Mantine/AntD hybrid stack.
- **Mandatory Verification:** All code changes must pass the verification script: `npm run check`.
  - This script aggregates **Stylelint**, **TypeScript compilation**, and **ESLint**.

### Design & UX Standards

- **Visual Style:** Professional banking interface, supporting both Light and Dark modes.
  - **Theming:** Controlled via `@mantine/core` theme object.
  - **Layout:** Heavy usage of Mantine's `Group`, `Stack`, and `Flex` components.
- **Interactivity:**
  - **Tables:** Advanced data tables with infinite scrolling, sorting, and filtering via `mantine-react-table`.
  - **Modals:** Extensive use of Modals for CRUD operations (e.g., `CalendarEditModal`, `BusinessPartnerInfoModal`).
- **Feedback & States:**
  - **Notifications:** `@mantine/notifications` used for API success/error feedback.
  - **Loaders:** Custom `MainLoader` component (`Loader type="bars"`).

### Architecture Patterns (Feature-Sliced Design)

The project follows a structure inspired by **Feature-Sliced Design (FSD)**.
- **Layers (Order of dependency):**
  1. `app/` - Global providers, i18n setup, Vite plugins.
  2. `pages/` - Composition of widgets/features into routes.
  3. `widgets/` - Big, self-contained UI blocks.
  4. `features/` - User interactions.
  5. `shared/` - Reusable code (API, Stores, Components, Hooks).
- **Aliases:** Configured in `tsconfig.json` (e.g., `@shared/*`, `@pages/*`).

### Routing Strategy

- **File-Based Routing:** Routes are defined in `src/routes`.
- **Route Generation:**
  - **Tool:** TanStack Router Vite Plugin.
  - **Artifact:** `src/generated/routeTree.gen.ts`.
- **Conventions:**
  - Use `__root.tsx` for the layout shell (Header, Sidebar, AuthProvider).
  - **Lazy Loading:** Route components use the `.lazy.tsx` suffix pattern (e.g., `index.lazy.tsx`) to ensure automatic code splitting.
  - **Params:** Defined via file naming (e.g., `$slug.lazy.tsx`).

### Data Fetching & REST API

- **Client:** **Axios** instances (`$host`, `$authHost`) configured in `src/shared/api/index.ts`.
- **Workflow:**
  1. **API Layer:** Define typed API functions in `src/shared/api/mutation/` (e.g., `calendarAPI.ts`, `bpAPI.ts`).
  2. **React Query:** Wrap API calls in `useQuery` or `useMutation` hooks.
- **Interceptors:**
  - Request: Injects Bearer token from `auth-storage` (LocalStorage).
  - Response: Handles 401 (redirect to `/login`) and 403 (redirect to home).
- **Table Data:** Uses `useInfiniteQuery` for pagination and infinite scroll in `MainTable`.

### Internationalization (I18n)

- **Tooling:** i18next + i18next-parser.
- **Workflow:**
  1. Keys are extracted using `npm run extract-translations`.
  2. Translations are stored in `public/locales/{lng}/{ns}.json` (supported: `ru`, `by`).
  3. Loaded via HTTP backend (`i18next-http-backend`).

### Git Workflow

- **Commit Metadata:** `vite-plugin-version-mark` tags builds with the specific Git commit hash.
- **Pre-commit Hooks:** **Husky** triggers `lint-staged` to run ESLint and Stylelint on changed files.

## Domain Context

- **Authentication:**
  - Protocol: Custom JWT implementation (Access + Refresh Tokens).
  - Logic: `AuthProvider` handles token expiration checks and automatic silent renewal via `setInterval`.
  - State: Managed via Zustand `authStore` with persistence to `localStorage`.
- **Permissions:**
  - **RBAC:** `permissionStore` holds user permissions (e.g., `payment:create`).
  - **Access Control:** UI components (buttons, menu items) are conditionally rendered based on permissions (helper functions: `hasReadPermission`, `hasCreatePermission`).
- **Core Entities:**
  - **Payment Instructions:** Complex forms for creating payments (SWIFT/ISO20022), validating against "RF, KZ, India" specifics.
  - **Business Partners:** Directory of clients and accounts synchronized with external systems.
  - **Reference Books:** Dictionaries (Calendars, Banks, Currencies) managed via **MobX** stores.

## Important Constraints

- **Environment Variables:**
  - Access variables via `import.meta.env.VITE_VAR_NAME`.
  - Consistency between `.env` and `.env.example` is enforced by a custom Vite plugin at build time (dev mode).
- **CSS Architecture:**
  - Uses **SCSS Modules** for component-specific styling (`*.module.scss`).
  - Uses `postcss-preset-mantine` for Mantine integration.
- **Hybrid UI Stack:** While Mantine is the core, **Ant Design** is specifically used for the recursive `NavMenu` component, creating a mixed context for styling.
- **Docker:**
  - Build stage uses `node:lts-alpine`.
  - Production builds are served via **Caddy** within a Docker container.

## External Dependencies

- **Backend API:** REST API endpoint (URL defined in `VITE_API_URL`).
- **SC-Bank.360:** External corporate banking system for data synchronization.
- **Identity Provider:** Internal custom auth service (endpoints: `/authorization/login`, `/authorization/refresh-token`).

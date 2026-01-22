# Project Context

## Purpose

This project is a specialized frontend application designed for banking and business administration tasks (payment documents, business partners, reference books). It features a dense, data-rich interface and utilizes a hybrid tech stack to handle complex forms, huge data tables, and secure authentication.

## Tech Stack

- **Core:** React 19, TypeScript 5.8, Vite 6.3.
- **Architecture:** Feature-Sliced Design (FSD) (implied by folder structure and alias configuration).
- **Routing:** TanStack Router (File-based, type-safe routing).
- **State Management (Hybrid):**
  - **Server State:** TanStack Query v5 (React Query).
  - **Global App State:** Zustand (Auth, User, Permissions).
  - **Domain/UI State:** MobX (Reference Books, Burger Menu state).
- **Styling:**
  - **Primary:** Mantine v8 (UI Kit).
  - **Secondary:** Ant Design v5 (Used specifically for the Navigation Menu).
  - **Custom:** CSS Modules (SCSS) and `postcss-preset-mantine`.
- **UI Libraries:**
  - **Tables:** `mantine-react-table` (based on TanStack Table).
  - **Forms:** `react-hook-form` + `@hookform/resolvers` + `yup` (Validation).
  - **Icons:** `@tabler/icons-react`, `react-icons`.
- **Internationalization:** i18next (React-i18next, Backend loader, Browser language detector).
- **Tooling:**
  - **Component Development:** Ladle (faster Storybook alternative).
  - **Linting:** ESLint (Mantine config), Prettier, Stylelint.
  - **Git Hooks:** Husky + Lint-staged.
- **Testing:** Vitest (Unit), Playwright (E2E).

## Project Conventions

### Code Style & Quality Assurance

- **Linter & Formatter:** The project uses **ESLint** (standard + Mantine configs), **Prettier**, and **Stylelint** (for SCSS).
- **Strict Typing:** TypeScript is used extensively (`noEmit`, `strict`).
- **Env Consistency:** A custom Vite plugin (`vite-dotenv-checker`) ensures `.env` and `.env.example` are consistent during development.
- **Dependencies:** Frequent updates managed via `npm-check-updates` (script `npm run update`).

### Design & UX Standards

- **Visual Style:** Professional banking interface.
  - **Theming:** Controlled via `@mantine/core` theme object (`theme.ts`).
  - **Modes:** Full support for Light and Dark modes (`ThemeSwitcher`).
- **Typography & Hierarchy:**
  - **Font:** `Roboto` and `Inter`.
  - **Layout:** Heavy usage of Mantine's `Group`, `Stack`, and `Flex`.
- **Interactivity:**
  - **Tables:** Advanced data tables (`MainTable`) with infinite scrolling, virtualization, sorting, and filtering.
  - **Modals:** Extensive use of Modals for CRUD operations (e.g., `CalendarEditModal`).
- **Feedback & States:**
  - **Notifications:** `@mantine/notifications` used for API feedback.
  - **Loaders:** Custom `MainLoader` component.

### Architecture Patterns (Feature-Sliced Design)

The project follows a structure inspired by **Feature-Sliced Design (FSD)**:
- **Layers:**
  1. `src/app/` - Global setup (i18n, plugins).
  2. `src/pages/` - Page components composed of widgets/features.
  3. `src/widgets/` - (Configured in TSConfig).
  4. `src/features/` - (Configured in TSConfig).
  5. `src/shared/` - Reusable code (API, Stores, Components, Hooks).
- **Routing Integration:** Routes (`src/routes`) use `.lazy.tsx` pattern for code splitting and `__root.tsx` for layout wrapping.

### Routing Strategy

- **File-Based Routing:** Routes are defined in `src/routes`.
- **Route Generation:**
  - **Tool:** TanStack Router Vite Plugin.
  - **Artifact:** `src/generated/routeTree.gen.ts`.
  - **Conventions:** `.` delimiters for nesting, `$` for parameters (e.g., `business-partner/$slug.lazy.tsx`).

### Data Fetching & API

- **Client:** **Axios** instances (`$host`, `$authHost`) configured in `src/shared/api/index.ts`.
- **Server State:** **TanStack Query** (`useQuery`, `useMutation`) wraps API calls.
- **Interceptors:**
  - Request: Injects Bearer token from LocalStorage (`auth-storage` state).
  - Response: Handles 401 (Login redirect) and 403 (Home redirect) errors.
- **Endpoints:** REST API (URL defined in `VITE_API_URL`).

### Internationalization (I18n)

- **Workflow:**
  - Keys extracted via `i18next-parser` (`i18next-parser.config.ts`).
  - Translations loaded from `/public/locales/{lng}/{ns}.json`.
  - Support for `ru` and `by` locales.

### Git Workflow

- **Commit Metadata:** `vite-plugin-version-mark` tags builds with the specific Git commit hash.
- **Hooks:** Pre-commit checks ensure no linting errors enter the codebase.

## Domain Context

- **Authentication:**
  - Protocol: Custom JWT implementation (Access + Refresh Tokens).
  - Logic: `AuthProvider` handles token expiration checks and silent refresh via `setInterval`.
  - Storage: Tokens stored in `localStorage` via Zustand persist middleware.
- **Permissions:**
  - **RBAC:** `permissionStore` holds user permissions (e.g., `payment:create`).
  - **Guards:** UI components conditionally render based on permissions (helper functions: `hasReadPermission`, `hasCreatePermission`).
- **Core Entities:**
  - **Payment Instructions:** Complex multi-tab forms (`MainDetails`, `PaymentDetails`, `AdministrativeData`) for creating payments (SWIFT/ISO20022 context).
  - **Business Partners:** Directory of clients and accounts synchronized with external "SC-Bank.360" system.
  - **Reference Books:** Dictionaries (Calendars, Banks, Currencies) managed via **MobX** stores.

## Important Constraints

- **Legacy Dependencies:** `npm install` runs with `--legacy-peer-deps` (likely due to React 19 + older ecosystem libraries).
- **Environment Variables:**
  - Must be prefixed with `VITE_`.
  - Consistency checked at build time (dev mode).
- **Hybrid UI Stack:** While Mantine is the core, **Ant Design** is specifically used for the recursive `NavMenu` component (`src/shared/components/Menu`), creating a mixed context for styling.
- **Containerization:**
  - **Build Stage:** `node:lts-alpine`.
  - **Production Stage:** `caddy:alpine` (Web server handling static files and potentially compression).

## External Dependencies

- **Backend API:** REST API.
- **SC-Bank.360:** External corporate banking system for data synchronization.
- **Identity Provider:** Internal custom auth service (endpoints: `/authorization/login`, `/authorization/refresh-token`).

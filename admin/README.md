# FoodHub — Admin Panel

React (Vite) + Tailwind CSS admin panel for a food delivery platform.
Primary brand color: `#ff6e4a`.

## Getting started

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`. Login route (`/`) accepts any
email/password right now since it's wired to dummy data.

## Folder structure

```
src/
  assets/                 static assets
  components/
    Login/
      Admin_login.jsx     admin login screen
      User_login.jsx      end-user login screen
    Sidebar.jsx           left navigation
    Navbar.jsx            top bar (search, notifications, logout)
    DashboardLayout.jsx   wraps Sidebar + Navbar + <Outlet/>
  Pages/
    Dashboard.jsx
    Addfood.jsx
    Listfood.jsx
    Managefood.jsx
    Orders.jsx
    Orderdetails.jsx
    Customers.jsx
    Profile.jsx
    Settings.jsx
  api.jsx                 <-- single place to plug in your real backend
  App.jsx                 routes
  main.jsx                entry
```

## Connecting your real backend (important)

Everything currently reads/writes through **`src/api.jsx`**. Every function
in that file (`getFoods`, `addFood`, `getOrders`, `adminLogin`, etc.)
currently resolves dummy/mock data, but the real `axios` call is already
written right above it as a comment. To go live:

1. Create a `.env` file in the project root:
   ```
   VITE_API_BASE_URL=https://your-server.com/api
   ```
2. Open `src/api.jsx`, and for each function, delete the mock line and
   uncomment the `// REAL API CALL` block above it.

Because every Page/Component only imports functions from `api.jsx` (never
calls `axios` directly), **no other file needs to change** when you wire up
the real server.

## Notes

- Auth is currently open (no route guard) since the backend isn't ready —
  add a `ProtectedRoute` wrapper around the `DashboardLayout` route once
  real JWT auth is in place (check for `localStorage.getItem("admin_token")`).
- Images use placeholder Unsplash/Dicebear URLs — swap with your CDN/
  upload URLs later.
- Tailwind primary color is defined in `tailwind.config.js` (`primary`
  scale, base `#ff6e4a`) — change it there to re-theme the whole app.

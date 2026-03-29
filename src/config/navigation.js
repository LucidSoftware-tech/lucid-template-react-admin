/**
 * Navigation Configuration
 *
 * This is the SINGLE SOURCE OF TRUTH for your sidebar navigation.
 * Your SaaS generator edits THIS file to change the menu structure.
 *
 * Each section has:
 * - label: Section title shown in the secondary sidebar
 * - icon: Lucide icon component name (imported in Sidebar.jsx)
 * - items: Array of sub-navigation links
 *
 * To add a new module, your generator:
 * 1. Adds an entry here
 * 2. Adds the route in src/router/routes.jsx
 * 3. Drops the page file into src/pages/ or src/features/
 */

export const navigation = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: 'LayoutDashboard',
    path: '/',
  },
  {
    key: 'users',
    label: 'Users',
    icon: 'Users',
    path: '/users',
  },
]

/**
 * Primary sidebar modules (top-level icon bar).
 * Your generator can replace these entirely for different app types.
 */
export const modules = [
  { key: 'main', label: 'Home', icon: 'LayoutDashboard' },
]

/**
 * App metadata used in the header and sidebar branding.
 */
export const appConfig = {
  name: import.meta.env.VITE_APP_NAME || 'Admin Panel',
  logo: null, // path to logo image, or null to show icon
}

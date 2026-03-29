/**
 * Icon Registry
 *
 * Only icons listed here are included in the bundle.
 * Your generator adds entries as it adds navigation items.
 * This avoids importing ALL 1300+ lucide icons.
 */
import {
  Circle,
  LayoutDashboard,
  Users,
  Rocket,
  Settings,
  FileText,
  ShoppingCart,
  BarChart2,
  Mail,
  Bell,
  Package,
  CreditCard,
  Folder,
  Globe,
  Shield,
  Zap,
} from 'lucide-react'

const icons = {
  Circle,
  LayoutDashboard,
  Users,
  Rocket,
  Settings,
  FileText,
  ShoppingCart,
  BarChart2,
  Mail,
  Bell,
  Package,
  CreditCard,
  Folder,
  Globe,
  Shield,
  Zap,
}

export function getIcon(name) {
  return icons[name] || Circle
}

import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  //  { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'overview', title: 'Home', href: paths.dashboard.overview, icon: 'house' },
  //  { key: 'customers', title: 'Applied resume', href: paths.dashboard.customers, icon: 'chart-pie' },
  { key: 'resume', title: 'Resume upload', href: paths.dashboard.resume, icon: 'file-arrow-up' },
  { key: 'apply', title: 'Applied resume', href: paths.dashboard.apply, icon: 'chart-pie' },
  // { key: 'resumeShow', title: 'Resume renderer', href: paths.dashboard.renderer, icon: 'eye' },
  // { key: 'resumeTemplate', title: 'Resume Template', href: paths.dashboard.template, icon: 'eye' },
  { key: 'integrations', title: 'Integrations', href: paths.dashboard.integrations, icon: 'plugs-connected' },
  { key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' },
  { key: 'account', title: 'Account', href: paths.dashboard.account, icon: 'user' },
  { key: 'error', title: 'Error', href: paths.errors.notFound, icon: 'x-square' },
] satisfies NavItemConfig[];

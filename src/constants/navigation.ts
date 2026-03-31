import { LayoutGrid, Layers } from 'lucide-react';
import React from 'react';

export interface SidebarItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  subItems?: {
    label: string;
    href?: string;
  }[];
}

export const NAVIGATION_ITEMS: SidebarItem[] = [
  {
    label: 'Getting Started',
    icon: React.createElement(LayoutGrid, { className: "w-5 h-5" }),
    subItems: [
      { label: 'Introduction', href: '/introduction' },
      { label: 'Quickstart', href: '/quickstart' },
    ]
  },
  {
    label: 'Form Controls',
    icon: React.createElement(Layers, { className: "w-5 h-5" }),
    subItems: [
      { label: 'Button', href: '/components/button' },
      { label: 'Input', href: '/components/input' },
      { label: 'Number Input', href: '/components/number-input' },
      { label: 'Select', href: '/components/select' },
      { label: 'Checkbox', href: '/components/checkbox' },
      { label: 'Switch', href: '/components/switch' },
      { label: 'Radio', href: '/components/radio' },
      { label: 'Combobox', href: '/components/combobox' },
      { label: 'Date Picker', href: '/components/date-picker' },
      { label: 'Calendar', href: '/components/calendar' },
      { label: 'Schedule Calendar', href: '/components/schedule-calendar' },
    ]
  },
  {
    label: 'Data Display',
    icon: React.createElement(Layers, { className: "w-5 h-5" }),
    subItems: [
      { label: 'Table', href: '/components/table' },
      { label: 'Card', href: '/components/card' },
      { label: 'Badge', href: '/components/badge' },
      { label: 'Avatar', href: '/components/avatar' },
      { label: 'Skeleton', href: '/components/skeleton' },
    ]
  },
  {
    label: 'Navigation',
    icon: React.createElement(Layers, { className: "w-5 h-5" }),
    subItems: [
      { label: 'Tabs', href: '/components/tabs' },
      { label: 'Breadcrumb', href: '/components/breadcrumb' },
      { label: 'Navbar', href: '/components/navbar' },
    ]
  },
  {
    label: 'Feedback',
    icon: React.createElement(Layers, { className: "w-5 h-5" }),
    subItems: [
      { label: 'Toast', href: '/components/toast' },
      { label: 'Alert', href: '/components/alert' },
      { label: 'Progress', href: '/components/progress' },
      { label: 'Tooltip', href: '/components/tooltip' },
    ]
  },
  {
    label: 'Overlay',
    icon: React.createElement(Layers, { className: "w-5 h-5" }),
    subItems: [
      { label: 'Modal', href: '/components/modal' },
      { label: 'Drawer', href: '/components/drawer' },
      { label: 'Alert Dialog', href: '/components/alert-dialog' },
      { label: 'Popover', href: '/components/popover' },
      { label: 'Dropdown', href: '/components/dropdown' },
    ]
  },
];

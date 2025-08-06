'use client'
import { Car, Factory, Home, Inbox, Search, Settings, Timer } from 'lucide-react'

import { AppSidebarMenuItem } from "./app-sidebar-menu-item"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu } from './ui/sidebar'

// Menu items.
const items = [
  {
    title: "Головна",
    url: "/",
    icon: Home,
  },
  {
    title: "Об'єкти",
    url: "/location",
    icon: Factory,
  },
  {
    title: "Облік робочого часу",
    url: "#",
    icon: Timer,
  },
  {
    title: "Облік переміщень транспорту",
    url: "#",
    icon: Car,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-neutral-200 bg-white dark:bg-neutral-900 dark:border-neutral-700">
      <SidebarContent className="p-4 space-y-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-md font-semibold text-primary px-2">
            Меню
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <AppSidebarMenuItem
                  key={item.title}
                  href={item.url}
                  label={item.title}
                  icon={item.icon}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

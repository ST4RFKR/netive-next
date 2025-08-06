import Link from "next/link"
import { type LucideIcon } from 'lucide-react'
import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar"

interface AppSidebarMenuItemProps {
  href: string
  label: string
  icon: LucideIcon
  isActive?: boolean
}

export function AppSidebarMenuItem({ href, label, icon: Icon, isActive }: AppSidebarMenuItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive}>
        <Link href={href} className="flex items-center gap-3 rounded-lg px-3 py-2 text-neutral-900 transition-all hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50">
          <Icon className="h-4 w-4" />
          {label}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

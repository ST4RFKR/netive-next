'use client'

import React from 'react'
import { Bell, User, Settings, Menu, Clock, Nfc, NfcIcon, SmartphoneNfc, SmartphoneNfcIcon } from 'lucide-react'
import { HeaderSearch } from './header-search'


import { Button } from './ui'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card'

export const Header = () => {
  return (
    <header className="border-b border-neutral-200 bg-white dark:bg-neutral-900 dark:border-neutral-700 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        {/* Left part - Logo */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
              <SmartphoneNfcIcon className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-neutral-900 dark:text-white">
                NFCWay
              </h1>
            </div>
          </div>
        </div>
        {/* Center part - Search */}
        <div className="hidden md:flex flex-1 justify-center max-w-md mx-4">
          <HeaderSearch />
        </div>
        {/* Right part - Notifications, User */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  2
                </span>
                <span className="sr-only">View notifications</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-80">
              <Card className="shadow-none border-0">
                <CardHeader className="border-b">
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>You have 2 unread messages.</CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="mb-3 grid grid-cols-[25px_1fr] items-start pb-3 last:mb-0 last:pb-0">
                    <span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-blue-500" />
                    <div className="grid gap-1">
                      <p className="text-sm font-medium">Your report is ready.</p>
                      <p className="text-xs text-muted-foreground">10 min ago</p>
                    </div>
                  </div>
                  <div className="mb-3 grid grid-cols-[25px_1fr] items-start pb-3 last:mb-0 last:pb-0">
                    <span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-blue-500" />
                    <div className="grid gap-1">
                      <p className="text-sm font-medium">New task assigned to you.</p>
                      <p className="text-xs text-muted-foreground">1 hour ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </PopoverContent>
          </Popover>

          {/* Settings */}
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
            <span className="sr-only">Settings</span>
          </Button>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <span className="sr-only">Open user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Адміністратор</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    admin@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

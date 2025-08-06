
import { AppSidebar } from "../shared/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "../shared/components/ui/sidebar";
import { Header } from "../shared/components";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1">
        <Header />
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
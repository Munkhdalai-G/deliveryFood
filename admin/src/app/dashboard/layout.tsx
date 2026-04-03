import { AppSidebar } from "@/components/app-sidebar";
import Navi from "@/app/dashboard/components/navi";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Divide } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex bg-gray-100">
      <Navi />
      {children}
    </div>
    // <SidebarProvider>
    //   <AppSidebar />
    //   <main>
    //     <SidebarTrigger />
    //     {children}
    //   </main>
    // </SidebarProvider>
  );
}

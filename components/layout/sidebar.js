"use client"
import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Items } from "./items"
import { Menu, LogOut } from "lucide-react"
import logout from "@/lib/logout"

export function Sidebar() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    return (
        <>
            <Button
                variant="ghost"
                size="icon"
                className="fixed top-4 left-4 z-40 lg:hidden"
                onClick={() => setIsOpen(true)}
            >
                <Menu className="h-6 w-6" />
            </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetContent side="left" className="w-[300px] p-0">
                    <MobileSidebar pathname={pathname} onLogout={logout} />
                </SheetContent>
            </Sheet>
            <aside className="fixed left-0 top-0 z-30 hidden h-screen w-64 border-r bg-background lg:block">
                <DesktopSidebar pathname={pathname} onLogout={logout} />
            </aside>
        </>
    )
}

function SidebarContent({
    pathname,
    onLogout,
    className,
}) {
    const [NavItems, setNavItems] = useState(Items);

    return (
        <div className={cn("flex h-full flex-col", className)}>
            <div className="p-4 border-b flex justify-center items-center">
                <h4 className="font-bold">AgroSystem</h4>
            </div>
            <ScrollArea className="flex-1 p-4">
                <nav className="grid gap-1">
                    {NavItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                pathname === item.href ? "bg-accent" : "transparent",
                                item.variant === "default" ? "text-black" : "text-muted-foreground"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                            {item.label && (
                                <span className="ml-auto bg-primary/10 text-black px-2 py-0.5 rounded-md text-xs">
                                    {item.label}
                                </span>
                            )}
                        </Link>
                    ))}
                </nav>
            </ScrollArea>
            <div className="mt-auto p-4 border-t">
                <Button
                    variant="line"
                    className="w-full justify-start"
                    onClick={onLogout}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </div>
        </div>
    )
}

function MobileSidebar({ pathname, onLogout }) {
    return <SidebarContent pathname={pathname} onLogout={onLogout} />
}

function DesktopSidebar({ pathname, onLogout }) {
    return <SidebarContent pathname={pathname} onLogout={onLogout} />
}
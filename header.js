
import Link from "next/link";
import { Bus, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Bus className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-primary font-headline">
            Bus Yatra
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/trips">My Trips</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/optimize-route">Optimize Route</Link>
          </Button>
          <Button variant="ghost" size="icon">
            <UserCircle className="h-6 w-6" />
            <span className="sr-only">Profile</span>
          </Button>
        </nav>
        <Button variant="ghost" size="icon" className="md:hidden">
            <UserCircle className="h-6 w-6" />
            <span className="sr-only">Profile</span>
        </Button>
      </div>
    </header>
  );
}

import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Rainbow gradient bar */}
      <div className="h-2 bg-[image:var(--gradient-rainbow)]" />
      
      <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ShoppingBag className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                ShopHub
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
                Home
              </Link>
              <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
                Products
              </Link>
              <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
                About
              </Link>
              <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
                Contact
              </Link>
            </nav>

            {/* Auth Button */}
            <div className="hidden md:block">
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">{user.email}</span>
                  <Button onClick={handleLogout} variant="outline" size="sm">
                    Logout
                  </Button>
                </div>
              ) : (
                <Button asChild size="sm" className="gap-2">
                  <Link to="/auth">
                    <User className="h-4 w-4" />
                    Login
                  </Link>
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <nav className="md:hidden py-4 space-y-4 border-t animate-fade-in">
              <Link 
                to="/" 
                className="block text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/" 
                className="block text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/" 
                className="block text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/" 
                className="block text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4 border-t">
                {user ? (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <Button onClick={handleLogout} variant="outline" size="sm" className="w-full">
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Button asChild size="sm" className="w-full gap-2">
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                      <User className="h-4 w-4" />
                      Login
                    </Link>
                  </Button>
                )}
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};
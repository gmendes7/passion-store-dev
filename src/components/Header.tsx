import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag, User, Menu, X, Search, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { CartDrawer } from "./CartDrawer";
import { Input } from "@/components/ui/input";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/produtos?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="h-1.5 bg-[image:var(--gradient-rainbow)]" />
      
      <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4">
          {/* Top bar */}
          <div className="hidden md:flex items-center justify-between py-2 text-xs text-muted-foreground border-b">
            <span>Frete grátis para compras acima de R$ 99</span>
            <div className="flex items-center gap-4">
              <Link to="/produtos" className="hover:text-foreground transition-colors">Central de Ajuda</Link>
              <span>|</span>
              <span>Rastrear Pedido</span>
            </div>
          </div>

          {/* Main header */}
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0">
              <ShoppingBag className="h-7 w-7 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                ShopHub
              </span>
            </Link>

            {/* Desktop Search */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="O que você está procurando?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4"
                />
              </div>
            </form>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <>
                  <Button asChild variant="ghost" size="sm">
                    <Link to="/perfil" className="gap-2">
                      <User className="h-4 w-4" />
                      Minha Conta
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Heart className="h-5 w-5" />
                  </Button>
                </>
              ) : (
                <Button asChild variant="ghost" size="sm">
                  <Link to="/auth" className="gap-2">
                    <User className="h-4 w-4" />
                    Entrar
                  </Link>
                </Button>
              )}
              <CartDrawer />
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-2">
              <CartDrawer />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 py-3 border-t">
            <Link to="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Início
            </Link>
            <Link to="/produtos" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Todos os Produtos
            </Link>
            <Link to="/produtos?sort=newest" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Novidades
            </Link>
            <Link to="/produtos?sort=price-asc" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Ofertas
            </Link>
          </nav>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <nav className="md:hidden py-4 space-y-4 border-t animate-fade-in">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="pb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Buscar produtos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </form>

              <Link 
                to="/" 
                className="block text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </Link>
              <Link 
                to="/produtos" 
                className="block text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Todos os Produtos
              </Link>
              <Link 
                to="/produtos?sort=newest" 
                className="block text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Novidades
              </Link>
              <Link 
                to="/produtos?sort=price-asc" 
                className="block text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Ofertas
              </Link>
              
              <div className="pt-4 border-t">
                {user ? (
                  <div className="space-y-3">
                    <Button asChild variant="outline" className="w-full justify-start gap-2">
                      <Link to="/perfil" onClick={() => setIsMenuOpen(false)}>
                        <User className="h-4 w-4" />
                        Minha Conta
                      </Link>
                    </Button>
                    <Button onClick={handleLogout} variant="ghost" size="sm" className="w-full">
                      Sair
                    </Button>
                  </div>
                ) : (
                  <Button asChild className="w-full gap-2">
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                      <User className="h-4 w-4" />
                      Entrar / Criar Conta
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

import { Link } from "react-router-dom";
import { ShoppingBag, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="border-b border-background/10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-1">Assine nossa newsletter</h3>
              <p className="text-background/70 text-sm">Receba ofertas exclusivas</p>
            </div>
            <form className="flex gap-2 w-full md:w-auto">
              <Input type="email" placeholder="Seu email" className="bg-background/10 border-background/20 text-background placeholder:text-background/50 w-full md:w-64" />
              <Button type="submit" variant="secondary">Assinar</Button>
            </form>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <ShoppingBag className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">ShopHub</span>
            </Link>
            <p className="text-background/70 text-sm mb-4">Sua loja online favorita com os melhores produtos.</p>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-background/10 rounded-full hover:bg-background/20 transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="p-2 bg-background/10 rounded-full hover:bg-background/20 transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="p-2 bg-background/10 rounded-full hover:bg-background/20 transition-colors"><Twitter className="h-5 w-5" /></a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Institucional</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/" className="hover:text-background transition-colors">Sobre Nós</Link></li>
              <li><Link to="/" className="hover:text-background transition-colors">Termos de Uso</Link></li>
              <li><Link to="/" className="hover:text-background transition-colors">Privacidade</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Ajuda</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/" className="hover:text-background transition-colors">Central de Ajuda</Link></li>
              <li><Link to="/" className="hover:text-background transition-colors">Trocas e Devoluções</Link></li>
              <li><Link to="/" className="hover:text-background transition-colors">Rastrear Pedido</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" />contato@shophub.com.br</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" />(11) 4002-8922</li>
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5" />Av. Paulista, 1000 - SP</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-background/60">
          <p>© 2024 ShopHub. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
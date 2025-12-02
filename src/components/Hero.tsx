import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

export const Hero = () => {
  return (
    <section className="relative w-full h-[450px] md:h-[550px] overflow-hidden">
      <img src={heroBanner} alt="Descubra produtos incríveis" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-xl animate-fade-in">
            <span className="inline-flex items-center gap-2 bg-primary/20 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              Novidades da Semana
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-4 leading-tight">Descubra Produtos Incríveis</h1>
            <p className="text-lg md:text-xl text-background/90 mb-8">Compre a melhor seleção de itens premium com preços imbatíveis</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link to="/produtos">Ver Produtos <ArrowRight className="h-5 w-5" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-background/10 text-background border-background/30 hover:bg-background/20">
                <Link to="/auth">Criar Conta</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
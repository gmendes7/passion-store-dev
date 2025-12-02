import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Truck, Shield, CreditCard, Headphones } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
}

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar produtos",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    { icon: Truck, title: "Frete Grátis", desc: "Acima de R$99" },
    { icon: Shield, title: "Compra Segura", desc: "100% Protegido" },
    { icon: CreditCard, title: "12x Sem Juros", desc: "Em todos os produtos" },
    { icon: Headphones, title: "Suporte 24h", desc: "Sempre disponível" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      
      <main className="flex-1">
        {/* Benefits Section */}
        <section className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 justify-center md:justify-start">
                  <benefit.icon className="h-8 w-8 text-primary shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">{benefit.title}</p>
                    <p className="text-xs text-muted-foreground">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Produtos em Destaque</h2>
              <p className="text-muted-foreground mt-1">Os melhores produtos selecionados para você</p>
            </div>
            <Button asChild variant="outline" className="hidden sm:flex gap-2">
              <Link to="/produtos">
                Ver Todos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
              <p className="text-muted-foreground mt-4">Carregando produtos...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhum produto disponível</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-8 sm:hidden">
            <Button asChild className="gap-2">
              <Link to="/produtos">
                Ver Todos os Produtos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-primary text-primary-foreground py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Cadastre-se e ganhe 10% de desconto
            </h2>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Crie sua conta agora e aproveite ofertas exclusivas, frete grátis em sua primeira compra e muito mais!
            </p>
            <Button asChild size="lg" variant="secondary" className="gap-2">
              <Link to="/auth">
                Criar Conta Grátis
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Categories Preview */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Categorias Populares</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Eletrônicos", "Moda", "Casa & Decoração", "Esportes"].map((category, index) => (
              <Link
                key={index}
                to="/produtos"
                className="group relative aspect-square overflow-hidden rounded-xl bg-muted"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-bold text-background group-hover:translate-x-1 transition-transform">
                    {category}
                  </h3>
                  <p className="text-sm text-background/80">Ver produtos →</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;

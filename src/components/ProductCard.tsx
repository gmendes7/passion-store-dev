import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Eye } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
}

export const ProductCard = ({ id, name, description, price, image }: ProductCardProps) => {
  const [imageError, setImageError] = useState(false);
  const { addToCart } = useCart();
  const fallbackImage = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id, name, price, image });
  };

  return (
    <Card className="group overflow-hidden hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 animate-fade-in h-full flex flex-col">
      <Link to={`/produto/${id}`} className="flex flex-col h-full">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={imageError ? fallbackImage : (image || fallbackImage)}
            alt={name}
            onError={() => setImageError(true)}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
          {/* Quick view overlay */}
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center">
            <Button
              variant="secondary"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 gap-2"
            >
              <Eye className="h-4 w-4" />
              Ver Detalhes
            </Button>
          </div>
          {/* Badge */}
          <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
            NOVO
          </span>
        </div>
        <CardContent className="p-4 flex-1">
          <h3 className="font-semibold text-base mb-1 line-clamp-2 group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
            {description || "Produto de qualidade premium"}
          </p>
          <div className="mt-auto">
            <p className="text-2xl font-bold text-primary">R$ {price.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground">
              ou 3x de R$ {(price / 3).toFixed(2)} sem juros
            </p>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full gap-2 group-hover:gap-3 transition-all" 
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4" />
          Adicionar ao Carrinho
        </Button>
      </CardFooter>
    </Card>
  );
};

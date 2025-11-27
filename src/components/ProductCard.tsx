import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
}

export const ProductCard = ({ name, description, price, image }: ProductCardProps) => {
  const [imageError, setImageError] = useState(false);
  const fallbackImage = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop";

  return (
    <Card className="group overflow-hidden hover:shadow-[var(--shadow-card-hover)] transition-[var(--transition-base)] animate-fade-in">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={imageError ? fallbackImage : (image || fallbackImage)}
          alt={name}
          onError={() => setImageError(true)}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{name}</h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
          {description || "Produto de qualidade premium"}
        </p>
        <p className="text-2xl font-bold text-primary">R$ {price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full gap-2 group-hover:gap-3 transition-all">
          <ShoppingCart className="h-4 w-4" />
          Adicionar ao Carrinho
        </Button>
      </CardFooter>
    </Card>
  );
};
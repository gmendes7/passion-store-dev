import { ShoppingBag } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t bg-muted/50 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              ShopHub
            </span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            © 2025 ShopHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
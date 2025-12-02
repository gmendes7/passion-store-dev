-- filepath: /passion-store/passion-store/src/db/migrations/20251127225404_fcf2c47e-1562-4c84-94bc-4ddf5934e1f4.sql
-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Public can view products
CREATE POLICY "Anyone can view products"
  ON public.products
  FOR SELECT
  USING (true);

-- Create updated_at trigger function if not exists
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for products updated_at
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample products
INSERT INTO public.products (name, description, price, image) VALUES
  ('Premium Watch', 'Elegant timepiece with leather strap', 299.99, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30'),
  ('Designer Sunglasses', 'UV protection with style', 149.99, 'https://images.unsplash.com/photo-1572635196237-14b3f281503f'),
  ('Wireless Headphones', 'Premium sound quality', 199.99, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'),
  ('Leather Wallet', 'Handcrafted genuine leather', 89.99, 'https://images.unsplash.com/photo-1627123424574-724758594e93'),
  ('Smart Fitness Band', 'Track your health goals', 129.99, 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6');
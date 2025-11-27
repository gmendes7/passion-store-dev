import heroBanner from "@/assets/hero-banner.jpg";

export const Hero = () => {
  return (
    <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
      <img
        src={heroBanner}
        alt="Shop the latest products"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Descubra Produtos Incríveis
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6">
              Compre a melhor seleção de itens premium com preços imbatíveis
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
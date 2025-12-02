import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Truck, CheckCircle2, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { z } from "zod";

const addressSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  cep: z.string().min(8, "CEP inválido"),
  address: z.string().min(5, "Endereço deve ter pelo menos 5 caracteres"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, "Bairro é obrigatório"),
  city: z.string().min(2, "Cidade é obrigatória"),
  state: z.string().min(2, "Estado é obrigatório"),
});

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cep: "",
    address: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fallbackImage = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    try {
      addressSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleNextStep = () => {
    if (step === 1 && validateForm()) {
      setStep(2);
    }
  };

  const handleSubmitOrder = async () => {
    setLoading(true);
    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    setOrderComplete(true);
    clearCart();
    toast({
      title: "Pedido realizado com sucesso!",
      description: "Você receberá um email com os detalhes do pedido.",
    });
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Carrinho vazio</h1>
            <p className="text-muted-foreground mb-6">
              Adicione produtos ao carrinho para continuar
            </p>
            <Button onClick={() => navigate("/")}>Ver Produtos</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center max-w-md animate-fade-in">
            <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Pedido Confirmado!</h1>
            <p className="text-muted-foreground mb-2">
              Obrigado por sua compra, {formData.name}!
            </p>
            <p className="text-muted-foreground mb-6">
              Enviamos um email para {formData.email} com os detalhes do pedido.
            </p>
            <p className="text-lg font-semibold mb-6">
              Número do pedido: #{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
            <Button onClick={() => navigate("/")} size="lg">
              Continuar Comprando
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Button
            variant="ghost"
            onClick={() => (step === 1 ? navigate(-1) : setStep(1))}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                <Truck className="h-5 w-5" />
              </div>
              <div className={`w-20 h-1 mx-2 ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                <CreditCard className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              {step === 1 ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Endereço de Entrega</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleInputChange} className={errors.name ? "border-destructive" : ""} />
                        {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} className={errors.email ? "border-destructive" : ""} />
                        {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <Label htmlFor="phone">Telefone</Label>
                        <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="(00) 00000-0000" className={errors.phone ? "border-destructive" : ""} />
                        {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
                      </div>
                      <div>
                        <Label htmlFor="cep">CEP</Label>
                        <Input id="cep" name="cep" value={formData.cep} onChange={handleInputChange} placeholder="00000-000" className={errors.cep ? "border-destructive" : ""} />
                        {errors.cep && <p className="text-destructive text-sm mt-1">{errors.cep}</p>}
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="address">Endereço</Label>
                        <Input id="address" name="address" value={formData.address} onChange={handleInputChange} className={errors.address ? "border-destructive" : ""} />
                        {errors.address && <p className="text-destructive text-sm mt-1">{errors.address}</p>}
                      </div>
                      <div>
                        <Label htmlFor="number">Número</Label>
                        <Input id="number" name="number" value={formData.number} onChange={handleInputChange} className={errors.number ? "border-destructive" : ""} />
                        {errors.number && <p className="text-destructive text-sm mt-1">{errors.number}</p>}
                      </div>
                      <div>
                        <Label htmlFor="complement">Complemento</Label>
                        <Input id="complement" name="complement" value={formData.complement} onChange={handleInputChange} placeholder="Opcional" />
                      </div>
                      <div>
                        <Label htmlFor="neighborhood">Bairro</Label>
                        <Input id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleInputChange} className={errors.neighborhood ? "border-destructive" : ""} />
                        {errors.neighborhood && <p className="text-destructive text-sm mt-1">{errors.neighborhood}</p>}
                      </div>
                      <div>
                        <Label htmlFor="city">Cidade</Label>
                        <Input id="city" name="city" value={formData.city} onChange={handleInputChange} className={errors.city ? "border-destructive" : ""} />
                        {errors.city && <p className="text-destructive text-sm mt-1">{errors.city}</p>}
                      </div>
                      <div>
                        <Label htmlFor="state">Estado</Label>
                        <Input id="state" name="state" value={formData.state} onChange={handleInputChange} placeholder="Ex: SP" className={errors.state ? "border-destructive" : ""} />
                        {errors.state && <p className="text-destructive text-sm mt-1">{errors.state}</p>}
                      </div>
                    </div>
                    <Button className="w-full mt-6" size="lg" onClick={handleNextStep}>
                      Continuar para Pagamento
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Forma de Pagamento</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                        <RadioGroupItem value="credit" id="credit" />
                        <Label htmlFor="credit" className="flex-1 cursor-pointer">
                          <span className="font-medium">Cartão de Crédito</span>
                          <p className="text-sm text-muted-foreground">Parcele em até 12x sem juros</p>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                        <RadioGroupItem value="pix" id="pix" />
                        <Label htmlFor="pix" className="flex-1 cursor-pointer">
                          <span className="font-medium">PIX</span>
                          <p className="text-sm text-muted-foreground">Pagamento instantâneo</p>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                        <RadioGroupItem value="boleto" id="boleto" />
                        <Label htmlFor="boleto" className="flex-1 cursor-pointer">
                          <span className="font-medium">Boleto Bancário</span>
                          <p className="text-sm text-muted-foreground">Vencimento em 3 dias úteis</p>
                        </Label>
                      </div>
                    </RadioGroup>

                    {paymentMethod === "credit" && (
                      <div className="space-y-4 pt-4 border-t animate-fade-in">
                        <div>
                          <Label htmlFor="cardNumber">Número do Cartão</Label>
                          <Input id="cardNumber" placeholder="0000 0000 0000 0000" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Validade</Label>
                            <Input id="expiry" placeholder="MM/AA" />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="000" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="cardName">Nome no Cartão</Label>
                          <Input id="cardName" placeholder="Como está no cartão" />
                        </div>
                      </div>
                    )}

                    <Button className="w-full" size="lg" onClick={handleSubmitOrder} disabled={loading}>
                      {loading ? "Processando..." : `Finalizar Pedido - R$ ${totalPrice.toFixed(2)}`}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.image || fallbackImage}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate text-sm">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qtd: {item.quantity}</p>
                        <p className="text-sm font-medium">R$ {(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>R$ {totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Frete</span>
                      <span className="text-green-600">Grátis</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-2 border-t">
                      <span>Total</span>
                      <span className="text-primary">R$ {totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;

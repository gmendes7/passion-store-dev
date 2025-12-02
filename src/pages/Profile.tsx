import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { User, Package, Settings, LogOut } from "lucide-react";
import { User as SupabaseUser } from "@supabase/supabase-js";

const Profile = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      setLoading(false);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
    toast({
      title: "Logout realizado",
      description: "Você saiu da sua conta com sucesso.",
    });
  };

  const handleUpdateProfile = async () => {
    setUpdating(true);
    // Simulate profile update
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setUpdating(false);
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram salvas com sucesso.",
    });
  };

  // Mock orders for demonstration
  const mockOrders = [
    {
      id: "ORD001",
      date: "2024-01-15",
      status: "Entregue",
      total: 299.90,
      items: 3,
    },
    {
      id: "ORD002",
      date: "2024-01-20",
      status: "Em trânsito",
      total: 159.90,
      items: 2,
    },
    {
      id: "ORD003",
      date: "2024-01-25",
      status: "Processando",
      total: 499.90,
      items: 5,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Carregando...</p>
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
          <h1 className="text-3xl font-bold mb-8">Minha Conta</h1>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 gap-2">
              <TabsTrigger value="profile" className="gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Perfil</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="gap-2">
                <Package className="h-4 w-4" />
                <span className="hidden sm:inline">Pedidos</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Configurações</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações Pessoais</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" value={user?.email || ""} disabled className="bg-muted" />
                    </div>
                    <div>
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                    <Button onClick={handleUpdateProfile} disabled={updating} className="w-full">
                      {updating ? "Salvando..." : "Salvar Alterações"}
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Estatísticas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <p className="text-3xl font-bold text-primary">{mockOrders.length}</p>
                        <p className="text-sm text-muted-foreground">Pedidos</p>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <p className="text-3xl font-bold text-primary">
                          {mockOrders.reduce((sum, o) => sum + o.items, 0)}
                        </p>
                        <p className="text-sm text-muted-foreground">Itens Comprados</p>
                      </div>
                      <div className="col-span-2 text-center p-4 bg-muted rounded-lg">
                        <p className="text-3xl font-bold text-primary">
                          R$ {mockOrders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}
                        </p>
                        <p className="text-sm text-muted-foreground">Total Gasto</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Histórico de Pedidos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockOrders.map((order) => (
                      <div
                        key={order.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="space-y-1">
                          <p className="font-medium">Pedido #{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.date).toLocaleDateString("pt-BR")} • {order.items} itens
                          </p>
                        </div>
                        <div className="flex items-center gap-4 mt-2 sm:mt-0">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              order.status === "Entregue"
                                ? "bg-green-100 text-green-700"
                                : order.status === "Em trânsito"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {order.status}
                          </span>
                          <span className="font-bold">R$ {order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Preferências</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Notificações por Email</p>
                        <p className="text-sm text-muted-foreground">
                          Receba atualizações sobre seus pedidos
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Ativado
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Newsletter</p>
                        <p className="text-sm text-muted-foreground">
                          Receba promoções e novidades
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Ativado
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-destructive">
                  <CardHeader>
                    <CardTitle className="text-destructive">Zona de Perigo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button variant="destructive" className="gap-2" onClick={handleLogout}>
                      <LogOut className="h-4 w-4" />
                      Sair da Conta
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;

import { Home, Map, Users, Wheat, UserCircle, Building2 } from 'lucide-react';

export const Items = [
    { title: 'Dashboard', variant: "default", href: '/admin', icon: Home },
    { title: 'Clientes', variant: "default", href: '/admin/cliente', icon: Users },
    { title: 'Fazendas', variant: "default", href: '/admin/fazenda', icon: Building2 },
    { title: 'Safras', variant: "default", href: '/admin/safra', icon: Wheat },
    { title: 'Talhões', variant: "default", href: '/admin/talhao', icon: Map },
    { title: 'Funcionários', variant: "default", href: '/admin/funcionario', icon: UserCircle },
    { title: 'Visualizar Mapa', variant: "default", href: '/admin/viewmap', icon: Map },
];
import React from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useUser, SignedIn, SignedOut } from '@clerk/clerk-react';
import { LayoutDashboard, IceCream2, ShoppingBag, Users, Settings, LogOut } from 'lucide-react';

export default function AdminLayout() {
  const { user, isLoaded } = useUser();
  const location = useLocation();

  if (!isLoaded) return <div className="min-h-screen flex items-center justify-center bg-[#fdfbf7]">Loading...</div>;

  // Real auth logic would fetch the user's role from the backend /api/auth/me or check publicMetadata
  // For now, we assume if they are at /admin and logged in via Clerk, we show it, or check a hardcoded email
  // You would typically set `publicMetadata.role = 'admin'` via the backend webhook.

  const menu = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Flavors', path: '/admin/flavors', icon: <IceCream2 className="w-5 h-5" /> },
    { name: 'Orders', path: '/admin/orders', icon: <ShoppingBag className="w-5 h-5" /> },
    { name: 'Customers', path: '/admin/customers', icon: <Users className="w-5 h-5" /> },
    { name: 'Testimonials', path: '/admin/testimonials', icon: <Users className="w-5 h-5" /> }, // Reusing Users icon
    { name: 'Settings', path: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex">
      <SignedOut>
        <Navigate to="/" replace />
      </SignedOut>

      <SignedIn>
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-[#4a3531]/10 flex flex-col fixed h-full z-40">
          <div className="p-6 border-b border-[#4a3531]/10">
            <Link to="/" className="font-serif font-bold text-2xl text-[#4a3531]">
              DropScoop. <span className="text-[#ff7fb3] text-sm tracking-widest font-sans uppercase block mt-1">Admin</span>
            </Link>
          </div>

          <div className="flex flex-col gap-2 p-4 flex-grow">
            {menu.map(item => {
              const isActive = location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/admin');
              return (
                <Link 
                  key={item.name} 
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                    isActive 
                      ? 'bg-[#4a3531] text-white shadow-md' 
                      : 'text-[#8c7875] hover:bg-[#fbece4] hover:text-[#4a3531]'
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="p-4 border-t border-[#4a3531]/10">
            <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#8c7875] hover:bg-red-50 hover:text-red-500 transition-all font-medium">
              <LogOut className="w-5 h-5" />
              Exit Admin
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow ml-64 p-8 max-w-7xl">
          <Outlet />
        </main>
      </SignedIn>
    </div>
  );
}

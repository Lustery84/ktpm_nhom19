import React, { type ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { authService } from '../services/authService';

interface LayoutProps {
  children: ReactNode;
  role: 'ketoan' | 'totruong';
}

const Layout: React.FC<LayoutProps> = ({ children, role }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = React.useState(false);

  const handleLogout = () => {
    authService.logout();
    setShowDropdown(false);
    navigate('/login');
  };

  const menuItems = role === 'ketoan' ? [
    { path: '/homepage-ketoan', label: 'Trang chủ' },
    { path: '/quan-ly-khoan-thu', label: 'Quản lý Khoản thu' },
    { path: '/quan-ly-dot-thu-phi', label: 'Quản lý Đợt thu phí' },
    { path: '/thong-ke-khoan-thu', label: 'Thống kê Thu phí' },
  ] : [
    { path: '/homepage-totruong', label: 'Trang chủ' },
    { path: '/quan-ly-ho-khau', label: 'Quản lý Hộ khẩu' },
    { path: '/quan-ly-nhan-khau', label: 'Quản lý Nhân khẩu' },
    { path: '/quan-ly-phong', label: 'Quản lý Phòng' },
    { path: '/quan-ly-xe', label: 'Quản lý Xe' },
    { path: '/quan-ly-tam-tru', label: 'Quản lý Tạm trú/ Tạm vắng' },
    { path: '/lich-su-thay-doi-nhan-khau', label: 'Lịch sử thay đổi Nhân khẩu' },
    { path: '/thong-ke-nhan-khau', label: 'Thống kê Nhân khẩu' },
  ];

  return (
    <div 
      className="flex flex-col min-h-screen relative"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?q=80&w=2070")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay mờ cho background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-indigo-900/85 via-purple-900/80 to-blue-900/85 backdrop-blur-sm"
        style={{
          backdropFilter: 'blur(1px)'
        }}
      ></div>

      {/* Decorative stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.6 + 0.3
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-800/95 via-indigo-900/95 to-purple-900/95 backdrop-blur-md shadow-xl border-b border-indigo-700/50 fixed top-0 left-0 right-0 z-10">
        <div className="px-6 py-4 flex items-center justify-between">
          {/* Logo and System Name */}
          <div className="flex items-center gap-4">
            <img src={Logo} alt="Bluemoon Logo" className="w-10 h-10 rounded-lg shadow-lg" />
            <div className="flex flex-col">
              <h1 className="text-white font-bold text-lg tracking-wide">CHUNG CƯ BLUEMOON</h1>
              <p className="text-indigo-200 text-sm font-medium">Hệ thống quản lý cư dân</p>
            </div>
          </div>
          
          {/* User Info */}
          <div className="relative">
            <button
              className="bg-white/10 backdrop-blur-sm text-white font-medium py-2 px-4 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-white/30"
              onClick={() => setShowDropdown(v => !v)}
            >
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold">
                  Xin chào, <span className="text-indigo-200">totruong</span>
                </div>
                <div className="text-xs text-indigo-300">
                  ({role === 'ketoan' ? 'Kế toán viên' : 'Tổ trưởng'})
                </div>
              </div>
              <svg className={`w-4 h-4 text-white transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-md border border-indigo-200/50 rounded-lg shadow-xl z-20 overflow-hidden">
                <div className="px-4 py-3 bg-indigo-50/50 border-b border-indigo-200/50">
                  <p className="text-sm font-medium text-gray-900">totruong</p>
                  <p className="text-xs text-gray-600">{role === 'ketoan' ? 'Kế toán viên' : 'Tổ trưởng'}</p>
                </div>
                <button
                  className="block w-full text-left px-4 py-3 text-sm text-red-600 font-medium hover:bg-red-50 transition-colors duration-150 flex items-center gap-2"
                  onClick={handleLogout}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Content Area: Sidebar + Main Content */}
      <div className="flex flex-1 pt-20 relative z-10">
        {/* Sidebar */}
        <div className="w-64 bg-white/95 backdrop-blur-md shadow-xl flex flex-col fixed top-20 bottom-0 border-r border-indigo-200/50">
          <nav className="mt-2 flex-1 overflow-y-auto">
            <ul className="flex flex-col h-full">
              {menuItems.map(item => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`block text-sm transition-all duration-200 border-l-4 ${
                        isActive 
                          ? 'border-indigo-500 bg-indigo-50/80 text-indigo-700 font-semibold' 
                          : 'border-transparent text-gray-700 hover:bg-indigo-50/50 hover:text-indigo-600 font-medium'
                      }`}
                      style={{
                         padding: '14px 20px',
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li className="mt-auto border-t border-indigo-200/50">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-sm text-red-600 font-medium hover:bg-red-50 transition-all duration-200 flex items-center gap-2"
                  style={{
                     padding: '14px 20px',
                  }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Đăng xuất
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col pl-64">
          <main className="flex-1 p-4 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;

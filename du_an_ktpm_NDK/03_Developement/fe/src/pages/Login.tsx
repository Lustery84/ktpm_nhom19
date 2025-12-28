import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { authService } from '../services/authService';

const roles = [
  { label: "Kế toán", value: "ketoan" },
  { label: "Tổ trưởng/Tổ phó", value: "totruong" },
];

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(roles[0].value);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in and redirect
  useEffect(() => {
    if (authService.isAuthenticated()) {
      const user = authService.getCurrentUser();
      if (user?.role === 'admin' || user?.role === 'accountant') {
        navigate("/homepage-ketoan", { replace: true });
      } else if (user?.role === 'manager') {
        navigate("/homepage-totruong", { replace: true });
      }
    }
    
    // Load remembered login info
    const savedLoginInfo = localStorage.getItem('loginInfo');
    if (savedLoginInfo) {
      const { username: savedUsername, role: savedRole } = JSON.parse(savedLoginInfo);
      setUsername(savedUsername);
      setRole(savedRole);
      setRememberMe(true);
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password || !role) {
      setError("Vui lòng nhập đầy đủ thông tin và chọn vai trò.");
      return;
    }
    
    setError("");
    setLoading(true);
    
    try {
      // Gọi API đăng nhập
      const response = await authService.login({ username, password });
      
      // Kiểm tra role phù hợp
      const userRole = response.user.role;
      const isRoleMatch = (role === "ketoan" && (userRole === "admin" || userRole === "accountant")) ||
                         (role === "totruong" && (userRole === "admin" || userRole === "manager"));
      
      if (!isRoleMatch) {
        setError("Vai trò được chọn không phù hợp với tài khoản.");
        return;
      }
      
      // Lưu thông tin nếu chọn ghi nhớ
      if (rememberMe) {
        localStorage.setItem('loginInfo', JSON.stringify({ username, role }));
      } else {
        localStorage.removeItem('loginInfo');
      }
      
      // Điều hướng theo role
      if (role === "ketoan") {
        navigate("/homepage-ketoan");
      } else {
        navigate("/homepage-totruong");
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || "Đăng nhập thất bại. Vui lòng kiểm tra thông tin đăng nhập.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8 px-4 relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/moonlight-background.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      
      {/* Overlay mờ cho background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-indigo-900/70 via-purple-900/65 to-blue-900/70"
        style={{
          backdropFilter: 'blur(1px)'
        }}
      ></div>

      {/* Decorative stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: Math.random() * 0.8 + 0.2
            }}
          />
        ))}
      </div>

      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-[480px] p-10 flex flex-col gap-6 relative z-10 border border-white/20">
        {/* Icon and Title */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full border-4 border-indigo-500 flex items-center justify-center mb-4 bg-indigo-50/50 backdrop-blur-sm shadow-lg">
            <img src={Logo} alt="BlueMoon Logo" className="w-12 h-12 object-contain" />
          </div>
          <h1 className="text-3xl font-bold text-indigo-800 mb-2">Blue Moon</h1>
          <p className="text-gray-600 text-sm">Hệ thống quản lý chung cư</p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="relative">
            <input
              id="username"
              name="username"
              type="text"
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base placeholder-gray-400 transition-all shadow-sm"
              autoComplete="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Tên đăng nhập"
              required
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-indigo-500 rounded-full"></div>
          </div>

          {/* Role Selection */}
          <div className="relative">
            <select
              id="role"
              name="role"
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base text-gray-700 transition-all appearance-none cursor-pointer shadow-sm"
              value={role}
              onChange={e => setRole(e.target.value)}
              required
            >
              <option value="" disabled>Chọn vai trò</option>
              {roles.map(r => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Password Field */}
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base placeholder-gray-400 transition-all shadow-sm"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Mật khẩu"
              required
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-500 hover:text-indigo-600 focus:outline-none transition-colors"
              onClick={() => setShowPassword(v => !v)}
              tabIndex={-1}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {showPassword ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.29 3.29m0 0L12 12m-5.71-5.71L12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                )}
              </svg>
            </button>
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                id="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-indigo-500 border-gray-300 rounded focus:ring-indigo-400 cursor-pointer"
              />
              <label htmlFor="rememberMe" className="text-sm text-gray-700 cursor-pointer flex items-center gap-1">
                <span>Ghi nhớ đăng nhập</span>
              </label>
            </div>
            <Link to="/forget-password" className="text-sm text-indigo-500 hover:text-indigo-600 hover:underline">
              Quên mật khẩu?
            </Link>
          </div>

          {error && (
            <div className="bg-red-50/90 backdrop-blur-sm border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-white font-medium text-base shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
            style={{
              background: 'linear-gradient(90deg, #4f46e5 0%, #6366f1 50%, #818cf8 100%)'
            }}
          >
            <span className="relative z-10">{loading ? 'Đang đăng nhập...' : 'Đăng nhập'}</span>
          </button>
        </form>
      </div>

      <footer className="mt-8 text-white/80 text-sm text-center relative z-10">
        @2025 Hệ thống Quản lý Thu phí Chung cư BlueMoon
      </footer>
    </div>
  );
};

export default Login;
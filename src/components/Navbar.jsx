import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import {
  Dumbbell,
  Search,
  Heart,
  ShoppingBag,
  Sun,
  Moon,
  Globe,
  User,
  LogOut,
  ShieldAlert,
  Menu,
  X,
} from "lucide-react";

export const Navbar = () => {
  const {
    language,
    setLanguage,
    theme,
    toggleTheme,
    cartCount,
    wishlist,
    user,
    logoutUser,
    setAuthModalOpen,
    t,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [navSearch, setNavSearch] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (navSearch.trim()) {
      navigate(`/shop?search=${encodeURIComponent(navSearch.trim())}`);
      setNavSearch("");
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { to: "/", label: t.nav.home },
    { to: "/shop", label: t.nav.shop },
    { to: "/workouts", label: t.nav.workouts },
    { to: "/about", label: t.nav.about },
    { to: "/contact", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group flex-shrink-0"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 group-hover:scale-105 group-hover:rotate-6 transition-all duration-300">
              <Dumbbell className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                SOG'LIQ <span className="text-emerald-500">&</span> SPORT
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-slate-400 block -mt-1">
                Fitness & Health Store
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40"
                      : "text-slate-600 dark:text-slate-300 hover:text-emerald-500 hover:bg-slate-50 dark:hover:bg-slate-900"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  isActive
                    ? "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40"
                    : "text-slate-500 dark:text-slate-400 hover:text-teal-500 hover:bg-slate-50 dark:hover:bg-slate-900"
                }`
              }
            >
              <ShieldAlert className="w-3.5 h-3.5 text-teal-500" />
              <span>Admin</span>
            </NavLink>
          </nav>

          {/* Search bar (Desktop) */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center relative flex-1 max-w-xs xl:max-w-sm"
          >
            <input
              type="text"
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
              placeholder={t.nav.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 rounded-full text-xs bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
          </form>

          {/* Action Utilities */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1 px-2.5 py-2 rounded-xl text-xs font-bold uppercase bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-emerald-500 border border-slate-200/80 dark:border-slate-800 transition"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-500" />
                <span>{language}</span>
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-1 z-50">
                  <button
                    onClick={() => {
                      setLanguage("uz");
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs font-medium flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 ${
                      language === "uz" ? "text-emerald-500 font-bold" : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <span>🇺🇿 O'zbekcha</span>
                  </button>
                  <button
                    onClick={() => {
                      setLanguage("ru");
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs font-medium flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 ${
                      language === "ru" ? "text-emerald-500 font-bold" : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <span>🇷🇺 Русский</span>
                  </button>
                  <button
                    onClick={() => {
                      setLanguage("en");
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs font-medium flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 ${
                      language === "en" ? "text-emerald-500 font-bold" : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <span>🇬🇧 English</span>
                  </button>
                </div>
              )}
            </div>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              title={language === "ru" ? "Сменить тему" : language === "en" ? "Toggle theme" : "Rejimni o'zgartirish"}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-emerald-500 border border-slate-200/80 dark:border-slate-800 transition"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-500" />
              )}
            </button>

            {/* Wishlist Button */}
            <Link
              to="/wishlist"
              title={t.nav.wishlist}
              className="relative p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-rose-500 border border-slate-200/80 dark:border-slate-800 transition"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-extrabold flex items-center justify-center shadow-md animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <Link
              to="/cart"
              title={t.nav.cart}
              className="relative p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/25 transition flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-white text-emerald-600 text-[10px] font-black flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Profile / Auth */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-white text-xs font-bold"
                >
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-xs font-black">
                    {user.name ? user.name[0].toUpperCase() : "U"}
                  </div>
                  <span className="hidden sm:inline max-w-[90px] truncate">{user.name}</span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                      <div className="font-bold text-xs text-slate-900 dark:text-white">{user.name}</div>
                      <div className="text-[11px] text-slate-400">{user.username}</div>
                      {user.role === "admin" && (
                        <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500/10 text-teal-500">
                          Admin
                        </span>
                      )}
                    </div>
                    {user.role === "admin" && (
                      <Link
                        to="/admin"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        {language === "ru" ? "Панель управления" : language === "en" ? "Control Panel" : "Boshqaruv Paneli"}
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logoutUser();
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>{t.nav.logout}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-emerald-500 bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 transition"
              >
                <User className="w-3.5 h-3.5" />
                <span>{t.nav.login}</span>
              </button>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative mt-2">
            <input
              type="text"
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
              placeholder={t.nav.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          </form>

          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                    isActive
                      ? "text-emerald-500 bg-emerald-500/10 font-bold"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <NavLink
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-bold text-teal-600 dark:text-teal-400 flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Admin Panel</span>
            </NavLink>
          </nav>

          {!user && (
            <button
              onClick={() => {
                setAuthModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>{t.nav.login}</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};

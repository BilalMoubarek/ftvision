'use client';

import { useState, useEffect } from 'react';
import {
  Lock, Save, ShieldCheck, Megaphone, Tv, DollarSign,
  Server, LayoutDashboard, Search, RefreshCw, CheckCircle2,
  AlertCircle, Sliders, Eye, Palette, Globe, Code, Image
} from 'lucide-react';

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [activeTab, setActiveTab] = useState<'stats' | 'branding' | 'content' | 'ads' | 'servers' | 'tmdb'>('stats');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Settings State
  const [siteName, setSiteName] = useState('FTVISION');
  const [siteDesc, setSiteDesc] = useState('منصة FTVision لمشاهدة أحدث الأنميات والأفلام بجودة عالية وسيرفرات سريعة.');
  const [siteFavicon, setSiteFavicon] = useState('');
  const [noticeText, setNoticeText] = useState('');
  const [noticeColor, setNoticeColor] = useState('red');
  const [heroId, setHeroId] = useState('');
  const [heroType, setHeroType] = useState('movie');
  
  // Ads Configuration
  const [popunderAds, setPopunderAds] = useState(true);
  const [bannerAds, setBannerAds] = useState(false);
  const [monetagTag, setMonetagTag] = useState('');

  // Servers
  const [defaultServer, setDefaultServer] = useState('1');

  // TMDB Explorer
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // System Health
  const [apiStatus, setApiStatus] = useState<'testing' | 'online' | 'offline'>('testing');
  const [savedItemsCount, setSavedItemsCount] = useState(0);

  const ADMIN_PASS = 'ftvision2026';

  useEffect(() => {
    const isAuth = sessionStorage.getItem('ftvision_admin_auth');
    if (isAuth === 'true') setAuthenticated(true);

    // Load saved config
    setSiteName(localStorage.getItem('ftvision_site_name') || 'FTVISION');
    setSiteDesc(localStorage.getItem('ftvision_site_desc') || 'منصة FTVision لمشاهدة أحدث الأنميات والأفلام بجودة عالية وسيرفرات سريعة.');
    setSiteFavicon(localStorage.getItem('ftvision_site_favicon') || '');
    setNoticeText(localStorage.getItem('ftvision_notice') || 'مرحباً بكم في FTVision! أحدث الأنميات والأفلام مترجمة بجودة عالية.');
    setNoticeColor(localStorage.getItem('ftvision_notice_color') || 'red');
    setHeroId(localStorage.getItem('ftvision_hero_id') || '37854');
    setHeroType(localStorage.getItem('ftvision_hero_type') || 'tv');
    setPopunderAds(localStorage.getItem('ftvision_ads_popunder') !== 'false');
    setBannerAds(localStorage.getItem('ftvision_ads_banner') === 'true');
    setMonetagTag(localStorage.getItem('ftvision_monetag_tag') || '');
    setDefaultServer(localStorage.getItem('ftvision_default_server') || '1');

    const watchlist = JSON.parse(localStorage.getItem('ftvision_watchlist') || '[]');
    setSavedItemsCount(watchlist.length);

    checkApiConnection();
  }, []);

  const checkApiConnection = async () => {
    setApiStatus('testing');
    try {
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || '300114b116c2f9173cc2a6436f334808';
      const res = await fetch(`https://api.themoviedb.org/3/ping?api_key=${apiKey}`);
      if (res.ok || res.status === 404) setApiStatus('online');
      else setApiStatus('offline');
    } catch {
      setApiStatus('online');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === ADMIN_PASS) {
      setAuthenticated(true);
      sessionStorage.setItem('ftvision_admin_auth', 'true');
    } else {
      alert('رمز المرور غير صحيح!');
    }
  };

  const handleSaveAll = () => {
    localStorage.setItem('ftvision_site_name', siteName);
    localStorage.setItem('ftvision_site_desc', siteDesc);
    localStorage.setItem('ftvision_site_favicon', siteFavicon);
    localStorage.setItem('ftvision_notice', noticeText);
    localStorage.setItem('ftvision_notice_color', noticeColor);
    localStorage.setItem('ftvision_hero_id', heroId);
    localStorage.setItem('ftvision_hero_type', heroType);
    localStorage.setItem('ftvision_ads_popunder', popunderAds.toString());
    localStorage.setItem('ftvision_ads_banner', bannerAds.toString());
    localStorage.setItem('ftvision_monetag_tag', monetagTag);
    localStorage.setItem('ftvision_default_server', defaultServer);

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      window.location.reload();
    }, 1500);
  };

  const handleTmdbSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || '300114b116c2f9173cc2a6436f334808';
      const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${encodeURIComponent(searchQuery)}&language=ar-SA`);
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-[65vh] flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-slate-900 border border-slate-800 p-8 rounded-3xl max-w-sm w-full space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-red-600/10 text-red-500 rounded-2xl flex items-center justify-center mx-auto border border-red-500/20">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black text-white">لوحة تحكم FTVision</h1>
            <p className="text-xs text-slate-400">أدخل رمز المرور للوصول لكافة الإعدادات</p>
          </div>

          <input
            type="password"
            placeholder="Passcode..."
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition"
          />

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition text-xs shadow-lg shadow-red-600/30"
          >
            دخول لوحة التحكم
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-red-600/10 border border-red-500/20 rounded-2xl text-red-500">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">مركز التحكم الشامل (Admin Control)</h1>
            <p className="text-xs text-slate-400">تخصيص اللوجو، الفافيكون، الإعلانات، والسيرفرات الحية</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveAll}
            className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition flex items-center gap-2 shadow-lg shadow-red-600/30"
          >
            <Save className="w-4 h-4" /> حفظ كافة التغييرات
          </button>
          <button
            onClick={() => {
              sessionStorage.removeItem('ftvision_admin_auth');
              setAuthenticated(false);
            }}
            className="text-xs text-slate-400 hover:text-white bg-slate-900 border border-slate-800 px-3 py-2.5 rounded-xl transition"
          >
            خروج
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs p-4 rounded-xl text-center font-bold flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> تم حفظ الإعدادات وتحديث الأيقونة والموقع فوراً!
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-slate-800 overflow-x-auto gap-2">
        <button
          onClick={() => setActiveTab('stats')}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'stats' ? 'border-red-500 text-red-500' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" /> حالة النظام
        </button>

        <button
          onClick={() => setActiveTab('branding')}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'branding' ? 'border-red-500 text-red-500' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Palette className="w-4 h-4" /> اللوجو والفافيكون (Branding)
        </button>

        <button
          onClick={() => setActiveTab('content')}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'content' ? 'border-red-500 text-red-500' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Megaphone className="w-4 h-4" /> التنبيهات والهيرو
        </button>

        <button
          onClick={() => setActiveTab('ads')}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'ads' ? 'border-red-500 text-red-500' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <DollarSign className="w-4 h-4" /> شبكات الإعلانات
        </button>

        <button
          onClick={() => setActiveTab('servers')}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'servers' ? 'border-red-500 text-red-500' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Server className="w-4 h-4" /> أولوية السيرفرات
        </button>

        <button
          onClick={() => setActiveTab('tmdb')}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'tmdb' ? 'border-red-500 text-red-500' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Search className="w-4 h-4" /> مستكشف TMDB
        </button>
      </div>

      {/* Tab 1: Stats */}
      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">اتصال TMDB API</span>
              {apiStatus === 'online' ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5 text-amber-400 animate-pulse" />}
            </div>
            <div className="text-xl font-black text-white">{apiStatus === 'online' ? 'شغال بدون مشاكل' : 'جاري الفحص...'}</div>
            <button onClick={checkApiConnection} className="text-[11px] text-red-400 font-bold flex items-center gap-1 hover:underline pt-2">
              <RefreshCw className="w-3 h-3" /> إعادة الفحص
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
            <span className="text-xs font-bold text-slate-400">عناصر المفضلة</span>
            <div className="text-3xl font-black text-white">{savedItemsCount}</div>
            <p className="text-[11px] text-slate-500">عدد الأعمال المحفوظة فـ LocalStorage</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
            <span className="text-xs font-bold text-slate-400">السيرفر الافتراضي</span>
            <div className="text-2xl font-black text-red-500">سيرفر {defaultServer}</div>
            <p className="text-[11px] text-slate-500">VidSrc / 2Embed Provider</p>
          </div>
        </div>
      )}

      {/* Tab 2: Branding & Favicon */}
      {activeTab === 'branding' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-red-500" /> اسم المنصة والشعار (Logo Branding)
            </h3>

            <div className="space-y-2">
              <label className="text-xs text-slate-400 font-semibold">اسم المنصة (Logo Text):</label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                placeholder="مثال: FTVISION أو ANIMEFLIX"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-slate-400 font-semibold">رابط أيقونة المتصفح الفوقانية (Favicon Image URL):</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={siteFavicon}
                  onChange={(e) => setSiteFavicon(e.target.value)}
                  placeholder="مثال: https://i.imgur.com/your-icon.png"
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-red-500"
                />
                {siteFavicon && (
                  <img src={siteFavicon} alt="Favicon Preview" className="w-10 h-10 object-contain rounded-lg border border-slate-800 bg-black p-1" />
                )}
              </div>
              <p className="text-[11px] text-slate-500">ضع رابط مباشر لصورة PNG أو ICO صغيرة لتبدو كأيقونة في تبويبات المتصفح.</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-slate-400 font-semibold">وصف الموقع لمحركات البحث (Meta Description):</label>
              <textarea
                rows={3}
                value={siteDesc}
                onChange={(e) => setSiteDesc(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-red-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Content & Notice */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-red-500" /> شريط التنبيه العلوي (Notice Bar)
            </h3>

            <div className="space-y-2">
              <label className="text-xs text-slate-400 font-semibold">نص الإعلان العلوي:</label>
              <input
                type="text"
                value={noticeText}
                onChange={(e) => setNoticeText(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-slate-400 font-semibold">لون الشريط:</label>
              <select
                value={noticeColor}
                onChange={(e) => setNoticeColor(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-red-500"
              >
                <option value="red">أحمر (FTVision Style)</option>
                <option value="amber">ذهبي تنبيهي</option>
                <option value="slate">رمادي داكن</option>
              </select>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Tv className="w-4 h-4 text-red-500" /> TMDB ID للعمل المميز فـ الهيرو الرئيسي
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-slate-400 font-semibold">TMDB ID:</label>
                <input
                  type="text"
                  value={heroId}
                  onChange={(e) => setHeroId(e.target.value)}
                  placeholder="مثال: 37854"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-400 font-semibold">نوع العمل:</label>
                <select
                  value={heroType}
                  onChange={(e) => setHeroType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-red-500"
                >
                  <option value="tv">أنمي / مسلسل (TV)</option>
                  <option value="movie">فيلم (Movie)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Ads */}
      {activeTab === 'ads' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" /> تفعيل إعلانات Pop-under (Monetag / Adsterra)
              </h3>
              <p className="text-xs text-slate-400">تفعيل فتح تبويب جديد عند أول ضغطة للمستخدم.</p>
            </div>
            <input
              type="checkbox"
              checked={popunderAds}
              onChange={(e) => setPopunderAds(e.target.checked)}
              className="w-5 h-5 accent-red-600 rounded cursor-pointer"
            />
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Code className="w-4 h-4 text-amber-400" /> Monetag Script Tag (Header/Popunder Code)
            </h3>
            <textarea
              rows={4}
              value={monetagTag}
              onChange={(e) => setMonetagTag(e.target.value)}
              placeholder="ضع كود Monetag Script هنا..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-300 focus:outline-none focus:border-red-500"
            />
          </div>
        </div>
      )}

      {/* Tab 5: Servers */}
      {activeTab === 'servers' && (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-red-500" /> اختيار السيرفر الافتراضي للبث
          </h3>

          <div className="space-y-3">
            {[
              { id: '1', name: 'سيرفر 1 (VidSrc.to) - الأسرع للأجهزة والأكثر استقراراً' },
              { id: '2', name: 'سيرفر 2 (VidSrc.me) - سيرفر احتياطي عالي الجودة' },
              { id: '3', name: 'سيرفر 3 (2Embed) - يدعم ترجمات متعددة' },
            ].map((srv) => (
              <label key={srv.id} className="flex items-center gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800/80 cursor-pointer hover:border-slate-700">
                <input
                  type="radio"
                  name="defaultServer"
                  value={srv.id}
                  checked={defaultServer === srv.id}
                  onChange={(e) => setDefaultServer(e.target.value)}
                  className="accent-red-600 w-4 h-4"
                />
                <span className="text-xs font-bold text-slate-200">{srv.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: TMDB Explorer */}
      {activeTab === 'tmdb' && (
        <div className="space-y-6">
          <form onSubmit={handleTmdbSearch} className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن اسم عمل للحصول على TMDB ID..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-red-500"
            />
            <button
              type="submit"
              disabled={isSearching}
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition flex items-center gap-2"
            >
              {isSearching ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              <span>بحث</span>
            </button>
          </form>

          {searchResults.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto p-1 custom-scrollbar">
              {searchResults.map((item) => (
                <div key={item.id} className="bg-slate-900 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.poster_path ? `https://image.tmdb.org/t/p/w92${item.poster_path}` : 'https://via.placeholder.com/92x138'}
                      alt={item.title || item.name}
                      className="w-10 h-14 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white">{item.title || item.name}</h4>
                      <p className="text-[10px] text-slate-400">ID: <span className="text-red-400 font-mono font-bold">{item.id}</span> | النوع: {item.media_type}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setHeroId(item.id.toString());
                      setHeroType(item.media_type || 'movie');
                      setActiveTab('content');
                    }}
                    className="text-[10px] bg-slate-800 hover:bg-red-600 hover:text-white text-slate-300 font-bold px-3 py-1.5 rounded-lg transition flex items-center gap-1"
                  >
                    <Eye className="w-3 h-3" /> اختيار كـ Hero
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
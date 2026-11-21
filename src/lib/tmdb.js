const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || '300114b116c2f9173cc2a6436f334808';
const BASE_URL = 'https://api.themoviedb.org/3';

export const tmdb = {
  // جلب الأعمال الأكثر ترند
  getTrending: async (type = 'all') => {
    try {
      const res = await fetch(
        `${BASE_URL}/trending/${type}/day?api_key=${API_KEY}&language=ar-SA`,
        { next: { revalidate: 3600 } }
      );
      if (!res.ok) return [];
      const data = await res.json();
      return data.results || [];
    } catch (error) {
      console.error('Error fetching trending:', error);
      return [];
    }
  },

  // جلب قائمة الأنميات
  getAnime: async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=16&sort_by=popularity.desc&language=ar-SA`,
        { next: { revalidate: 3600 } }
      );
      if (!res.ok) return [];
      const data = await res.json();
      return data.results || [];
    } catch (error) {
      console.error('Error fetching anime:', error);
      return [];
    }
  },

  // جلب الأفلام فقط
  getMovies: async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&language=ar-SA`,
        { next: { revalidate: 3600 } }
      );
      if (!res.ok) return [];
      const data = await res.json();
      return data.results || [];
    } catch (error) {
      console.error('Error fetching movies:', error);
      return [];
    }
  },

  // البحث عن فيلم أو أنمي
  search: async (query) => {
    try {
      const res = await fetch(
        `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=ar-SA`,
        { next: { revalidate: 60 } }
      );
      if (!res.ok) return [];
      const data = await res.json();
      return data.results || [];
    } catch (error) {
      console.error('Error searching:', error);
      return [];
    }
  },

  // تفاصيل فيلم أو مسلسل
  getDetails: async (type, id) => {
    try {
      const res = await fetch(
        `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&append_to_response=videos,credits&language=ar-SA`,
        { next: { revalidate: 3600 } }
      );
      if (!res.ok) return null;
      return await res.json();
    } catch (error) {
      console.error('Error fetching details:', error);
      return null;
    }
  }
};
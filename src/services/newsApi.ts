export const fetchDailyBrief = async () => {
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;

  if (!apiKey) {
    console.error('VITE_NEWS_API_KEY não está configurada');
    return [];
  }

  const categories = ['technology', 'science', 'business', 'entertainment'];
  const allArticles = [];

  for (const category of categories) {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=br&category=${category}&pageSize=5&apiKey=${apiKey}`
    );

    const data = await response.json();

    if (data.articles) {
      allArticles.push(...data.articles.map((article: any) => ({
        headline: article.title,
        summary: article.description || 'Sem resumo disponível',
        category: category,
        source: article.source.name,
        url: article.url,
        published_at: article.publishedAt,
        urlToImage: article.urlToImage
      })));
    }
  }

  return allArticles.slice(0, 15);
};

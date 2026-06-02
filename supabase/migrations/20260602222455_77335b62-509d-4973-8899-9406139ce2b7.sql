
-- Profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.profiles TO anon;
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Thoughts
CREATE TABLE public.thoughts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  image_url TEXT,
  likes_count INTEGER NOT NULL DEFAULT 0,
  is_public BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX thoughts_created_at_idx ON public.thoughts (created_at DESC);
GRANT SELECT ON public.thoughts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.thoughts TO authenticated;
GRANT ALL ON public.thoughts TO service_role;
ALTER TABLE public.thoughts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public thoughts viewable by all" ON public.thoughts FOR SELECT USING (is_public = true OR auth.uid() = user_id);
CREATE POLICY "Users insert own thoughts" ON public.thoughts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own thoughts" ON public.thoughts FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users delete own thoughts" ON public.thoughts FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Articles
CREATE TABLE public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  category TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  cover_image TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX articles_created_at_idx ON public.articles (created_at DESC);
GRANT SELECT ON public.articles TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.articles TO authenticated;
GRANT ALL ON public.articles TO service_role;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published articles viewable by all" ON public.articles FOR SELECT USING (is_published = true OR auth.uid() = user_id);
CREATE POLICY "Users insert own articles" ON public.articles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own articles" ON public.articles FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users delete own articles" ON public.articles FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Library
CREATE TABLE public.library (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('book','movie','tv','podcast','essay','tool','website')),
  cover TEXT,
  notes TEXT,
  url TEXT,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  is_public BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.library TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.library TO authenticated;
GRANT ALL ON public.library TO service_role;
ALTER TABLE public.library ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public library items viewable by all" ON public.library FOR SELECT USING (is_public = true OR auth.uid() = user_id);
CREATE POLICY "Users insert own library" ON public.library FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own library" ON public.library FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users delete own library" ON public.library FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Daily brief (cached news)
CREATE TABLE public.daily_brief (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  headline TEXT NOT NULL,
  summary TEXT,
  category TEXT NOT NULL,
  source TEXT,
  url TEXT,
  image_url TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX daily_brief_published_at_idx ON public.daily_brief (published_at DESC);
GRANT SELECT ON public.daily_brief TO anon;
GRANT SELECT ON public.daily_brief TO authenticated;
GRANT ALL ON public.daily_brief TO service_role;
ALTER TABLE public.daily_brief ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Daily brief viewable by all" ON public.daily_brief FOR SELECT USING (true);

-- Likes
CREATE TABLE public.likes (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  thought_id UUID NOT NULL REFERENCES public.thoughts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, thought_id)
);
GRANT SELECT ON public.likes TO anon;
GRANT SELECT, INSERT, DELETE ON public.likes TO authenticated;
GRANT ALL ON public.likes TO service_role;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Likes viewable by all" ON public.likes FOR SELECT USING (true);
CREATE POLICY "Users insert own likes" ON public.likes FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own likes" ON public.likes FOR DELETE TO authenticated USING (auth.uid() = user_id);

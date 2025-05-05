
-- Function to safely add XP to a user
CREATE OR REPLACE FUNCTION public.add_user_xp(user_id UUID, xp_amount INTEGER)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.user_profiles
  SET xp = xp + xp_amount,
      updated_at = now()
  WHERE id = user_id;
END;
$$;

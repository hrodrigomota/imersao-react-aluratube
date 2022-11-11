import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://vvyhkjartvujeskmsbtp.supabase.co";
const PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2eWhramFydHZ1amVza21zYnRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxODAwMDIsImV4cCI6MTk4Mzc1NjAwMn0.UEEC7vMoVLhKIObrfCnXyd-r5pxm2Ht1ex2J97yOy5k";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
  return {
    getAllVideos() {
      return supabase.from("video").select("*");
    },
  };
}

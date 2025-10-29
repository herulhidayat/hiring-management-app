export const API_PATH = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  
  console.log(supabaseUrl)
    return {
      job: `${supabaseUrl}/rest/v1/job`,
    }
}
export const API_PATH = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  
  console.log(supabaseUrl)
    return {
      job: `${supabaseUrl}/rest/v1/job`,
      profiles: `${supabaseUrl}/rest/v1/profiles`,
      login: `${supabaseUrl}/auth/v1/token`
    }
}
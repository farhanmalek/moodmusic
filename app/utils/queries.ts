import axios, { AxiosResponse } from "axios";

interface LoginResponse {
  auth_url: string;
}


export default async function handleSpotifyLogin(): Promise<void> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
      const response: AxiosResponse<LoginResponse> = await axios.get(
        `${apiUrl}auth/login`
      );
      const { auth_url } = response.data;

      if (!auth_url) {
        throw new Error("auth_url not found in response");
      }
      
      window.location.href = auth_url;
  } catch (error: any) {
    console.error("Error fetching data from API:", error.message || error);
  }
}
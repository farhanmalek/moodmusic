import axios, { AxiosResponse } from "axios";
import { quizAnswers } from "../search/page";
interface LoginResponse {
  auth_url: string;
}


const apiUrl = process.env.NEXT_PUBLIC_API_URL;


export default async function handleSpotifyLogin(): Promise<void> {
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

export async function logOutUser(): Promise<void> {
  try {
    
    await axios.get(`${apiUrl}auth/logout`, {
      withCredentials: true 
    })


  } catch (error: any) {
    console.error("Error Logging User Out", error.message || error)
    
  }
}


export async function submitUserQuiz(quizAnswers: quizAnswers): Promise<void> {
  try {
    const response = await axios.post(
      `${apiUrl}quiz/create`,
      quizAnswers, 
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error: any) {
    console.error("Error saving quiz:", error.response?.data || error.message || error);
    throw error; 
  }
}
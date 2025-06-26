import axios, { AxiosResponse } from "axios";
import { quizAnswers } from "../search/page";
interface LoginResponse {
  auth_url: string;
}

// Use production API URL
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://moodmusic-backend.onrender.com/';

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

interface fetchResultData {
  songs: Array<Song>
}

export interface Song {
  name: string,
  artist: string,
  album: string,
  image: string,
  uri: string
}

export async function fetchSearchResults(query: string): Promise<fetchResultData> {
  try {
    const response = await axios.get(
      `${apiUrl}playlists/search?prompt=${encodeURIComponent(query)}`, {
        withCredentials: true
      }
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Could not fetch query results",
      error.response?.data || error.message || error
    );
    throw new Error(error.response?.data?.message || "Could not fetch search results");
  }
}

export async function createUserPlaylist(songs: Array<Song>, playlistName: string, image?: string | null, query?:string | null) {

  const reqObj = {
    songs: {
      songs
    },
    playlist_name: playlistName,
    image,
    query
  }
  try {

    const response = await axios.post(`${apiUrl}playlists/create`, reqObj, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json"
      }
      })
    return response.data


    
  } catch (error:any) {
    console.error(error)
  }
  
}

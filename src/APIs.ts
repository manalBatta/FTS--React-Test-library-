import axios from "axios";

axios.defaults.baseURL = "https://api.realworld.io/api/";

interface UserForRegistration {
  username: string;
  email: string;
  password: string;
}

export interface User {
  username: string;
  bio: string | null;
  image: string | null;
  email: string;
  token: string;
}

export type GenericErrors = Record<string, string[]>;

export async function signUp(user: UserForRegistration) {
  return await fetch("https://api.realworld.io/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
}

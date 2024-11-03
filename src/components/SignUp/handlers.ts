import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("https://api.realworld.io/api/users", async (req) => {
    console.log(req);
    return HttpResponse.json({
      user: {
        username: "manooooooool",
        email: "ValidEmail@gmail.com",
        password: "12345678",
      },
    });
  }),
];

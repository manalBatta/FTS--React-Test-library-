import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("https://api.realworld.io/api/users", async (props) => {
    const body = JSON.parse(props?.request?._bodyText);
    if (body.password !== "1122334455") {
      return HttpResponse.json({
        user: {
          username: "manooooooool",
          email: "Hello ",
          token: "mock-token",
        },
      });
    }

    return HttpResponse.error();
  }),
];

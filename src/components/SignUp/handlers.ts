import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("https://api.realworld.io/api/users", async (props) => {
    const body = JSON.parse((props.request as any)._bodyText);
    if (body.password !== "1122334455") {
      console.log("sussecfull ");
      return HttpResponse.json({
        user: {
          username: body.username,
          email: body.email,
          password: body.password,
        },
      });
    }

    return HttpResponse.error();
  }),
];

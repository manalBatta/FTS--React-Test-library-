export { default } from "./SignUp";
if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser"); // Adjust the import path as needed
  worker.start();
}

export const serverURL =
  process.env.NODE_ENV === "production"
    ? "https://sharecode-back.onrender.com/"
    : process.env.REACT_APP_SERVER_URL;

console.log(
  "process.env.REACT_APP_SERVER_URL: " + process.env.REACT_APP_SERVER_URL
);
console.log("process.env.NODE_ENV: " + process.env.NODE_ENV);

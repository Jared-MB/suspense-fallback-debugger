export const ENV = {
  GITHUB_ACCESS_TOKEN: process.env.GITHUB_ACCESS_TOKEN || "",
  __IS__DEV__: process.env.NODE_ENV === "development",
};

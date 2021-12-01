export * as convert from "./convert";

export const purify = (stdout: string) => {
  return stdout.replace(/(\r\n|\n|\r)/gm, "").trim();
};

/* eslint-disable @typescript-eslint/no-var-requires */
const twoFactor = require("./dist");

const generateSecretAsync = (options) => {
  return new Promise((resolve) => {
    const result = twoFactor.generateSecret(options);
    resolve(result);
  });
};

const generateTokenAsync = (secret) => {
  return new Promise((resolve) => {
    const result = twoFactor.generateToken(secret);
    resolve(result);
  });
};

const verifyTokenAsync = (secret, token, window) => {
  return new Promise((resolve) => {
    const result = twoFactor.verifyToken(secret, token, window);
    resolve(result);
  });
};

const runAsync = async () => {
  console.log("*******************************");
  console.log("Generating New Secret");
  const newSecret = await generateSecretAsync({ name: "My Awesome App", account: "johndoe" });
  console.log(newSecret);

  console.log("*******************************");
  console.log("Generating New Token With Secret " + newSecret.secret);
  const newToken = await generateTokenAsync(newSecret.secret);
  console.log(newToken);

  console.log("*******************************");
  console.log("Verifying Valid Token");
  console.log(await verifyTokenAsync(newSecret.secret, newToken.token));

  console.log("*******************************");
  console.log("Verifying Valid Token - Window: 1");
  console.log(await verifyTokenAsync(newSecret.secret, newToken.token, 1));

  console.log("*******************************");
  console.log("Verifying Valid Token - Window: -3");
  console.log(await verifyTokenAsync(newSecret.secret, newToken.token, -3));

  console.log("*******************************");
  console.log("Verifying Invalid Token");
  console.log(await verifyTokenAsync(newSecret.secret, "11111"));

  console.log("*******************************");
  console.log("Done - Star Me On Github");
};

runAsync().catch(console.error);


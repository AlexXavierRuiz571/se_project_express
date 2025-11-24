const { NODE_ENV, JWT_SECRET } = process.env;

let finalSecret;

if (NODE_ENV === "production") {
  finalSecret = JWT_SECRET;
} else {
  finalSecret = "dev-secret";
}

module.exports = {
  JWT_SECRET: finalSecret,
};

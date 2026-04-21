const joi = require("joi");
const dns = require("dns/promises");

//format validation
const validateEmail = (email) => {
  const schema = joi.string().email().required();
  return schema.validate(email);
};

//typo detection
const suggestCorrection = (email) => {
  const fixes = {
    "gmial.com": "gmail.com",
    "gamil.com": "gmail.com",
    "gmali.com": "gmail.com",
  };

  const [name, domain] = email.split("@");

  if (fixes[domain]) {
    return `${name}@${fixes[domain]}`;
  }

  return null;
};

//domain validation
const checkDomain = async (email) => {
  const domain = email.split("@")[1];
  try {
    const records = await dns.resolveMx(domain);
    return records && records.length > 0;
  } catch (error) {
    return false;
  }
};
module.exports = { validateEmail, suggestCorrection, checkDomain };

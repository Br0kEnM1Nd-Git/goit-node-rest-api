const phoneNumberModifier = (phoneNumber) => {
  const result = phoneNumber.split("");
  result.unshift("(");
  result.splice(4, 0, ") ");
  result.splice(8, 0, "-");
  return result.join("");
};

module.exports = phoneNumberModifier;

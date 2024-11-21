const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Voting", (m) => {
  const voting = m.contract("Voting", [], {

  });

  return { voting };
});

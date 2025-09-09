import * as anchor from "@coral-xyz/anchor";

module.exports = async function (provider: anchor.AnchorProvider) {
  // Configure client to use the provider
  anchor.setProvider(provider);

  console.log("🚀 Starting deployment...");
  console.log("Network:", provider.connection.rpcEndpoint);
  console.log("Wallet:", provider.wallet.publicKey.toString());

  // Add any initialization logic here
  console.log("✅ Deployment completed successfully!");
};

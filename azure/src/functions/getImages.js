const { app } = require("@azure/functions");

const {
  BlobServiceClient,
  StorageSharedKeyCredential,
} = require("@azure/storage-blob");

const generateSASToken = require("../../lib/generateSASToken");

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;

const containerName = "images";

const sharedKeyCredential = new StorageSharedKeyCredential(
  accountName,
  accountKey
);

const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net`,
  sharedKeyCredential
);

app.http("getImages", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const imageURLs = [];
    const sasToken = await generateSASToken();

    for await (const blob of containerClient.listBlobsFlat()) {
      const imageURL = `${blob.name}?${sasToken}`;
      const url = `https://${accountName}.blob.core.windows.net/images/${imageURL}`;
      imageURLs.push({ url, name: blob.name });
    }

    const sortedImageURLs = imageURLs.sort((a, b) => {
      const aName = a.name.split("_").pop().toString().split(".").shift();
      const bName = b.name.split("_").pop().toString().split(".").shift();
      return bName - aName;
    });

    context.log(`Http function processed request for url "${request.url}"`);

    return {
      jsonBody: {
        imageURLs: sortedImageURLs,
      },
    };
  },
});

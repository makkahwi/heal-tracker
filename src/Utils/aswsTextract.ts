import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
  AnalyzeDocumentCommand,
  TextractClient,
} from "@aws-sdk/client-textract";
import { v4 as uuidv4 } from "uuid";

const s3Client = new S3Client({
  region: process.env.REACT_APP_AWS_REGION,
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY!,
  },
});

const textractClient = new TextractClient({
  region: process.env.REACT_APP_AWS_REGION,
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY!,
  },
});

export const uploadFileToS3 = async (file: File): Promise<string | null> => {
  const fileKey = `${uuidv4()}_${file.name}`;

  try {
    const command = new PutObjectCommand({
      Bucket: process.env.REACT_APP_S3_BUCKET_NAME!,
      Key: fileKey,
      Body: file,
    });
    await s3Client.send(command);
    return fileKey;
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    return null;
  }
};

export const analyzeDocumentWithTextract = async (
  fileKey: string
): Promise<any> => {
  try {
    const command = new AnalyzeDocumentCommand({
      Document: {
        S3Object: {
          Bucket: process.env.REACT_APP_S3_BUCKET_NAME!,
          Name: fileKey,
        },
      },
      FeatureTypes: ["FORMS"], // Specifies that we want to extract key-value pairs
    });

    const response = await textractClient.send(command);
    return response.Blocks; // Return the blocks containing key-value pairs and other elements
  } catch (error) {
    console.error("Error analyzing document with Textract:", error);
    throw error;
  }
};

export const extractKeyValuePairs = (blocks: any[]): Record<string, string> => {
  const keyMap: Record<string, string> = {};
  const valueMap: Record<string, string> = {};
  const keyValuePairs: Record<string, string> = {};

  // Map the keys and values by their IDs
  blocks.forEach((block) => {
    if (block.BlockType === "KEY_VALUE_SET") {
      if (block.EntityTypes && block.EntityTypes.includes("KEY")) {
        keyMap[block.Id] = block;
      } else if (block.EntityTypes && block.EntityTypes.includes("VALUE")) {
        valueMap[block.Id] = block;
      }
    }
  });

  // Pair the keys with the corresponding values
  Object.values(keyMap).forEach((keyBlock: any) => {
    const valueBlockId = keyBlock.Relationships?.find(
      (rel: any) => rel.Type === "VALUE"
    )?.Ids?.[0];
    const valueBlock: any = valueMap[valueBlockId];

    if (valueBlock) {
      const keyText = keyBlock.Text || getTextFromBlock(keyBlock, blocks);
      const valueText = valueBlock.Text || getTextFromBlock(valueBlock, blocks);
      if (keyText && valueText) {
        keyValuePairs[keyText] = valueText;
      }
    }
  });

  return keyValuePairs;
};

// Helper function to get text from a block with relationships
const getTextFromBlock = (block: any, blocks: any[]): string => {
  return block.Relationships?.map((relationship: any) =>
    relationship.Ids?.map((id: string) => blocks.find((b) => b.Id === id)?.Text)
  )
    .flat()
    .filter(Boolean)
    .join(" ");
};

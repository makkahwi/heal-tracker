import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import {
  TextractClient,
  StartDocumentTextDetectionCommand,
  GetDocumentTextDetectionCommand,
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
    // Start text detection
    const startCommand = new StartDocumentTextDetectionCommand({
      DocumentLocation: {
        S3Object: {
          Bucket: process.env.REACT_APP_S3_BUCKET_NAME!,
          Name: fileKey,
        },
      },
    });

    const startResponse = await textractClient.send(startCommand);
    const jobId = startResponse.JobId;
    if (!jobId) throw new Error("Textract job did not start.");

    // Poll for job status and retrieve results
    let jobStatus = "IN_PROGRESS";
    while (jobStatus === "IN_PROGRESS") {
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds

      const getCommand = new GetDocumentTextDetectionCommand({ JobId: jobId });
      const getResponse = await textractClient.send(getCommand);

      if (getResponse.JobStatus) {
        jobStatus = getResponse.JobStatus;
      }

      if (jobStatus === "SUCCEEDED") {
        return getResponse.Blocks;
      } else if (jobStatus === "FAILED") {
        throw new Error("Textract job failed.");
      }
    }
  } catch (error) {
    console.error("Error analyzing document with Textract:", error);
    throw error;
  }
};

interface ExtractedData {
  segmentalFatAnalysis: {
    leftTop: string;
    leftBottom: string;
    rightTop: string;
    rightBottom: string;
  };
  segmentalLeanAnalysis: {
    leftTop: string;
    leftBottom: string;
    rightTop: string;
    rightBottom: string;
  };
  testDate: string;
  inBodyScore: string;
  totalBodyWater: string;
  protein: string;
  minerals: string;
  bodyFatMass: string;
  weight: string;
  visceralFatLevel: string;
  skeletalMuscleMass: string;
}

export function extractDataFromTextract(textractData: any[]): ExtractedData {
  const result: ExtractedData = {
    segmentalFatAnalysis: {
      leftTop: "",
      leftBottom: "",
      rightTop: "",
      rightBottom: "",
    },
    segmentalLeanAnalysis: {
      leftTop: "",
      leftBottom: "",
      rightTop: "",
      rightBottom: "",
    },
    testDate: "",
    inBodyScore: "",
    totalBodyWater: "",
    protein: "",
    minerals: "",
    bodyFatMass: "",
    weight: "",
    visceralFatLevel: "",
    skeletalMuscleMass: "",
  };

  // Helper function to find the value based on keyword with additional context checks
  const findValueWithContext = (keyword: string, units?: string): string => {
    for (let i = 0; i < textractData.length; i++) {
      if (textractData[i].Text === keyword) {
        // Check the block following the keyword for the value, verifying unit if provided
        const nextBlock = textractData[i + 1];
        if (nextBlock && nextBlock.BlockType === "WORD") {
          if (units) {
            // Check if the unit follows immediately after the value
            const possibleUnitBlock = textractData[i + 2];
            if (possibleUnitBlock && possibleUnitBlock.Text === units) {
              return `${nextBlock.Text}${units}`;
            }
          } else {
            return nextBlock.Text;
          }
        }
      }
    }
    return "";
  };

  // Map the data with exact keyword matches and specific context for accuracy
  result.segmentalFatAnalysis.leftTop = findValueWithContext(
    "leftTopFat",
    "kg"
  );
  result.segmentalFatAnalysis.leftBottom = findValueWithContext(
    "leftBottomFat",
    "kg"
  );
  result.segmentalFatAnalysis.rightTop = findValueWithContext(
    "rightTopFat",
    "kg"
  );
  result.segmentalFatAnalysis.rightBottom = findValueWithContext(
    "rightBottomFat",
    "kg"
  );

  result.segmentalLeanAnalysis.leftTop = findValueWithContext(
    "leftTopLean",
    "kg"
  );
  result.segmentalLeanAnalysis.leftBottom = findValueWithContext(
    "leftBottomLean",
    "kg"
  );
  result.segmentalLeanAnalysis.rightTop = findValueWithContext(
    "rightTopLean",
    "kg"
  );
  result.segmentalLeanAnalysis.rightBottom = findValueWithContext(
    "rightBottomLean",
    "kg"
  );

  result.testDate = findValueWithContext("24.11.09");
  result.inBodyScore = findValueWithContext("InBody Score");
  result.totalBodyWater = findValueWithContext("Total Body Water", "kg");
  result.protein = findValueWithContext("Protein", "kg");
  result.minerals = findValueWithContext("Minerals", "kg");
  result.bodyFatMass = findValueWithContext("Body Fat Mass", "kg");
  result.weight = findValueWithContext("Weight", "kg");
  result.visceralFatLevel = findValueWithContext("Visceral Fat Level");
  result.skeletalMuscleMass = findValueWithContext(
    "Skeletal Muscle Mass",
    "kg"
  );

  return result;
}

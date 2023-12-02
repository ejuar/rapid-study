import { v4 as uuid } from "uuid";
import { extension } from "mime-types";
import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
// import { SageMakerRuntimeClient, InvokeEndpointCommand } from "@aws-sdk/client-sagemaker-runtime";

export const handler = async function (event, context, callback) {
  const s3Client = new S3Client({});
  // const sageMakerRuntimeClient = new SageMakerRuntimeClient({});

  const body = JSON.parse(event.body);
  const ext = extension(body.file_ext);
  const bucketName = "rapid-study-uploaded-files";
  const objectKey = `${uuid()}.${ext}`;

  // const response = {
  //   statusCode: 200,
  //   headers: {
  //     "Access-Control-Allow-Headers":
  //       "content-type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
  //     "Access-Control-Allow-Methods": "POST",
  //     "Access-Control-Allow-Origin": "*",
  //     "Access-Control-Allow-Credentials": true,
  //   },
  //   body: JSON.stringify("Hello from new Lambda!"), // data from sagemaker
  // };

  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: objectKey,
      Body: Buffer.from(body.base64String, "base64"),
      ContentType: body.file_ext,
    })
  );

  // const payload = {
  //   Bucket: bucketName,
  //   Key: objectKey
  // };

  // const sageMakerResponse = await sageMakerRuntimeClient.send(
  //   new InvokeEndpointCommand({
  //     EndpointName: "TODO: REPLACE-WITH-ENDPOINT-NAME",
  //     ContentType: body.file_ext,
  //     Body: JSON.stringify(payload),
  //   })
  // );

  // const resultBucket = sageMakerResponse.bucket; 
  // const resultKey = sageMakerResponse.key;

  // const processedData = await s3Client.send(
  //   new GetObjectCommand({
  //       Bucket: resultBucket,
  //       Key: resultKey
  //   })
  // );

  // // TODO: Assuming the processed data is textual, adjust if it's binary
  // const processedDataText = processedData.Body.toString('utf-8');

  // // TODO wait for sagemaker to finish processing

  // return {
  //   statusCode: 200,
  //   body: JSON.stringify({
  //       message: "Process complete",
  //       data: processedDataText // Sending the processed data
  //   })
  // };

  return {
    statusCode: 200,
    body: "hello world",
  };

};

export default handler;

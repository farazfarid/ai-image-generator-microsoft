export async function GET(request: Request) {
  
  export const dynamic = 'force-dynamic';

  const response = await fetch(
    "https://ai-image-generator-microsoft-app.azurewebsites.net/api/getimages",
    {
      cache: "no-store",
    }
  );

  const blob = await response.blob();
  const textData = await blob.text();

  const data = JSON.parse(textData);

  return new Response(JSON.stringify(data), { status: 200 });
}

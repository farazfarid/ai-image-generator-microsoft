export async function GET(request: Request) {
  
  export const dynamic = 'force-dynamic';

  const response = await fetch(
    "https://ai-image-generator-microsoft-app.azurewebsites.net/api/getchatgptsuggestion",
    {
      cache: "no-store",
    }
  );

  const textData = await response.text();

  return new Response(JSON.stringify(textData.trim()), { status: 200 });
}

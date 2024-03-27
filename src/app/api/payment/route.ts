export async function POST(request: Request) {
  return Response.json({
    message: "Thank you for your payment!",
    confirmation: "ABC98765432XYZ",
  });
}

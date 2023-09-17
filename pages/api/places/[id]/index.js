import Place from "@/db/models/Place";
import dbConnect from "@/db/connect";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;
  if (!id) {
    return;
  }
  if (request.method === "GET") {
    const place = await Place.findById(id);
    if (!place) {
      return response.status(404).json({ status: "Not found" });
    }
    response.status(200).json(place);
  } else if (request.method === "PUT") {
    const placeData = request.body;

    await Place.findByIdAndUpdate(id, placeData);
    // Find the joke by its ID and update the content that is part of the request body!
    response.status(200).json({ status: `Place ${id} updated!` });
    // If successful, you'll receive an OK status code.
  } else if (request.method === "DELETE") {
    await Place.findByIdAndDelete(id);
    return response.status(200).json({ message: "Place deleted!" });
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}

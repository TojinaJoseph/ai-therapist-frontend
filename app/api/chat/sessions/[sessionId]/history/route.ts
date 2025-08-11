import { NextRequest, NextResponse } from "next/server";

const BACKEND_API_URL = process.env.BACKEND_API_URL || "http://localhost:3001";

export type Message = {
  role: string;
  content: string;
  timestamp: string | number | Date; // Choose based on your actual data
};

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await context.params; // Await because it's a Promise

    const response = await fetch(
      `${BACKEND_API_URL}/chat/sessions/${sessionId}/history`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("Failed to get chat history:", error);
      return NextResponse.json(
        { error: error.error || "Failed to get chat history" },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("Chat history retrieved successfully:", data);

    // Format the response to match the frontend's expected format
    const formattedMessages = data.map((msg: Message) => ({
      role: msg.role,
      content: msg.content,
      timestamp: msg.timestamp,
    }));

    return NextResponse.json(formattedMessages);
  } catch (error) {
    console.error("Error getting chat history:", error);
    return NextResponse.json(
      { error: "Failed to get chat history" },
      { status: 500 }
    );
  }
}

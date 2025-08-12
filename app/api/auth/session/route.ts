import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // For now, return a mock authenticated session
    // In a real app, you would validate the session token and return the actual user data
    // const token = req.headers.get("Authorization");

    // if (!token) {
    //   return NextResponse.json(
    //     { message: "No token provided" },
    //     { status: 401 }
    //   );
    // }
    return NextResponse.json({
      isAuthenticated: true,
      user: {
        id: "1",
        name: "Test User",
        email: "test@example.com",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get auth session" },
      { status: 500 }
    );
  }
}

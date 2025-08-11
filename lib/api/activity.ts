interface ActivityEntry {
  type: string;
  name: string;
  description?: string;
  duration?: number;
}
interface LogActivityResponse {
  success: boolean;
  data: {
    id: string;
    type: string;
    name: string;
    description?: string;
    duration?: number;
    createdAt: string;
  };
}

const API_BASE = process.env.BACKEND_API_URL || "http://localhost:3001";

export async function logActivity(
  data: ActivityEntry
): Promise<LogActivityResponse> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const response = await fetch("/api/activity", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to log activity");
  }

  return response.json();
}

export async function getUserActivities(userId: string | undefined) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const response = await fetch(`${API_BASE}/api/activity`, {
    headers: {
      Authorization: token,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to log activity");
  }

  return response.json();
}
// export const getUserActivities = async (userId: string) => {
//   return staticActivities.filter((activity) => activity.userId === userId);
// };

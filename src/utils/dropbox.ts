import { Dropbox, files } from "dropbox";

// Token is now loaded from .env
const ACCESS_TOKEN = import.meta.env.VITE_DROPBOX_ACCESS_TOKEN;
console.log("🔑 CHECKPOINT 1: Token loaded:", ACCESS_TOKEN ? "YES (from env)" : "NO");

const dbx = new Dropbox({ accessToken: ACCESS_TOKEN });
console.log("🔌 CHECKPOINT 2: Dropbox instance created");

export interface DropboxImage {
  id: string;
  name: string;
  path: string;
  link: string;
  city?: string;
  deviceId?: string;
  // 👇 normalized date (YYYY-MM-DD) used for filtering
  timestamp?: string;
  // 👇 full Dropbox timestamp if you ever need it
  rawTimestamp?: string;
}

// Helper to extract metadata from filename
// For now, we only use this for city + deviceId.
// Assumes format: [City]_[Device]_[Something].jpg or [Device]_[Something].jpg
function extractMetadata(filename: string) {
  const nameWithoutExt =
    filename.substring(0, filename.lastIndexOf(".")) || filename;
  const parts = nameWithoutExt.split("_");

  // Default values
  let city = "Unknown City";
  let deviceId = "Unknown Device";

  if (parts.length >= 3) {
    city = parts[0];
    deviceId = parts[1];
  } else if (parts.length === 2) {
    // e.g., "pothole_14-52-34" → deviceId = "pothole"
    deviceId = parts[0];
  }

  return { city, deviceId };
}

export async function getImagesFromFolder(
  folderPath: string
): Promise<DropboxImage[]> {
  console.log("📂 CHECKPOINT 3: Received folderPath =", folderPath);

  try {
    console.log("📡 CHECKPOINT 4: Calling filesListFolder...");

    const response = await dbx.filesListFolder({ path: folderPath });

    console.log("✅ CHECKPOINT 5: filesListFolder SUCCESS");
    console.log("📦 Raw entries:", response.result.entries);

    const filesList = response.result.entries.filter(
      (entry): entry is files.FileMetadataReference => entry[".tag"] === "file"
    );

    console.log("🧾 CHECKPOINT 6: Filtered file count =", filesList.length);

    const images: DropboxImage[] = await Promise.all(
      filesList.map(async (file, index) => {
        console.log(`🔗 CHECKPOINT 7-${index}: Getting temporary link for`, file.name);

        const tempLink = await dbx.filesGetTemporaryLink({
          path: file.path_lower!,
        });

        console.log(`✔️ CHECKPOINT 8-${index}: Temporary link OK`);

        const { city, deviceId } = extractMetadata(file.name);

        // 👉 Use Dropbox's server_modified/client_modified as the true timestamp
        const rawTimestamp =
          // server_modified is usually available and in ISO format
          ((file as any).server_modified as string | undefined) ||
          ((file as any).client_modified as string | undefined) ||
          "";

        // Normalize to "YYYY-MM-DD" for easy comparison with <input type="date">
        const timestamp = rawTimestamp ? String(rawTimestamp).slice(0, 10) : "";

        console.log(
          `🕒 CHECKPOINT 8-${index} timestamp for ${file.name}: raw=${rawTimestamp}, normalized=${timestamp}`
        );

        return {
          id: file.id,
          name: file.name,
          path: file.path_lower!,
          link: tempLink.result.link,
          city,
          deviceId,
          timestamp,     // used by filters
          rawTimestamp,  // extra info if needed
        };
      })
    );

    console.log("🏁 CHECKPOINT 9: Finished building image list:", images.length);

    return images;
  } catch (error: any) {
    console.error("❌ ERROR OCCURRED:", error);

    if (error?.response?.status === 400) {
      console.error("⚠️ Possible reason: WRONG PATH");
    }
    if (error?.response?.status === 401) {
      console.error("🚫 AUTH ERROR: Token may be expired or incorrect");
    }
    if (error?.error?.path) {
      console.error("📌 Dropbox API path error details:", error.error.path);
    }

    return [];
  }
}

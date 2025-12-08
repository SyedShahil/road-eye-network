import { Dropbox, files } from "dropbox";

// Hardcoded token
const ACCESS_TOKEN = "sl.u.AGJSlUmLzfYXjOt7xFa5FsPXw-KLcBYITQryyUxcPf205-t4ZKSL2UguWVsGwXVHixDKGcktOdy7WCdxz1uSFP-GdYddqjh9rCej6CeRNzD49TPSwiCczacRPOMjk7LQQQHWBBw2_2ATghWdlWfNO94fgBeDf2NruY2oUZw6QEhRmFLArgt6ruvAUNkVfrApeJJDfQyKg0g8t7c64ykFxqj-MdEqFfRawaqBA5pcsfwqSxQOXJnlYh92N6HGjKW9p9pQxKFiHNoP-6SZAy0feHFR6kvje9fJVv5dH6dKqn3wiWcueOblGcWKYpAz8Vp8ygV0cKxF7X3MKoxnG3ANzyQdP77Cz36T4UMfrdTGOO7N2xF8cfFA7evH8v_zxZx7TKWOw453fb8Ojazr-XQLbza9UFXCXDTAYzTvpCWtPRrP2GP73ZHoFTjwGnJQ3obgdSXcp8NGVIr8DgTHxrvdu7gXOTq6WNvmwd0-MhxoMqVonU-Q0I7S0wD-EJZxoMYUPVmJEHKyo5fmCCEITc0PhOakdyuFL4XlxDkXtyqNAjZ5SCXnaCM9MasMXrQi2mhMXIhNkDWi7MyGqBMGqxaB8odlGC8fl7JlBsVxXzPSnVDfQ4Px8pGjaSzyFMn-kkWEe-fy8S3IiaLZdKrYRtmkfkJSttYouw3thcOLC4jrhYGMeCfxLC9fuTkXkpQuvAdYQ1aVqXxArxq-fYA9tkzSflVUEbWgiDcY8RMqrVGDCVJg1BcQLrZcXjU7FXwfR7LBp_TjltS_bkf-4OxHTBkldDAij3mjxgjAqS3aL0qfUiSdRlfI8lO9Dic9K3wxyWG9KlaT_bkiel7k6vJmndMfROS8dEdEQD4FF77ZAtRBRMp_6_MP1-dk7rOgmUo_Wv1HBoxGzLIhWeGG6d3V2It-V-xITENcCX43_TgHSQGKUqUoE15sUqxQF4yvWjQGx-QUhWiRvQmUdIz37rgl62jtotM4kZsn8PlOu4tlluEjypW62yC_r19pgrm0BJXJD1Gue3Y3oq47jWypSi1CgeEjy8YMAg5TuLHNR6UWUHgksaQBNc4NvMuIMSf0SzbylBfYdLxxILw-bAeVzMYJ5Cy5snONgILZSWR8U3LZjqGwXWI2kGanrljt1XjANmo_lAhVI8vSGoV_8ClO71x3hoeB6YymQnw2RFNZr956BKWEIPnEK_iT5A2Upz9cqDOmivHjuVwKNzlb_u-cbcBcU-u36AeVKxq-J-252QMbTLXECKpJq2S3wOeVPH825KQleFVxTWKObvL4AyI4xfAysy8hJsD6SDMo55XHxGxmQe9L3tnRxYm6OEORwBBf8o1g5ZjOd8TMp9cEN9pTQ_X0NU0o3srroupG9EmhgJsptMnt8ACwD7e-KeDhyNUSSsTk8kSL9t_XK4IsARtvm5jPPfOQloi-CfV6uB1B1Vo8hy_g-dI1Mw";
console.log("🔑 CHECKPOINT 1: Token loaded:", ACCESS_TOKEN ? "YES" : "NO");

const dbx = new Dropbox({ accessToken: ACCESS_TOKEN });
console.log("🔌 CHECKPOINT 2: Dropbox instance created");

export interface DropboxImage {
  id: string;
  name: string;
  path: string;
  link: string;
}

export async function getImagesFromFolder(folderPath: string): Promise<DropboxImage[]> {
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

        return {
          id: file.id,
          name: file.name,
          path: file.path_lower!,
          link: tempLink.result.link,
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

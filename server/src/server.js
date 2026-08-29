import { app } from "./app.js";
import { connectDatabase } from "./config/db.js";
import { env } from "./config/env.js";
import { storageService } from "./services/storage/storageService.js";

const startServer = async () => {
  try {
    await storageService.ensureUploadsDirectory();
    await connectDatabase();

    app.listen(env.port, () => {
      console.log(`ECHO DIARY server running on http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

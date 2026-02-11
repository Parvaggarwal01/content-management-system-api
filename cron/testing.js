import cron from "node-cron";
import Artifact from "../models/artifact.js";

/**
 * Initializes all cron jobs
 */
export const startCronJobs = () => {
    // Schedule task to run every 12 hours
    // Cron expression: 0 */12 * * * (At minute 0 past every 12th hour)
    cron.schedule("0 */12 * * *", async () => {
        console.log("⏳ Running Cron Job: Archiving stale drafts...");

        try {
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

            // Find artifacts that are DRAFT and created more than 30 days ago
            const result = await Artifact.updateMany(
                {
                    status: "DRAFT",
                    createdAt: { $lt: thirtyDaysAgo }
                },
                {
                    $set: { status: "ARCHIVED" }
                }
            );

            if (result.modifiedCount > 0) {
                console.log(`✅ Cron Job Completed: Archived ${result.modifiedCount} stale artifacts.`);
            } else {
                console.log("ℹ️ Cron Job: No stale artifacts found to archive.");
            }

        } catch (error) {
            console.error("❌ Cron Job Failed:", error);
        }
    });

    console.log("🕒 Cron jobs scheduled: Archive Drafts (Every 12h)");
};

import cron from "node-cron";
import Artifact from "../models/artifact.js";


export const startCronJobs = () => {

    cron.schedule("0 */12 * * *", async () => {
        console.log(" Running Cron Job: Archiving stale drafts");

        try {
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);


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
                console.log(` Cron Job Completed: Archived ${result.modifiedCount} stale artifacts.`);
            } else {
                console.log("ℹ Cron Job: No stale artifacts found to archive.");
            }

        } catch (error) {
            console.error(" Cron Job Failed:", error);
        }
    });

    console.log(" Cron jobs scheduled: Archive Drafts (Every 12h)");
};

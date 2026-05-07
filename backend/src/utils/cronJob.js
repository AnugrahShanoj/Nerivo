const cron = require("node-cron");
const connectionRequest = require("../models/connectionRequest");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const sendEmail = require("./sendEmail");

cron.schedule("0 8 * * *", async () => {
    const yesterday = subDays(new Date(), 1);
    const startOfYesterday = startOfDay(yesterday);
    const endOfYesterday = endOfDay(yesterday);

    try {
        const pendingRequests = await connectionRequest.find({
            status: "interested",
            createdAt: {
                $gte: startOfYesterday,
                $lt: endOfYesterday
            }
        }).populate("fromUserId toUserId");

        const listOfEmails = [
            ...new Set(pendingRequests.map((request) => request.toUserId.emailId))
        ];

        for (const email of listOfEmails) {
            try {
                await sendEmail.run(
                    email,
                    "You have Pending Connection Requests on Nerivo",
                    "Many developers are waiting to connect with you. Please check your pending connection requests and respond to them."
                );
            } catch (err) {
                console.error("Error sending email: ", err.message);
            }
        }
    } catch (err) {
        console.error("Error in cron job:", err.message);
    }
});
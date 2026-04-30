const ConnectionRequest = require("../models/connectionRequest")
const { userAuth } = require("../Middlewares/auth")
const express = require("express")
const sendEmail = require("../utils/sendEmail")
const User = require("../models/user")

const requestRouter = express.Router()

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id
        const status = req.params.status
        const toUserId = req.params.toUserId
        const allowedStatuses = ["ignored", "interested"]

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid Status Type " + status })
        }

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        })
        if (existingConnectionRequest) {
            return res.status(400).json({ message: "Connection Already Existing" })
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId, toUserId, status
        })

        const data = await connectionRequest.save()

        // Send email only when status is interested
        if (status === "interested") {
            const toUser = await User.findById(toUserId)
            const fromUser = req.user
            await sendEmail.run(
                toUser.emailId,
                "New Connection Request on Nerivo",
                `${fromUser.firstName} ${fromUser.lastName} is interested in connecting with you on Nerivo`
            )
        }

        res.json({ message: "Connection request " + status })

    } catch (error) {
        res.status(400).send("ERROR: " + error.message)
    }
})


requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user
        const { status, requestId } = req.params
        const allowedStatus = ["accepted", "rejected"]

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid Status" })
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested"
        })
        if (!connectionRequest) {
            return res.status(404).json({ message: "Connection request not found" })
        }

        connectionRequest.status = status
        await connectionRequest.save()

        // Send email to the person who originally sent the request
        const fromUser = await User.findById(connectionRequest.fromUserId)
        await sendEmail.run(
            fromUser.emailId,
            `Your Connection Request was ${status} on Nerivo`,
            `${loggedInUser.firstName} ${loggedInUser.lastName} has ${status} your connection request on Nerivo`
        )

        res.json({ message: "Connection request is " + status })

    } catch (error) {
        res.status(400).send("ERROR: " + error.message)
    }
})


module.exports = requestRouter
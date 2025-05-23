import express from "express"
import upload from "../middlewares/attachment.middleware"
import { MailController } from "../api/mail/mail.controller"
import { sendMailSchema } from "../api/mail/schemas/send-mail.schema"
import { validateRequest } from "../middlewares/validation/validation.middleware"

const mailRouter = express.Router()
const mailController = new MailController()
/**
 * @swagger
 * /mail/send:
 *   post:
 *     summary: Send a mail
 *     tags: [Mail]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               from:
 *                 type: string
 *               to:
 *                 type: string
 *               subject:
 *                 type: string
 *               body:
 *                 type: string
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Mail sent successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Failed to send mail
 */
mailRouter.post(
  "/send",
  upload.array("attachments"),
  validateRequest(sendMailSchema, "body"),
  mailController.sendMail
)

/**
 * @swagger
 * /mail/inbox/me:
 *   get:
 *     summary: Fetch inbox messages
 *     tags: [Mail]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Inbox fetched successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Failed to fetch inbox
 */
mailRouter.get("/inbox/me", mailController.fetchInbox)

/**
 * @swagger
 * /mail/outbox/me:
 *   get:
 *     summary: Fetch outbox messages
 *     tags: [Mail]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Outbox fetched successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Failed to fetch outbox
 */
mailRouter.get("/outbox/me", mailController.fetchOutBox)

/**
 * @swagger
 * /mail/{id}:
 *   get:
 *     summary: Fetch a mail by ID
 *     tags: [Mail]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Mail ID
 *     responses:
 *       200:
 *         description: Mail fetched successfully
 *       500:
 *         description: Failed to fetch mail
 */
mailRouter.get("/:id", mailController.fetchMail)

export default mailRouter

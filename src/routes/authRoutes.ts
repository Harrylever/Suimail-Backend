import express from 'express';
import { login } from '../controllers/authController';
import authMiddleware from '../middlewares/authMiddleware';

const authRouter = express.Router();

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
authRouter.get('/login/:address', login);


export default authRouter;

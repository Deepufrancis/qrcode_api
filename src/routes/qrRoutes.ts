import { Router, Request, Response } from "express";
import QRCode from "qrcode";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: QR
 *   description: QR Code Generator API
 */

/**
 * @swagger
 * /api/qr:
 *   post:
 *     summary: Generate a QR code
 *     description: Generates a QR code image from the provided text and returns it as a Base64 string.
 *     tags: [QR]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: "Hello, QR World!"
 *     responses:
 *       200:
 *         description: Successfully generated QR code
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 text:
 *                   type: string
 *                   example: "Hello, QR World!"
 *                 qr:
 *                   type: string
 *                   description: Base64-encoded QR image
 *       400:
 *         description: Missing text input
 *       500:
 *         description: Server error
 */
router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { text } = req.body;
    if (!text) {
      res.status(400).json({ message: "Text is required" });
      return;
    }

    const qr = await QRCode.toDataURL(text);

    res.status(200).json({
      success: true,
      text,
      qr,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generating QR code" });
  }
});

export default router;

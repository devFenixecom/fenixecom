import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';
import { v4 as uuidv4 } from 'uuid';
import { ObjectId } from 'mongodb';

export default async function authenticateTheme(req: NextApiRequest, res: NextApiResponse) {
    const { db } = await connectToDatabase();
    const clientEmail = Array.isArray(req.query.clientEmail) ? new ObjectId(req.query.clientEmail[0]) : new ObjectId(req.query.clientEmail);
const themeId = Array.isArray(req.query.themeId) ? new ObjectId(req.query.themeId[0]) : new ObjectId(req.query.themeId);


    const expiration = new Date();
    expiration.setDate(expiration.getDate() + 360); // expires in 360 days

    if (!clientEmail || !themeId) {
        res.status(400).json({ error: 'clientEmail and themeId are required' });
        return;
    }

    const licenseCollection = db.collection('Licenses');

    const newLicense = {
        key: uuidv4(),
        client: clientEmail,
        theme: themeId,
        createdAt: new Date(),
        expiresAt: expiration,
        isActive: true,
    }
    await licenseCollection.insertOne(newLicense);

    res.status(200).json({ key: newLicense.key });
}

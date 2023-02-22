import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        const { db } = await connectToDatabase();
        const themeCollection = db.collection('Theme');
        const licenseCollection = db.collection('Licenses');

        // Get product name from the URL 
        const {productName} = req.query;
        console.log(productName)

        // Find theme using the product name
        const theme = await themeCollection.findOne({ name: productName });
        if (!theme) {
          return res.status(404).json({ error: 'theme not found' });
          
        }

        // Get the license associated to the theme
        const license = await licenseCollection.findOne({ theme: theme._id });
        if (!license) {
          return res.status(404).json({ error: 'License not found for the given theme' });
        }

        // Check if the license is active
        if (!license.isActive) {
          return res.status(401).json({ error: 'License is not active' });
        }

        // Return success message and productName
        return res.status(200).json({ message: 'License is valid',productName: theme.name });
    }catch(error){
        return res.status(500).json({error: ''});  
        
    }
}

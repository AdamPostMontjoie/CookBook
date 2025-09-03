// backend.js

const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors'); 
require('dotenv').config();

// --- 1. CONFIGURATION ---
const app = express();
const port = 3000;
const mongoUrl = process.env.ATLAS_URI
const dbName = 'InternationalCookbook';

// Middleware to parse incoming JSON data
app.use(express.json());

async function main() {
    let client;

    try {
        // Connect to MongoDB
        client = new MongoClient(mongoUrl);
        await client.connect();
        console.log('Successfully connected to MongoDB');

        const db = client.db(dbName);

        // --- 2. DYNAMIC ROUTES FOR RECIPES ---
        
        // GET route to retrieve all recipes from a specified collection
        // Example: GET /recipes/Japanese Food
        app.get('/recipes/:collection', async (req, res) => {
            const collectionName = req.params.collection;
            
            try {
                const collection = db.collection(collectionName);
                const documents = await collection.find({}).toArray();
                
                if (documents.length === 0) {
                    return res.status(404).send({ message: `No recipes found in collection: ${collectionName}` });
                }
                
                res.status(200).json(documents);
            } catch (error) {
                console.error(`Error getting documents from ${collectionName}:`, error);
                res.status(500).send({ message: 'Error retrieving documents.' });
            }
        });

        // POST route to upload a JSON array of recipes to a specified collection
        // Example: POST /recipes/Japanese Food
        app.post('/recipes/:collection', async (req, res) => {
            const collectionName = req.params.collection;
            const documents = req.body;

            if (!Array.isArray(documents) || documents.length === 0) {
                return res.status(400).send({ message: 'Request body must be a non-empty array of JSON objects.' });
            }

            try {
                const collection = db.collection(collectionName);
                await collection.deleteMany({});
                const result = await collection.insertMany(documents);
                console.log(`Uploaded ${result.insertedCount} documents to ${collectionName}`);
                
                res.status(201).send({
                    message: `Recipes uploaded successfully to ${collectionName}`,
                    insertedCount: result.insertedCount
                });
            } catch (error) {
                console.error(`Error uploading to ${collectionName}:`, error);
                res.status(500).send({ message: 'Error uploading documents.' });
            }
        });
        
        // --- 3. SPECIAL ROUTES FOR FAVORITES ---

        // GET route to retrieve all favorites from the "favorites" collection
        // Example: GET /favorites
        app.get('/favorites', async (req, res) => {
            try {
                const collection = db.collection('favorites');
                const documents = await collection.find({}).toArray();
                
                res.status(200).json(documents);
            } catch (error) {
                console.error(`Error getting favorites:`, error);
                res.status(500).send({ message: 'Error retrieving favorites.' });
            }
        });

        // POST route to add a single favorite to the "favorites" collection
        // Example: POST /favorites
        app.post('/favorites', async (req, res) => {
            const favorite = req.body;
            if (Object.keys(favorite).length === 0) {
                return res.status(400).send({ message: 'Request body must be a single JSON object.' });
            }
            
            try {
                const collection = db.collection('favorites');
                const result = await collection.insertOne(favorite);
                console.log(`Added a favorite: ${result.insertedId}`);
                
                res.status(201).send({
                    message: 'Favorite added successfully',
                    insertedId: result.insertedId
                });
            } catch (error) {
                console.error(`Error adding favorite:`, error);
                res.status(500).send({ message: 'Error adding favorite.' });
            }
        });

        // Start the server
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });

    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
}

main();
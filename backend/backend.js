// backend.js

const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors'); 
require('dotenv').config();

// --- 1. CONFIGURATION ---
const app = express();
app.use(cors());
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
        app.get('/favorites/:uid', async (req, res) => {
            const user = req.params.uid
            try {
                const collection = db.collection('favorites');
                const documents = await collection.find({uid:user}).toArray();
                
                res.status(200).json(documents);
            } catch (error) {
                console.error(`Error getting favorites:`, error);
                res.status(500).send({ message: 'Error retrieving favorites.' });
            }
        });

        // post to favorites
        app.post('/favorites', async (req, res) => {
            const recipe = req.body.recipe;
            const user = req.body.user
            //need to remove id because recipe is mongo document with own id already
            //causes conflict when assigning new id
            const { _id, ...restOfRecipe } = recipe;

            const favoriteDocument = {
                    ...restOfRecipe,
                    uid: user,
                };
            if (Object.keys(favoriteDocument).length === 0) {
                return res.status(400).send({ message: 'Request body must be a single JSON object.' });
            }
            
            try {
                const collection = db.collection('favorites');
                const exists = await collection.countDocuments({uid:user,name:favoriteDocument.name}, { limit: 1 })
                if(exists > 0){
                    res.status(200).send({
                        message:"already saved"
                    })
                } else {
                    const result = await collection.insertOne(favoriteDocument);
                    console.log(`Added a favorite: ${result.insertedId}`);
                    res.status(201).send({
                        message: 'Favorite added successfully',
                        insertedId: result.insertedId
                    });
                }   
                
            } catch (error) {
                console.error(`Error adding favorite:`, error);
                res.status(500).send({ message: 'Error adding favorite.' });
            }
        });

        //delete from favorites
         app.delete('/favorites', async (req, res) => {
            const recipe = req.body.recipe;
            const user = req.body.user
            //need to remove id because recipe is mongo document with own id already
            //causes conflict when assigning new id


            const favoriteDocument = {
                    ...recipe
                };
            if (Object.keys(favoriteDocument).length === 0) {
                return res.status(400).send({ message: 'Request body must be a single JSON object.' });
            }
            
            try {
                const collection = db.collection('favorites');
                const result = await collection.findOneAndDelete({uid:user,name:recipe.name})
                 if (!result) {
                    return res.status(404).send({ message: 'Favorite not found.' });
                }
                res.status(200).send({message:"Deleted favorite"})
                
            } catch (error) {
                console.error(`Error deleting favorite:`, error);
                res.status(500).send({ message: 'Error deleting favorite.' });
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
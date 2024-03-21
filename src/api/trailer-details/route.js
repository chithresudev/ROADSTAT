import express from 'express';
import {Trailer} from '../../models/Trailer.js'; // Import Trailer model

const trailerDetailsRouter = express.Router();

// GET route handler
trailerDetailsRouter.get('/trailers', async (req, res) => {
    try {
        const trailer = await Trailer.find();
        res.json(trailer);
    } catch (error) {
      console.error('Error fetching trailer details:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

trailerDetailsRouter.get('/trailers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const trailer = await Trailer.findById(id); // Pass the id to findById
    if (!trailer) {
      return res.status(404).json({ message: "Trailer details not found" });
    }
    res.json(trailer);
  } catch (error) {
    console.error('Error fetching trailer details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST route handler
trailerDetailsRouter.post('/trailers', async (req, res) => {
  try {
    // const categoryDoc = await Category.create({ name });
    // return NextResponse.json(categoryDoc);
    const { 
        length,
        width,
        height,
        capacity,
        condition,
        manufacturer,
        model,
        manufacturedYear
      } = req.body;
    const trailer = await Trailer.create({length,
      width,
      height,
      capacity,
      condition,
      manufacturer,
      model,
      manufacturedYear});
    // await truckLocation.save();
    res.json(trailer);
  } catch (error) {
    console.error('Error adding trailer location:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PUT route handler
trailerDetailsRouter.put('/trailers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      length,
      width,
      height,
      weight,
      capacity,
      engineType,
      horsePower,
      transmission,
      condition,
      manufacturer,
      model,
      manufacturedYear
    } = req.body;

    const updatedTrailer = await Trailer.findByIdAndUpdate(id, {
      length,
      width,
      height,
      weight,
      capacity,
      engineType,
      horsePower,
      transmission,
      condition,
      manufacturer,
      model,
      manufacturedYear
    }, { new: true });

    if (!updatedTrailer) {
      return res.status(404).json({ message: "Trailer not found" });
    }

    res.json(updatedTrailer);
  } catch (error) {
    console.error('Error updating trailer details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE route handler
trailerDetailsRouter.delete('/trailers/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTrailer = await Trailer.findByIdAndDelete(id);

    if (!deletedTrailer) {
      return res.status(404).json({ message: "Trailer not found" });
    }

    res.json({ message: "Trailer deleted successfully" });
  } catch (error) {
    console.error('Error deleting trailer details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default trailerDetailsRouter;


const router = require('express').Router();

const tripManager = require('../manager/tripManager');

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', (req, res) => {
    const { name, description, imageUrl, dateFrom, dateTo } = req.body;

    tripManager.createTrip({ name, description, imageUrl, dateFrom, dateTo });

    res.redirect('/');
});

router.get('/details/:id', async (req, res) => {
    const trip = await tripManager.getOneTrip(req.params.id).lean();
    const comments = trip.comments
    const hasComments = comments.length > 0;

    res.render('details', { trip, comments, hasComments });
});

router.get('/delete/:id', async (req, res) => {
    await tripManager.deleteTrip(req.params.id);

    res.redirect('/');
});



module.exports = router;
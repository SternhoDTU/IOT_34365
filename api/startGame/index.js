module.exports = async function (context, req) {
    const body = req.body;
    const seating = body.seating || Object.values(body); // Accepts either an array or an object

    if (!seating || seating.length !== 8) {
        context.res = { status: 400, body: "Invalid seating data" };
        return;
    }

    gameData = { seating, timestamp: new Date().toISOString() }; // Save seating data
    context.res = { body: { message: "Game started", gameData } };
};

let gameData = {}; // This will store the current game state (in-memory for simplicity)

module.exports = async function (context, req) {
    const seating = req.body.seating; // Get seating data from the request
    if (!seating || seating.length !== 8) {
        context.res = { status: 400, body: "Invalid seating data" };
        return;
    }
    gameData = { seating, timestamp: new Date().toISOString() }; // Save seating data
    context.res = { body: { message: "Game started", gameData } };
};

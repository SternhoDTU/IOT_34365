module.exports = async function (context, req) {
    context.res = { body: gameData || { message: "No game data available" } };
};

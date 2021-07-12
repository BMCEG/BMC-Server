import Landing from "../models/landings.js";

export const getLanding = async (req, res, next) => {
    const { landingName } = req.query;
console.log(req.query)
    const landing = await Landing.findOne({ name: landingName });
    if (!landing) {
      next(ApiError.badRequest("Couldnt find data for the entered landingName"));
      return;
    }

    res.status(200).json(landing);
};
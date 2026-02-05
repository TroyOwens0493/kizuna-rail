import { getAllRoutes, getListOfRegions, getListOfSeasons } from '../../models/model.js';

export default async (req, res) => {
    const regions = await getListOfRegions();
    const seasons = await getListOfSeasons();
    const allRoutes = await getAllRoutes();
    const { region, season } = req.query;
    const normalizedRegion = region ? region.toLowerCase() : null;
    const normalizedSeason = season ? season.toLowerCase() : null;
    const routes = allRoutes.filter(route => {
        const matchesRegion = normalizedRegion
            ? route.region.toLowerCase() === normalizedRegion
            : true;
        const matchesSeason = normalizedSeason
            ? route.bestSeason.toLowerCase() === normalizedSeason
            : true;
        return matchesRegion && matchesSeason;
    });

    res.render('routes/list', { 
        title: 'Scenic Train Routes',
        regions,
        routes,
        seasons,
        query: req.query
    });
};

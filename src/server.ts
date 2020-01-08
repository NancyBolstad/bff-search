import bodyParser from "body-parser"
import cors from "cors"
import express from "express"

import { SearchParams } from '../types'

import { searchTransit, searchNonTransit, searchBikeRental } from "./search"
import { parseCursor, generateCursor } from "./utils/cursor"

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/transit', async (req, res, next) => {
    try {
        const params = getParams(req.body)
        console.log('TRANSIT PARAMS :', JSON.stringify(params, undefined, 3));

        const { tripPatterns, hasFlexibleTripPattern } = await searchTransit(params)

        res.json({
            tripPatterns,
            hasFlexibleTripPattern,
            nextCursor: generateCursor(params, tripPatterns),
        })
    } catch (error) {
        next(error)
    }
});

app.post('/non-transit', async (req, res, next) => {
    try {
        const params = getParams(req.body)
        console.log('NON-TRANSIT PARAMS :', JSON.stringify(params, undefined, 3));

        const tripPatterns = await searchNonTransit(params)

        res.json({ tripPatterns })
    } catch (error) {
        next(error)
    }
});

app.post('/bike-rental', async (req, res, next) => {
    try {
        const params = getParams(req.body)
        const tripPattern = await searchBikeRental(params)

        res.json({ tripPattern })
    } catch (error) {
        next(error)
    }
});

function getParams({ cursor, ...bodyParams }: SearchParams): SearchParams {
    if (cursor) return parseCursor(cursor).params

    return {
            ...bodyParams,
            searchDate: new Date(bodyParams.searchDate),
        }
}

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server listening on port ${PORT}...`);
});

export default class ScoreCalculator {
    constructor() { }

    getStats(reviews) {
        const averages = {
            totalAverage: 0,
            authoredAverage: 0, 
            anonymousAverage: 0
        };

        const validReviews = [];
        const nAuthor = [];
        const nAnonymousAuthor = [];

        for (let i = 0; i < reviews.length; i++) {
            if (this.validateStars(reviews[i])) {
                validReviews.push(reviews[i].stars);
                if (reviews[i].author) {
                    nAuthor.push(reviews[i].stars);
                }
                else {
                    nAnonymousAuthor.push(reviews[i].stars);
                }
            }
        }
        averages.totalAverage = this.calculateAverages(validReviews);
        averages.authoredAverage = this.calculateAverages(nAuthor);
        averages.anonymousAverage = this.calculateAverages(nAnonymousAuthor);

        return averages;
    }

    validateStars (review) {
        const diff = 5 - review.stars;
        return diff >= 0 && diff <= 4;
    }

    calculateAverages(arr) {
        return arr.length ? arr.reduce((acc, value) => acc + value) / arr.length : NaN;
    }
}
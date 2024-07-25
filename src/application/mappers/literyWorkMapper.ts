import { Genre, KnowlodgeArea, LiteryWorkStatus } from '../../domain';

export class LiteryWorkMapper {

    static mapGenres(genres: string[]): Genre[] {
        return genres.map(genre => {
            if (Object.values(Genre).includes(genre as Genre)) {
                return genre as Genre;
            }
            throw new Error(`Invalid genre: ${genre}`);
        });
    }

    static mapStatus(status: string): LiteryWorkStatus {
        if (Object.values(LiteryWorkStatus).includes(status as LiteryWorkStatus)) {
            return status as LiteryWorkStatus;
        }
        throw new Error(`Invalid status: ${status}`);
    }

    static mapKnowledgeAreas(areas: string[]): KnowlodgeArea[] {
        return areas.map(area => {
            if (Object.values(KnowlodgeArea).includes(area as KnowlodgeArea)) {
                return area as KnowlodgeArea;
            }
            throw new Error(`Invalid knowledge area: ${area}`);
        });
    }  

}
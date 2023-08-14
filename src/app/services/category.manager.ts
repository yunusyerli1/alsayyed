import {Injectable} from '@angular/core';
import { ICategoryManagerModel } from '../helpers/models/ICategoryManager';
import { RingService } from './ring.service';

@Injectable({
    providedIn: 'root'
})
export class CategoryManager {

    constructor(
        private ringService: RingService,
        // public lessThanAction: LessThanAction,
        // public notEmptyAction: NotEmptyAction,
        // public isEmptyAction: IsEmptyAction,
        // public isEqualAction: IsEqualAction,
        // public notEqualAction: NotEqualAction

    ) {
    }

    get(key: string): ICategoryManagerModel {
        const operatorMap: { [key: string]: ICategoryManagerModel } = {
            'ring': this.ringService,
            // 'less-than': this.lessThanAction,
            // 'not-empty': this.notEmptyAction,
            // 'is-empty': this.isEmptyAction,
            // 'is-equal': this.isEqualAction,
            // 'not-equal': this.notEqualAction,
        };

        return operatorMap[key];
    }

}

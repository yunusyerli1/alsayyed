import {Injectable} from '@angular/core';
import { ICategoryManagerModel } from '../helpers/models/ICategoryManager';
import { RingService } from './category-services/ring.service';
import { EaringService } from './category-services/earing.service';
import { BangleService } from './category-services/bangle.service';
import { BraceletService } from './category-services/bracelet.service';
import { PendantService } from './category-services/pendant.service';
import { NecklaceService } from './category-services/necklace.service';
import { FullsetService } from './category-services/fullset.service';
import { HalfsetService } from './category-services/halfset.service';
import { BanglesetService } from './category-services/bangleset.service';
import { ChainService } from './category-services/chain.service';

@Injectable({
    providedIn: 'root'
})
export class CategoryManager {

    constructor(
        private ringService: RingService,
        private earingService: EaringService,
        private bangleService: BangleService,
        private braceletService: BraceletService,
        private pendantService: PendantService,
        private necklaceService: NecklaceService,
        private fullsetService: FullsetService,
        private halfsetService: HalfsetService,
        private banglesetService: BanglesetService,
        private chainService: ChainService
    ) {
    }

    get(key: string): ICategoryManagerModel {
        const operatorMap: { [key: string]: ICategoryManagerModel } = {
            'ring': this.ringService,
            'earing': this.earingService,
            'bangle': this.bangleService,
            'bracelet': this.braceletService,
            'pendant': this.pendantService,
            'necklace': this.necklaceService,
            'fullset': this.fullsetService,
            'halfset': this.halfsetService,
            'bangle-set': this.banglesetService,
            'chain': this.chainService,
        };

        return operatorMap[key];
    }

}

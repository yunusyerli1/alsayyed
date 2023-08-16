import {Injectable} from '@angular/core';
import { ICategoryManagerModel } from '../helpers/models/ICategoryManager';
import { RingService } from './ring.service';
import { EaringService } from './earing.service';
import { BangleService } from './bangle.service';
import { BraceletService } from './bracelet.service';
import { PendantService } from './pendant.service';
import { NecklaceService } from './necklace.service';
import { FullsetService } from './fullset.service';
import { HalfsetService } from './halfset.service';
import { BanglesetService } from './bangleset.service';
import { ChainService } from './chain.service';

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

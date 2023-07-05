import { OFFER1_PAYLOAD } from './data/offer1.payload';
import { OFFER2_PAYLOAD } from './data/offer2.payload';
import { OfferTransformerFactory } from './offer.transformer';

describe('Offer Transformer', () => {
  describe('Provider 1', () => {
    it('should return valid offers when given correct data', () => {
      const transformer =
        OfferTransformerFactory.createOfferTransformer(OFFER1_PAYLOAD);
      const result = transformer.transform();

      expect(result.length).toBe(OFFER1_PAYLOAD.response.offers.length);
    });

    it('should skip invalid offers, and return valid offers', () => {
      const temp = { ...OFFER1_PAYLOAD };
      // @ts-ignore
      temp.response.offers[0].offer_desc = undefined;
      const transformer = OfferTransformerFactory.createOfferTransformer(temp);
      const result = transformer.transform();

      expect(result.length).toBe(0);
    });
  });

  describe('Provider 2', () => {
    it('should return valid offers when given correct data', () => {
      const transformer =
        OfferTransformerFactory.createOfferTransformer(OFFER2_PAYLOAD);
      const result = transformer.transform();
      expect(result.length).toBe(Object.keys(OFFER2_PAYLOAD.data).length);
    });

    it('should skip invalid offers, and return valid offers', () => {
      const temp = { ...OFFER2_PAYLOAD };
      //@ts-ignore
      temp.data[15828].Offer.description = 4;
      const transformer = OfferTransformerFactory.createOfferTransformer(temp);
      const result = transformer.transform();
      expect(result.length).toBe(0);
    });
  });
});

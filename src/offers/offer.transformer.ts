import { Injectable } from '@nestjs/common';
import { OfferDTO } from './offer.dto';
import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class OfferTransformerFactory {
  static createOfferTransformer(input: any) {
    if (input?.response?.offers?.[0].offer_id) {
      return new Offer1Transformer(input.response.offers);
    }

    if (input.data && Object.keys(input.data).length > 0) {
      return new Offer2Transformer(Object.keys(input.data), input.data);
    }
  }
}

export abstract class OfferTransformer {
  abstract transform(): OfferDTO[];
  protected validateOffer(offer: OfferDTO) {
    const _offer = plainToInstance(OfferDTO, offer);
    const errors = validateSync(_offer, {
      validationError: { target: false },
    });
    console.log({ offer, errors: JSON.stringify(errors, null, 2) });
    if (errors.length > 0) {
      return false;
    }

    return true;
  }
}

class Offer1Transformer extends OfferTransformer {
  constructor(private offers: any) {
    super();
  }

  transform() {
    const result = [];
    for (const offer of this.offers) {
      const newOffer: OfferDTO = this.transformOffer(offer);
      const isValidOffer = this.validateOffer(newOffer);

      if (!isValidOffer) {
        console.warn(`Provider1 - Invalid offer, offerId: ${offer.offer_id}`);
      } else {
        result.push(offer);
      }
    }
    return result;
  }

  private transformOffer(offer: any): OfferDTO {
    const name = offer.offer_name
      .replace(/[^\w\s]|_/g, '') // Remove punctuation
      .replace(/\s+/g, '_'); // Replace spaces with _
    const slug = `${offer.offer_id}_${name}`;

    return {
      externalOfferId: offer.offer_id,
      name: offer.offer_name,
      slug: slug,
      description: offer.offer_desc,
      requirements: offer.call_to_action,
      offerUrlTemplate: offer.offer_url,
      thumbnail: offer.image_url,
      isDesktop: offer.platform === 'desktop',
      isAndroid: offer.platform === 'mobile' && offer.device !== 'iphone_ipad',
      isIos: offer.platform === 'mobile' && offer.device === 'iphone_ipad',
      providerName: 'offer1',
    };
  }
}

class Offer2Transformer extends OfferTransformer {
  constructor(private offers: string[], private offerData: any) {
    super();
  }

  transform() {
    const result = [];
    for (const offerId of this.offers) {
      const offer = this.offerData[offerId];
      const newOffer: OfferDTO = this.transformOffer(offer);
      const isValidOffer = this.validateOffer(newOffer);

      if (!isValidOffer) {
        console.warn(
          `Provider2 - Invalid offer, offerId: ${this.offerData[offerId]?.Offer?.campaign_id}`,
        );
      } else {
        result.push(offer);
      }
    }
    return result;
  }

  private transformOffer(input: any): OfferDTO {
    const name = input.Offer.name
      .replace(/[^\w\s]|_/g, '') // Remove punctuation
      .replace(/\s+/g, '_'); // Replace spaces with _
    const slug = `${input.Offer.campaign_id}_${name}`;

    return {
      externalOfferId: String(input.Offer.campaign_id),
      name: input.Offer.name,
      slug: slug,
      description: input.Offer.description,
      requirements: input.Offer.instructions,
      offerUrlTemplate: input.Offer.tracking_url,
      thumbnail: input.Offer.icon,
      isDesktop: input.OS.web,
      isAndroid: input.OS.android,
      isIos: input.OS.ios,
      providerName: 'offer2',
    };
  }
}

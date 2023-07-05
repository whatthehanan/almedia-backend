# ALMEDIA CODING CHALLENGE

## QUICK START

`npm install`

`npm run test`

## Solution Description

Most of the logic is in `offers/offer.transformer.ts` file

I have used `Factory Pattern` to create `OfferTransformerFactory` that can handle any number of providers. A hypothetical `OfferService` would use this factory to get the `transformer` for a respective class and transform data to the internal `Offer` type.

The `OfferTransformerFactory` can be used by two simple commands:

```typescript
const transformer =
  OfferTransformerFactory.createOfferTransformer(OFFER1_PAYLOAD);
const result = transformer.transform();
```

I have also included a `offers/offer.transformer.spec.ts` file to serve as a driver so you can try the solution yourselves.

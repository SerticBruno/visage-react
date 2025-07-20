# Photo Update Instructions

## Individual Team Member Photos

To add individual team member photos:

1. **Add the photos** to the `/public/images/team/` directory (create this directory if it doesn't exist)
2. **Update the team data** in `/src/data/team.ts`:
   - Set `hasImage: true` for each team member
   - Update the `image` path to point to the new photo
   - Optionally update or remove the `quote` property

Example:
```typescript
{
  name: 'Tatjana Torinek',
  image: '/images/team/tatjana-torinek.webp', // Update this path
  title: 'dr. spec. med. obiteljske medicine',
  credentials: [
    'dr. spec. med. obiteljske medicine',
    'član HDEM-a'
  ],
  favoriteTreatments: 'mezoterapija egzosomima, skin boosteri i plasmage',
  hasImage: true, // Change this to true
  quote: '"Kombiniram medicinsko znanje s najnovijim estetskim tehnikama kako bih pružila sigurne i učinkovite tretmane."' // Optional: keep or remove
}
```

## Group Photo

To add the group photo:

1. **Add the group photo** to the `/public/images/team/` directory
2. **Update the team data** in `/src/data/team.ts`:
   - Set `hasGroupPhoto: true`
   - Update the `image.src` path to point to the new group photo
   - Optionally update or remove the `groupQuote` property

Example:
```typescript
export const teamDetailsSection = {
  image: {
    src: '/images/team/group-photo.webp', // Update this path
    alt: 'VISAGE Studio team'
  },
  details: [
    teamDetails.tatjana,
    teamDetails.mia,
    teamDetails.helena
  ],
  hasGroupPhoto: true, // Change this to true
  groupQuote: '"Naš tim stručnjaka radi zajedno..."' // Optional: keep or remove
};
```

## Recommended Photo Specifications

- **Individual photos**: 400x600px (2:3 aspect ratio)
- **Group photo**: 800x600px (4:3 aspect ratio)
- **Format**: WebP for best performance
- **Quality**: High quality, professional photos

## Current Status

- ✅ Quote placeholders implemented
- ✅ Individual team member cards show quotes
- ✅ Group photo section shows quote
- ⏳ Waiting for actual photos to be added 
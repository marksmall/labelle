const services = [
  {
    name: 'Hair',
    icon: 'cut',
    categories: [
      {
        name: 'Patch Test',
        services: [
          {
            name: 'Patch Test',
            description: 'Some text on Patch Tests',
            duration: 5,
            cost: 5.99,
          },
        ],
      },
    ],
  },
  {
    name: 'Nails',
    icon: 'chess-board',
    categories: [
      {
        name: 'Manicures and Pedicures',
        services: [
          {
            name: 'Gel Manicure',
            description:
              'If you want a manicure that looks stunning and lasts, the gel manicure is for you.',
            duration: 60,
            cost: 29.0,
          },
          {
            name: 'Gel Manicure, with Builder and Colour',
            description:
              "A groundbreaking technique that uses gel polishes that get 'cured' under UV lights. The result? Shiny, strong nails for weeks and no drying time!.",
            duration: 90,
            options: [
              {
                name: 'Gel Manicure, with Builder and Colour',
                cost: 34.0,
              },
              {
                name:
                  'Gel Soak Off, Re-apply with Builder and Colour (our work)',
                cost: 34.0,
              },
              {
                name:
                  'Gel Soak Off, Re-apply with Builder and Colour (not our work)',
                cost: 39.0,
              },
            ],
          },
          {
            name: 'Gel Pedicure',
            description:
              'Pedicures should look stunning and last longer than a one-week beach vacation, and with the talent and artistry of the therapists at this salon.',
            duration: 60,
            cost: 29.0,
          },
          {
            name: 'Jessica Manicure',
            description:
              "A groundbreaking technique that uses gel polishes that get 'cured' under UV lights. The result? Shiny, strong nails for weeks and no drying time!.",
            options: [
              {
                name: 'Jessica Manicure - No Polish',
                duration: 35,
                cost: 20.0,
              },
              {
                name: 'Jessica Manicure with Gel',
                duration: 80,
                cost: 35.0,
              },
              {
                name:
                  'Jessica Manicure with Gel Soak Off and Re-apply (our work)',
                duration: 80,
                cost: 35.0,
              },
              {
                name:
                  'Jessica Manicure with Gel Soak Off and Re-apply (not our work)',
                duration: 80,
                cost: 40.0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Face',
    icon: 'grin-hearts',
    categories: [
      {
        name: 'Eyes',
        services: [
          {
            name: 'Eyebrow & Eyelash Tinting',
            description:
              'If you want fuller, well-defined brows that last from three to five weeks, book in for a wax and tint.',
            options: [
              {
                name: 'Eyebrow',
                duration: 15,
                cost: 11.0,
              },
              {
                name: 'Eyelash',
                duration: 30,
                cost: 16.0,
              },
              {
                name: 'Eyebrow and Eyelash',
                duration: 30,
                cost: 22.0,
              },
              {
                name:
                  'LVL Lashes - Skin tested at LaBelle within last 6 months.',
                description:
                  'Pin-straight eyelashes can go unnoticed. A lash lift opens up your eyes and adds length and body to your lashes.',
                duration: 60,
                cost: 50.0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Massage',
    icon: 'hands',
    categories: [
      {
        name: 'Massage',
        services: [
          { name: 'Back, Neck and Shoulders', duration: 30, cost: 34.0 },
          {
            name: 'Back, Neck, Shoulders Head and Face',
            duration: 45,
            cost: 42.0,
          },
          { name: 'Full Body', duration: 60, cost: 50.0 },
          { name: 'Full Body, Head and Face', duration: 75, cost: 60.0 },
        ],
      },
      {
        name: 'Reflexology',
        services: [{ name: 'Reflexology', duration: 55, cost: 42.0 }],
      },
    ],
  },
];

const getServices = () => services;

module.exports = { getServices };

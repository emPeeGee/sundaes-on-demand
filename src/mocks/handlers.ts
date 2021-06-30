import { rest } from 'msw';

export const handlers = [
  rest.get('http://localhost:3030/scoops', (request, response, ctx) => {
    return response(
      ctx.json([
        { name: 'Chocolate', imagePath: 'images/chocolate.png ' },
        { name: 'Vanilla', imagePath: '/images/vannilla.png' },
      ])
    );
  }),

  rest.get('http://localhost:3 030/toppings', (reqeust, response, ctx) => {}),
];

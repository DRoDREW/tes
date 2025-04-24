module.exports = (db) =>
    db.model(
      'Cart',
      db.Schema({
        id: {
          type: Number,
          required: true,
        },
        userId: {
          type: Number,
          ref: 'User', 
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
        products: [
          {
            productId: {
              type: Number,
              ref: 'Product', 
              required: true,
            },
            quantity: {
              type: Number,
              required: true,
            },
          },
        ],
      })
    );

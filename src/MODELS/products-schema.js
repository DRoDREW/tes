module.exports = (db) =>
  db.model(
    'Products',
    db.Schema({
      title: String,
    })
  );

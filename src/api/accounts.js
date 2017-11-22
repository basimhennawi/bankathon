import resource from 'resource-router-middleware';
import accounts from '../repositories/accounts';

export default ({ config, db }) => resource({

  /** Property name to store preloaded entity on `request`. */
  id : 'account',

  /** For requests with an `id`, you can auto-load the entity.
   *  Errors terminate the request, success sets `req[id] = data`.
   */
  load(req, id, callback) {
    let account = accounts.find( account => account.id===id ),
      err = account ? null : 'Not found';
    callback(err, account);
  },

  /** GET / - List all accounts */
  index({ params }, res) {
    accounts.all()
      .then((accounts) => res.json(accounts));
  },

  /** POST / - Create a new entity */
  create({ body }, res) {
    body.id = accounts.length.toString(36);
    accounts.push(body);
    res.json(body);
  },

  /** GET /:id - Return a given entity */
  read({ account }, res) {
    res.json(account);
  },

  /** PUT /:id - Update a given entity */
  update({ account, body }, res) {
    for (let key in body) {
      if (key!=='id') {
        account[key] = body[key];
      }
    }
    res.sendStatus(204);
  },

  /** DELETE /:id - Delete a given entity */
  delete({ account }, res) {
    accounts.splice(accounts.indexOf(account), 1);
    res.sendStatus(204);
  }
});

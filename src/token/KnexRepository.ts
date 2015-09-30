import BaseRepository = require('../BaseKnexRepository');

class Repository extends BaseRepository {

  public constructor(config, collection) {
    super(config, collection);
  }

  protected constructSchema(table) {
    table.increments('id').primary();
    table.string('value').notNullable().unique();
    table.integer('user_id').notNullable();
  }

  public createToken(token) {
    return this.connect().insert(token, 'id').then(function (ids) {
      return {
        id: ids[0],
        value: token.value,
        user_id: token.user_id
      };
    });
  }

  public getTokenByValue(value: string) {
    return this.connect().where('value', value).first().then(function (token) {
      if (!token) {
        throw new Error('No token');
      } else {
        return token;
      }
    });
  }
}

export = Repository;
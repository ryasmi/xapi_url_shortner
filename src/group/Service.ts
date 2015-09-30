import BaseService = require('../BaseService');
import q = require('q');

class Service extends BaseService {
  private repo;

  public constructor(repository) {
    this.repo = repository;
    super();
  }

  public createGroup(name: string) {
    return this.repo.createGroup({
      name: name
    });
  }

  public getGroupById(id) {
    return this.repo.getGroupById(id);
  }
}

export = Service;
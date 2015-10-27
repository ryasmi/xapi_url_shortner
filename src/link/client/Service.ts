import BaseService = require('../BaseService');

class Service extends BaseService {

  /**
   * Constructs a new Service.
   * @param {any} repository A repository.
   */
  public constructor(repository: any) {
    super(repository);
  }

  /**
   * Creates a new link.
   * @param {string} long_url The long_url to be used.
   * @param {string} custom_url The custom_url to be used (optional).
   * @return {Future}
   */
  public createLink(long_url: string, custom_url?: string) {
    if (long_url.indexOf('://') === -1) {
      long_url = 'http://'+long_url;
    }

    return this.validateLink(long_url, custom_url).then(function () {
      return this.repo.createLink({
        long_url: long_url,
        short_url: custom_url
      });
    }.bind(this)).then(function (link) {
      this.emitChange();
      return link;
    }.bind(this));
  }

  /**
   * Gets links.
   * @return {Future}
   */
  public getLinks() {
    return this.repo.getLinks();
  }
}

export = Service;
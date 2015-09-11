var Service = (function () {
    function Service(repository) {
        this.repo = repository;
    }
    Service.prototype.createLink = function (long_url) {
        return this.repo.createLink({
            long_url: long_url
        }).then(function (link) {
            return {
                id: link.id,
                long_url: link.long_url,
                short_url: this.idToShortUrl(link.id)
            };
        }.bind(this));
    };
    Service.prototype.convertBase = function (value, from_base, to_base) {
        var range = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/'.split('');
        var from_range = range.slice(0, from_base);
        var to_range = range.slice(0, to_base);
        var dec_value = ('' + value).split('').reverse().reduce(function (carry, digit, index) {
            if (from_range.indexOf(digit) === -1)
                throw new Error('Invalid digit `' + digit + '` for base ' + from_base + '.');
            return carry += from_range.indexOf(digit) * (Math.pow(from_base, index));
        }, 0);
        var new_value = '';
        while (dec_value > 0) {
            new_value = to_range[dec_value % to_base] + new_value;
            dec_value = (dec_value - (dec_value % to_base)) / to_base;
        }
        return new_value || '0';
    };
    Service.prototype.idToShortUrl = function (value) {
        return this.convertBase(value, 10, 34);
    };
    Service.prototype.shortUrlToId = function (value) {
        return this.convertBase(value, 34, 10);
    };
    return Service;
})();
module.exports = Service;

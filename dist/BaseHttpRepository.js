/// <reference path="./definitions/references.d.ts" />
var jquery = require('jquery');
var q = require('q');
var Repository = (function () {
    function Repository(endpoint) {
        this.endpoint = endpoint;
    }
    Repository.prototype.connect = function (opts) {
        var deferred = q.defer();
        opts.url = this.endpoint;
        opts.dataType = 'json';
        jquery.ajax(opts).done(function (data) {
            deferred.resolve(data);
        }).fail(function (err) {
            deferred.reject(err.responseText);
        });
        return deferred.promise;
    };
    Repository.prototype.filterModels = function (models, filterFn) {
        var deferred = q.defer();
        var filtered_models = models.filter(filterFn);
        if (filtered_models.length > 0) {
            deferred.resolve(filtered_models[0]);
        }
        else {
            deferred.reject(new Error('No model'));
        }
        return deferred.promise;
    };
    return Repository;
})();
module.exports = Repository;
//# sourceMappingURL=BaseHttpRepository.js.map
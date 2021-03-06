'use strict';

module.exports = function(Resource, resource, association) {
  // access points
  var subResourceName = association.as ? association.as.toLowerCase() :
    association.target.options.name.plural.toLowerCase();

  var associatedResource = new Resource({
    app: resource.app,
    sequelize: resource.sequelize,
    model: association.target,
    endpoints: [resource.endpoints.plural + '/:' + association.identifierField + '/' + subResourceName],
    actions: ['read'],
  });

  // @todo: this could be improved
  associatedResource.associationOptions = resource.associationOptions;
  associatedResource.controllers.read.includeAttributes = [ association.identifierField ];
  return associatedResource;
};

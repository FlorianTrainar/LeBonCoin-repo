module.exports = async (policyContext, config, { strapi }) => {

// récupère l'id de l'utilisateur qui fait la requête



const userId = policyContext.state.user.id
// récupère l'id de l'offre, envoyé en params



if (policyContext.request.method === "PUT" || policyContext.request.method === "DELETE") {

    const offerId = policyContext.request.params.id
    // va chercher l'offre en question, via l'Entity Service API, et déploie sa clef owner

    const offer = await strapi.entityService.findOne("api::offer.offer", offerId, {populate:["owner"]})
    const offerOwnerId = offer.owner.id

    if (userId !== offer.owner.id) {
     return false
    }
    // si l'id du propriétaire n'est pas le même que l'id de la personne qui fait la requête, renvoyer une erreur, passer à la suite sinon
     console.log(policyContext.request.method)  
    }

if (policyContext.request.method === "POST") {
    const requestedId = JSON.parse(policyContext.request.body.data).owner
  
    if (userId !== requestedId) {
        return false
    }
    
}

return true
}

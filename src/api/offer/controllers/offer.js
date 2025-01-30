'use strict';

/**
 * offer controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::offer.offer', ({ strapi }) => ({
    async deleteAll(ctx) {
      try {
  
        // récupérer l'id de l'utilisateur qui fait la requête

        const requestBody = ctx.state.user
        const userId = requestBody.id
        

        // utiliser l'Entity Service Api de Strapi pour récupérer les informations de cet utilisateur et, notamment, les références vers les offres qu'il a postées ; vous allez avoir besoin de déployer (populate) la clef offers de l'utilisateur
        
        const user = await strapi.entityService.findOne("plugin::users-permissions.user", userId, {populate: "offers"})

       

       

        
        // parcourir le tableau de références avec une boucle et supprimer chacune d'entre elles grâce à l'Entity Service API de Strapi
        for (let i=0; i<user.offers.length; i++) {
         let offersId = user.offers[i].id
          await strapi.entityService.delete("api::offer.offer", offersId)
        }




        return "Toutes les offres ont bien été supprimées"

        // répondre au client
        

      } catch (error) {
        ctx.response.status = 500;
        return { message: error.message };
      }
    },
  }));

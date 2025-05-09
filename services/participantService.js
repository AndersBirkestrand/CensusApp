const { sequelize } = require("../models");

class Participant {
    constructor(db) {
        this.client = db.sequelize;
        this.Participant = db.Participant;
        this.Work = db.Work;
        this.Home = db.Home;
    }
    // Add new participant.
    async addParticipant({ email, firstname, lastname, dob, work, home }) {
        return this.client.transaction(async (t) => {
          const participant = await this.Participant.create(
            {
              email,
              firstname,
              lastname,
              dob,
              Work: {
                companyname: work.companyname,
                salary:      work.salary,
                currency:    work.currency
              },
              Home: {
                country: home.country,
                city:    home.city
              }
            },
            {
              include:     [ this.Work, this.Home ],
              transaction: t
            }
            );
            return participant;
        });
    }
    // Update participant based on the email
    async updateParticipant({ email, firstname, lastname, dob, work, home }) {
      return this.client.transaction(async (t) => {
        // Check if user exists
        const participant = await this.Participant.findByPk(email, { transaction: t });
        if (!participant) {
          return null;
        }
    
        await participant.update(
          { firstname, lastname, dob },
          { transaction: t }
        );
    
        await this.Work.update(
          {
            companyname: work.companyname,
            salary:      work.salary,
            currency:    work.currency
          },
          {
            where:       { participantEmail: email },
            transaction: t
          }
        );
    
        await this.Home.update(
          {
            country: home.country,
            city:    home.city
          },
          {
            where:       { participantEmail: email },
            transaction: t
          }
        );

        return this.Participant.findOne({
          where:       { email },
          include:     [ this.Work, this.Home ],
          transaction: t
        });
      });
    }
    // Delete participant and cascade to also delete work and home
    async deleteParticipant(email) {
        return this.client.transaction(async(t) => {
            await this.Work.destroy({ where: { participantEmail: email }, transaction: t });
            await this.Home.destroy({ where: { participantEmail: email }, transaction: t });
            return this.Participant.destroy({where: { email }, transaction: t });
        });
    }

    // Return all participants including work and home
    async listAll() {
        return this.Participant.findAll({ include: [this.Work, this.Home] });
    }
    // Return only personal details for all participants
    async listDetails() {
        return this.Participant.findAll({ attributes: ["email", "firstname", "lastname"] });
    }
    // Return personal details for one participant by email
    async getDetailsByEmail(email) {
        return this.Participant.findOne({
            where: { email },
            attributes: ["email", "firstname", "lastname", "dob"]
        });
    }
    // Return work details for one participant by email
    async getWorkByEmail(email) {
        return this.Work.findOne({
            where: { participantEmail: email},
            attributes: ["companyname", "salary", "currency"]
        });
    }
    // Return home details for one participant by email
    async getHomeByEmail(email) {
        return this.Home.findOne({
            where: { participantEmail: email},
            attributes: ["country", "city"]
        });
    }


}

module.exports = Participant;
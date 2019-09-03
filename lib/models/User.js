'use strict';

module.exports = (db, DataTypes) => {
    const User = db.define('users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            validate: {isNumeric: true},
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {isNumeric: false},
        },
    });

    // User.associate = (models) => {
    //     User.belongsTo(models.TicketEscalation, {
    //         targetKey: 'id',
    //         foreignKey: {
    //             name: 'escalation_id',
    //             allowNull: true,
    //         },
    //         as: 'escalation',
    //     });
    // };


    User.getById = async (ticket_id, includeList = [], transaction = null) => {
        // извлекаем тикет
        const items = await Models.Ticket.getAll({
            where: {
                ticket: {
                    id: ticket_id
                }
            }, includeList, transaction
        });
        return items[0]
            ? items[0]
            : false;
    };

    return User;
};

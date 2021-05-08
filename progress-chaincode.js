const { Contract } = require('fabric-contract-api');

class AcademicPerformance extends Contract {

    async InitLedger(ctx) {
        const assets = [
            {
                ID: 0,
                Date: 'May 8, 2021 7:43 PM',
                NumberOfGroup: 'КТбо1-1',
                SurnameStudent: 'Иванов',
                NameStudent: 'Иван',
                PatronymicStudent: 'Иванович',
                EducationalSubject: 'Математика',
                TypeOfWork: 'Практическая работа №1',
                NumberOfPoints: 5,
                SurnameTeacher: 'Романенко',
                NameTeacher: 'Кирилл',
                PatronymicTeacher: 'Сергеевич',
            },
            {
                ID: 1,
                Date: 'May 8, 2021 7:44 PM',
                NumberOfGroup: 'КТбо1-1',
                SurnameStudent: 'Иванов',
                NameStudent: 'Иван',
                PatronymicStudent: 'Иванович',
                EducationalSubject: 'Математика',
                TypeOfWork: 'Практическая работа №2',
                NumberOfPoints: 6.5,
                SurnameTeacher: 'Романенко',
                NameTeacher: 'Кирилл',
                PatronymicTeacher: 'Сергеевич',
            },
        ];

        for (const asset of assets) {
            asset.docType = 'asset';
            await ctx.stub.putState(asset.ID, Buffer.from(JSON.stringify(asset)));
            console.info(`Asset ${asset.ID} initialized`);
        }
    }

    


}

module.exports = AcademicPerformance;

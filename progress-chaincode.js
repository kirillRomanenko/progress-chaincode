const { Contract } = require('fabric-contract-api');

class AcademicPerformance extends Contract {

    async InitLedger(ctx) {
        const assets = [
            {
                ID: 'asset1',
                Date: 'May 8, 2021 7:43 PM',
                NumberOfGroup: 'КТбо1-1',
                SurnameStudent: 'Романенко',
                NameStudent: 'Кирилл',
                PatronymicStudent: 'Сергеевич',
                EducationalSubject: 'Системный анализ',
                TypeOfWork: 'Практическая работа №1',
                NumberOfPoints: 5,
                SurnameTeacher: 'Иванов',
                NameTeacher: 'Иван',
                PatronymicTeacher: 'Иванович',
            },
            {
                ID: 'asset2',
                Date: 'May 8, 2021 7:44 PM',
                NumberOfGroup: 'КТбо1-1',
                SurnameStudent: 'Романенко',
                NameStudent: 'Кирилл',
                PatronymicStudent: 'Сергеевич',
                EducationalSubject: 'Системный анализ',
                TypeOfWork: 'Практическая работа №2',
                NumberOfPoints: 6.5,
                SurnameTeacher: 'Иванов',
                NameTeacher: 'Иван',
                PatronymicTeacher: 'Иванович',
            },
        ];

        for (const asset of assets) {
            asset.docType = 'asset';
            await ctx.stub.putState(asset.ID, Buffer.from(JSON.stringify(asset)));
            console.info(`Asset ${asset.ID} initialized`);
        }
    }

    // GetAllAssets returns all assets found in the world state.
    async GetAllAssets(ctx) {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: result.value.key, Record: record });
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }

    


}

module.exports = AcademicPerformance;

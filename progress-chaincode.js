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
            {
                ID: 'asset3',
                Date: 'May 8, 2021 7:54 PM',
                NumberOfGroup: 'КТбо1-1',
                SurnameStudent: 'Романенко',
                NameStudent: 'Кирилл',
                PatronymicStudent: 'Сергеевич',
                EducationalSubject: 'Системный анализ',
                TypeOfWork: 'Практическая работа №3',
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

    // returns all assets 
    async GetAllAssets(ctx) {
        const allResults = [];
    
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
    // new asset 
    async CreateAsset(ctx, id, date, numberOfGroup, surnameStudent, nameStudent, 
        patronymicStudent, educationalSubject, typeOfWork, numberOfPoints, surnameTeacher, nameTeacher, patronymicTeacher) {
        const asset = {
            ID: id,
            Date: date,
            NumberOfGroup: numberOfGroup,
            SurnameStudent: surnameStudent,
            NameStudent: nameStudent,
            PatronymicStudent: patronymicStudent,
            EducationalSubject: educationalSubject,
            TypeOfWork: typeOfWork,
            NumberOfPoints: numberOfPoints,
            SurnameTeacher: surnameTeacher,
            NameTeacher: nameTeacher,
            PatronymicTeacher: patronymicTeacher,
        };
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(asset)));
        return JSON.stringify(asset);
    }
    // returns the asset id.
    async ReadAsset(ctx, id) {
        const assetJSON = await ctx.stub.getState(id); 
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return assetJSON.toString();
    }
    // updates asset 
    async UpdateAsset(ctx, id, date, numberOfGroup, surnameStudent, nameStudent, 
        patronymicStudent, educationalSubject, typeOfWork, numberOfPoints, surnameTeacher, nameTeacher, patronymicTeacher) {
        const exists = await this.AssetExists(ctx, id);
        if (!exists) {
            throw new Error(`The asset ${id} does not exist`);
        }

        // overwriting original asset with new asset
        const updatedAsset = {
            ID: id,
            Date: date,
            NumberOfGroup: numberOfGroup,
            SurnameStudent: surnameStudent,
            NameStudent: nameStudent,
            PatronymicStudent: patronymicStudent,
            EducationalSubject: educationalSubject,
            TypeOfWork: typeOfWork,
            NumberOfPoints: numberOfPoints,
            SurnameTeacher: surnameTeacher,
            NameTeacher: nameTeacher,
            PatronymicTeacher: patronymicTeacher,
        };
        return ctx.stub.putState(id, Buffer.from(JSON.stringify(updatedAsset)));
    }

    


}

module.exports = AcademicPerformance;

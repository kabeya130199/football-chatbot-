const { AppearanceSchema } = require('./Appearance.schema');

const updateAppearance = (appearanceObj) => {
    const { email, onlineStatus, status, bgColor, botName, labelText, uuid, foreColor } = appearanceObj;
    console.log(foreColor)
    return new Promise((resolve, reject) => {
        try {
            AppearanceSchema.findOneAndUpdate(
                {email},
                {
                    $set: {"bgColor": bgColor, "onlineStatus": onlineStatus, "status": status, "botName": botName, "labelText": labelText, "uuid": uuid, "foreColor": foreColor },
                },
            ).then(data=> resolve(data))
            .catch((error) => {
                reject(error);
                console.log(error);
            });
        } catch (error) {
            reject(error);
        }
    })
}

const insertAppearance = (appearanceObj) => {
    return new Promise((resolve, reject) => {
        AppearanceSchema(appearanceObj)
            .save()
            .then((data)=>resolve(data))
            .catch((error)=>reject(error));
    })
}


const getApperanceByUuid = (uuid) => {
    return new Promise((resolve, reject) => {
        console.log("uuid" + uuid)
        if( !uuid ) return false;
        try {
            AppearanceSchema.findOne({uuid}, (error, data) => {
                if(error){
                    reject(error)
                }
                resolve(data);
            })
        } catch (error) {
            reject(error);
        }
        
    })
}

const getApperanceByEmail = (email) => {
    return new Promise((resolve, reject) => {
        
        if( !email ) return false;
        try {
            AppearanceSchema.findOne({email}, (error, data) => {
                if(error){
                    reject(error)
                }
                resolve(data);
            })
        } catch (error) {
            reject(error);
        }
        
    })
}




module.exports = {
    updateAppearance,
    getApperanceByUuid,
    insertAppearance,
    getApperanceByEmail
};
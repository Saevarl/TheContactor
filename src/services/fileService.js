import * as FileSystem from 'expo-file-system';
const contactDirectory = `${FileSystem.documentDirectory}contacts`;
const replaceSpecialCharacters = require('replace-special-characters');




const onException = (cb, errorHandler) => {
    try {
        return cb();
    } catch (err) {
        if (errorHandler) {
            return errorHandler(err);
        }
        console.error(err);
    }
}

export const cleanDirectory = async () => {
    await FileSystem.deleteAsync(contactDirectory);
}

export const addContact = async contact => {
    await setupDirectory();
    const contactName = replaceSpecialCharacters(contact.name).replace(/\s/g, '_');
    const fileName = `${contactName}-${contact.id}.json`;
    const file = `${contactDirectory}/${fileName}`;
    await onException(() => FileSystem.writeAsStringAsync(file, JSON.stringify(contact), { encoding: FileSystem.EncodingType.UTF8 }));

    return {
        name: fileName,
        type: 'string',
        file: await loadContact(fileName)
    };
    
}
export const remove = async contact => {
    const contactName = replaceSpecialCharacters(contact.name).replace(/\s/g, '_');
    const fileName = `${contactName}-${contact.id}.json`;
    return await onException(() => FileSystem.deleteAsync(`${contactDirectory}/${fileName}`, { idempotent: true }));
}

export const loadContact = async fileName => {
    return await onException(() => FileSystem.readAsStringAsync(`${contactDirectory}/${fileName}`, {
        encoding: FileSystem.EncodingType.UTF8
    }));
}

const setupDirectory = async () => {
    const dir = await FileSystem.getInfoAsync(contactDirectory);
    if (!dir.exists) {
        await FileSystem.makeDirectoryAsync(contactDirectory);
    }
}

export const getAllContacts = async () => {
    await setupDirectory();
    const result = await onException(() => FileSystem.readDirectoryAsync(contactDirectory));
    return Promise.all(result.map(async fileName => {
        return {
            name: fileName,
            type: 'string',
            file: await loadContact(fileName)
        };
    }));
}
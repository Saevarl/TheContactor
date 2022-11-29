import * as FileSystem from 'expo-file-system';
const contactDirectory = `${FileSystem.documentDirectory}contacts`;

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

export const copyFile = async (file, newLocation) => {
    return await onException(() => FileSystem.copyAsync({
        from: file,
        to: newLocation
    }));
}

export const addContact = async contact => {
    console.log("Adding contact");
    await setupDirectory();
    const fileName = `${contact.name}-${contact.id}.json`;
    const file = `${contactDirectory}/${fileName}`;
    console.log(file);
    await onException(() => FileSystem.writeAsStringAsync(file, JSON.stringify(contact), { encoding: FileSystem.EncodingType.UTF8 }));

    return {
        name: fileName,
        type: 'string',
        file: await loadContact(fileName)
    };
    
}




export const remove = async name => {
    return await onException(() => FileSystem.deleteAsync(`${contactDirectory}/${name}`, { idempotent: true }));
}

export const loadContact = async fileName => {
    return await onException(() => FileSystem.readAsStringAsync(`${contactDirectory}/${fileName}`, {
        encoding: FileSystem.EncodingType.UTF8
    }));
}

const setupDirectory = async () => {
    console.log("Setting up directory");
    const dir = await FileSystem.getInfoAsync(contactDirectory);
    if (!dir.exists) {
        await FileSystem.makeDirectoryAsync(contactDirectory);
    }
}

export const getAllContacts = async () => {
    // Check if directory exists
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
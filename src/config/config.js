const _module = {
  port: 80,
  //db: 'mongodb://localhost:27017/portafolio',
  db: 'mongodb+srv://taxpeoples:taxpeoples@cluster0.0puxi.mongodb.net/taxpeoples',
  SECRET_TOKEN: 'miclavedetokens',
  getStorageAccountName: () => {
      const matches = /AccountName=(.*?);/.exec(process.env.AZURE_STORAGE_CONNECTION_STRING);
      return matches[1];
  }
};

module.exports = _module;
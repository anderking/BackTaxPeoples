const _module = {
	port: process.env.PORT,
	db: process.env.CONECTION_STRING_BD,
	SECRET_TOKEN: process.env.SECRET_TOKEN_JWT,
	getStorageAccountName: () => {
		const matches = /AccountName=(.*?);/.exec(
			process.env.AZURE_STORAGE_CONNECTION_STRING
		);
		return matches[1];
	},
};

module.exports = _module;

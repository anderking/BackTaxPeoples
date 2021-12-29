"use strict";

var User = require("../models/user");
var Publication = require("../models/publication");
var fs = require("fs");
const azureStorage = require("azure-storage");
const getStream = require("into-stream");

var controller = {
	uploadUserImageAzure: function (req, res) {
		if (!req.files || Object.keys(req.files).length === 0) {
			return res.status(400).send("No hay imagen para procesar.");
		}

		const id = req.params.id;
		const file = req.files.image;

		const blobService = azureStorage.createBlobService();
		const containerName = "images";

		const getBlobName = (name) => {
			const identifier = Math.random().toString().replace(/0\./, ""); // remove "0." from start of string
			return `${identifier}-${name}`;
		};
		const blobName = getBlobName(file.name);
		const imageOnline = `${process.env.DOMAINURL}/${containerName}/${blobName}`;
		const filePath = file.name;
		const fileSplit = filePath.split(".");
		const fileExt = fileSplit[fileSplit.length - 1];
		if (
			fileExt == "png" ||
			fileExt == "jpg" ||
			fileExt == "jpeg" ||
			fileExt == "gif"
		) {
			const stream = getStream(file.data);
			const streamLength = file.data.length;
			blobService.createBlockBlobFromStream(
				containerName,
				blobName,
				stream,
				streamLength,
				(err) => {
					if (err) {
						console.log(err);
						return;
					}
					User.findByIdAndUpdate(
						id,
						{ image: imageOnline },
						{ new: true },
						(err, userUpdated) => {
							if (err)
								return res.status(500).send({
									message: "Error al buscar el usuario en el servidor",
								});

							if (!userUpdated)
								return res.status(404).send({
									message: "El usuario no existe y no se ha asignado la imagen",
								});
							return res.status(200).send({
								message: "Imagen cargada exitosamente.",
							});
						}
					);
				}
			);
		} else {
			fs.unlink(filePath, (err) => {
				return res
					.status(200)
					.send({ message: "La extensión de la imagen no es válida" });
			});
		}
	},

	uploadPublicationImageAzure: function (req, res) {
		if (!req.files || Object.keys(req.files).length === 0) {
			return res.status(400).send("No hay imagen para procesar.");
		}

		var id = req.params.id;
		const file = req.files.image;

		const blobService = azureStorage.createBlobService();
		const containerName = "images";

		const getBlobName = (name) => {
			const identifier = Math.random().toString().replace(/0\./, ""); // remove "0." from start of string
			return `${identifier}-${name}`;
		};
		const blobName = getBlobName(file.name);
		const imageOnline = `${process.env.DOMAINURL}/${containerName}/${blobName}`;
		const filePath = file.name;
		const fileSplit = filePath.split(".");
		const fileExt = fileSplit[fileSplit.length - 1];
		if (
			fileExt == "png" ||
			fileExt == "jpg" ||
			fileExt == "jpeg" ||
			fileExt == "gif"
		) {
			const stream = getStream(file.data);
			const streamLength = file.data.length;
			blobService.createBlockBlobFromStream(
				containerName,
				blobName,
				stream,
				streamLength,
				(err) => {
					if (err) {
						console.log(err);
						return;
					}
					Publication.findByIdAndUpdate(
						id,
						{ image: imageOnline },
						{ new: true },
						(err, publicationUpdated) => {
							if (err)
								return res
									.status(500)
									.send({ message: "Error en el Servidor" });

							if (!publicationUpdated)
								return res.status(404).send({
									message:
										"No existe la Publicación, no se puede actualizar la Imagen.",
								});

							return res.status(200).send({
								publication: publicationUpdated,
							});
						}
					);
				}
			);
		} else {
			fs.unlink(filePath, (err) => {
				return res
					.status(200)
					.send({ message: "La extensión de la imagen no es válida" });
			});
		}
	},
};

module.exports = controller;

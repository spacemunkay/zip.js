var URL = "lorem.zip";

var zipFs = new zip.fs.FS();

function onerror(message) {
	console.error(message);
}

function zipImportedZip(callback) {
	var directory = zipFs.root.addDirectory("import");
	directory.importHttpContent(URL, false, function() {
		zipFs.exportBlob(callback, null, onerror);
	});
}

function unzipBlob(blob, callback) {
	zipFs.importBlob(blob, function() {
		var directory = zipFs.root.getChildByName("import");
		var firstEntry = directory.children[0];
		firstEntry.getText(callback);
	}, null, onerror);
}

function logText(text) {
	console.log(text);
	console.log("--------------");
}

zip.workerScriptsPath = "../";
zipImportedZip(function(zippedBlob) {
	unzipBlob(zippedBlob, function(unzippedText) {
		logText(unzippedText);
	});
});

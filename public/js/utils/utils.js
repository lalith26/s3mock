module.exports = {
	convertAWSResponseToTree: function convertAWSResponseToTree (data, tree) {
		if (data.Contents && data.Contents.length) {
			data.Contents.forEach(function(item) {
				if (item.Key) {
					var folderPathArray = item.Key.split('/').filter(function(item) {return item !== ''});
					if (folderPathArray && folderPathArray.length) {
						if (folderPathArray.length === 1) {
							if (item.Key[item.Key.length - 1] === '/') {
								tree.add(folderPathArray[0], '/', tree.traversal, true, item.Key);
							} else {
								tree.add(folderPathArray[0], '/', tree.traversal, false, item.Key);
							}
						} else {
							for (var j = 1; j <= folderPathArray.length - 1; j++) {
								if (j === folderPathArray.length - 1) {
									if (item.Key[item.Key.length - 1] === '/') {
										tree.add(folderPathArray[j], folderPathArray[j - 1], tree.traversal, true, item.Key);
									} else {
										tree.add(folderPathArray[j], folderPathArray[j - 1], tree.traversal, false, item.Key);
									}
								} else if (j + 1 <= folderPathArray.length - 1) {
									tree.add(folderPathArray[j], folderPathArray[j - 1], tree.traversal, true, item.Key);
								}
							}
						}
					}
				}
			});
		}
	}
};

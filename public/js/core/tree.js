function Queue() {
    this._oldestIndex = 1;
    this._newestIndex = 1;
    this._storage = {};
}

Queue.prototype.size = function size () {
    return this._newestIndex - this._oldestIndex;
};

Queue.prototype.enqueue = function enqueue (data) {
    this._storage[this._newestIndex] = data;
    this._newestIndex++;
};

Queue.prototype.dequeue = function dequeue () {
    var oldestIndex = this._oldestIndex,
        newestIndex = this._newestIndex,
        deletedData;

    if (oldestIndex !== newestIndex) {
        deletedData = this._storage[oldestIndex];
        delete this._storage[oldestIndex];
        this._oldestIndex++;

        return deletedData;
    }
};

function Node (data, type) {
	this.data = data;
	this.parent = null;
	this.type = type;
	this.children = [];
}

Node.prototype.traversal = function traversal (callback) {
	var q = new Queue();
	q.enqueue(this);
	var currentNode = q.dequeue();
	while (currentNode) {
		for (var i = 0; i < currentNode.children.length; i++) {
			q.enqueue(currentNode.children[i]);
		}
		callback(currentNode);
		currentNode = q.dequeue();
	}
}

Node.prototype.add = function add (data, parentData, traversal, isFolder, originalPath) {
	var child = new Node(data),
		parent = null,
		callback = function (node) {
			if (node.data === parentData) {
				parent = node;
			}
		};
	this.contains(callback, traversal);

	if (isFolder) {
		child.type = 'FOLDER';
		child.fullPath = '';
	} else {
		child.type = 'FILE';
		child.fullPath = originalPath;
	}

	if (parent) {
		parent.children.push(child);
		child.parent = parent;
	} else {
		console.log('Cannot add node to non existing parent');
	}
}

Node.prototype.contains = function contains (callback, traversal) {
	traversal.call(this, callback);
}

function createTree (data, type) {
	return new Node(data, type);
}

module.exports = {
	createTree: createTree
};

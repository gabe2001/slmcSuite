enyo.kind({
	name: "slmc.Suite.Event",
	kind: "FittableRows",
	classes: "enyo-fit",
	components: [
		{kind: "List", classes: "enyo-unselectable", fit: true, multiSelect: false, onSetupItem: "setupItem", components: [
				{name: "item", kind: "ContactItem", classes: "enyo-border-box", onRemove: "removeTap"}
			]},
		{kind: "onyx.MoreToolbar", classes: "toolbar", layoutKind: "FittableColumnsLayout", components: [
				{content: "2013 NL SA #4"},
				{kind: "Button", content: "F", ontap: "sortDbByName"},
				{kind: "Button", content: "C", ontap: "sortDbByEmail"},
				{fit: true},
				{kind: "onyx.IconButton", src: "assets/menu-icon-refresh.png", ontap: "populateList"}
			]}
	],
	create: function() {
		this.inherited(arguments);
		this.populateList();
	},
	setupItem: function(inSender, inEvent) {
		var i = inEvent.index;
		var data = this.filter ? this.filtered : this.db;
		var item = data[i];
		// content
		this.$.item.setContact(item);
		// selection
		this.$.item.setSelected(inSender.isSelected(i));
		// divider
	},
	refreshList: function() {
		if (this.filter) {
			this.filtered = this.generateFilteredData(this.filter);
			this.$.list.setCount(this.filtered.length);
		} else {
			this.$.list.setCount(this.db.length);
		}
		this.$.list.refresh();
	},
	removeItem: function(inIndex) {
		this._removeItem(inIndex);
		this.$.list.getSelection().remove(inIndex);
		this.refreshList();
	},
	_removeItem: function(inIndex) {
		var i = this.filter ? this.filtered[inIndex].dbIndex : inIndex;
		this.db.splice(i, 1);
	},
	removeTap: function(inSender, inEvent) {
		this.removeItem(inEvent.index);
		return true;
	},
	removeSelected: function() {
		// get selected items, sort numerically in decending order
		var selected = enyo.keys(this.$.list.getSelection().getSelected());
		selected.sort(function(a,b) { return b-a; });
		// remove items one-by-one, starting with last in the list
		for (var i=0; i < selected.length; i++) {
			this._removeItem(selected[i]);
		}
		// clear selection, since all selected items are now gone
		this.$.list.getSelection().clear();
		// re-render list in current position
		this.refreshList();
	},
	populateList: function() {
		var req = new enyo.JsonpRequest({
			url: "http://www.slotracinglemans.com/newforum/jsonEvent.php",
			callbackName: "callback"
		});
		req.go();
		req.response(this, "populateDb");
	},
	populateDb: function(inRequest, inResponse) {
		this.db = [];
		for (var i=0; i<inResponse.length; i++) {
			var item = inResponse[i];
			this.db.push(this.generateItem(item.firstname + " " + item.lastname, item.email, item.uid + ": " + item.username));
		}
		this.sortDb();
		this.redrawList();
	},
	redrawList: function() {
		this.$.list.setCount(this.db.length);
		this.$.list.reset();
	},
	generateItem: function(inName, inEmail, inId) {
		return {
			name: inName,
			avatar: "assets/avatars/" + avatars[enyo.irand(avatars.length)],
			title: inId,
			email: inEmail
		};
	},
	sortDb: function() {
		this.db.sort(function(a, b) {
			if (a.name < b.name) return -1;
			else if (a.name > b.name) return 1;
			else return 0;
		});
	},
	sortDbByName: function() {
		this.db.sort(function(a, b) {
			if (a.name < b.name) return -1;
			else if (a.name > b.name) return 1;
			else return 0;
		});
		this.redrawList();
	},
	sortDbByEmail: function() {
		this.db.sort(function(a, b) {
			if (a.email < b.email) return -1;
			else if (a.email > b.email) return 1;
			else return 0;
		});
		this.redrawList();
	}
});

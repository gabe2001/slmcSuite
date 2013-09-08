enyo.kind({
	name: "slmc.Suite.Event",
	kind: "FittableRows",
	classes: "list-sample-contacts enyo-fit",
	components: [
	    {kind: "onyx.MoreToolbar", classes: "list-sample-contacts-list", components: [
	        {content: "2013 NL Scaleauto"},
	        {fit: true},
	        {content: "Standings"},
	        {content: "r4"}
	    ]},
	    {kind: "List", classes: "list-sample-contacts-list enyo-unselectable", fit: true, multiSelect: false,
			onSetupItem: "setupItem", components: [
	    	{name: "item", kind: "ContactItem", classes: "list-sample-contacts-item enyo-border-box", onRemove: "removeTap"}
	    ]},
		{kind: "onyx.MoreToolbar", classes: "list-sample-contacts-list", layoutKind: "FittableColumnsLayout", style: "height: 55px;", components: [
		    {kind: "onyx.InputDecorator", components: [
		        {kind: "onyx.Input", name: "searchValue", placeholder: "Search...", style: "width: 80px;", oninput: "searchInputChange"}
		    ]},
			{fit: true},
			{kind: "onyx.Button", content: "reload", ontap: "populateList"},
			{name: "userCount", content: "0"}
		]}
	],
	rendered: function() {
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
		this.updateUserCount();
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
		this.clearFilter();
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
		this.updateUserCount();
		this.redrawList();
	},
	updateUserCount: function() {
		this.$.userCount.setContent(this.db.length);
	},
	redrawList: function() {
		this.$.list.setCount(this.db.length);
		this.$.list.reset();
	},
	generateItem: function(inName, inEmail, inId) {
		return {
			name: inName,
			avatar: "../assets/avatars/" + avatars[enyo.irand(avatars.length)],
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
	showSetupPopup: function() {
		this.$.popup.show();
	},
	searchInputChange: function(inSender) {
		enyo.job(this.id + ":search", enyo.bind(this, "filterList", inSender.getValue()), 200);
	},
	filterList: function(inFilter) {
		if (inFilter != this.filter) {
			this.filter = inFilter;
			this.filtered = this.generateFilteredData(inFilter);
			this.$.list.setCount(this.filtered.length);
			this.$.userCount.setContent(this.filtered.length);
			this.$.list.reset();
		}
	},
	clearFilter: function() {
		this.filterList();
		this.$.searchValue.setValue("");
	},
	generateFilteredData: function(inFilter) {
		var re = new RegExp("^" + inFilter, "i");
		var r = [];
		for (var i=0, d; (d=this.db[i]); i++) {
			if (d.name.match(re)) {
				d.dbIndex = i;
				r.push(d);
			}
		}
		return r;
	},
	countSliderChanging: function(inSender, inEvent){
		this.$.countOutput.setContent(Math.round(inSender.getValue()) * 50);
	},
	rowsSliderChanging: function(inSender, inEvent){
		this.$.rowsPerPageOutput.setContent(Math.round(inSender.getValue()) * 5);
	}
});

var avatars = [
	"angel.png",
	"astrologer.png",
	"athlete.png",
	"baby.png",
	"clown.png",
	"devil.png",
	"doctor.png",
	"dude.png",
	"dude2.png",
	"dude3.png",
	"dude4.png",
	"dude5.png",
	"dude6.png"
];

// It's convenient to create a kind for the item we'll render in the contacts list.
enyo.kind({
	name: "ContactItem",
	events: {
		onRemove: ""
	},
	published: {
		importance: 0
	},
	components: [
		{name: "avatar", kind: "Image", classes: "list-sample-contacts-avatar"},
		{components: [
			{name: "name"},
			{name: "title", classes: "list-sample-contacts-description"},
			{name: "email", classes: "list-sample-contacts-description"}
		]},
		{name: "remove", kind: "onyx.IconButton", classes: "list-sample-contacts-remove-button", src: "../assets/remove-icon.png", ontap: "removeTap"}
	],
	setContact: function(inContact) {
		this.$.name.setContent(inContact.name);
		this.$.avatar.setSrc(inContact.avatar);
		this.$.title.setContent(inContact.title);
		this.$.email.setContent(inContact.email);
	},
	setSelected: function(inSelected) {
		this.addRemoveClass("list-sample-contacts-item-selected", inSelected);
		this.$.remove.applyStyle("display", inSelected ? "inline-block" : "gne");
	},
	removeTap: function(inSender, inEvent) {
		this.doRemove(inEvent);
		return true;
	}
});
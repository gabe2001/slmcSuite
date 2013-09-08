var apps = [
    {
    	name: "Users",
    	url: "source/Users.html"
    },
    {
    	name: "Event",
    	url: "source/Event.html"
    },
    {
    	name: "slm.c",
    	url: "http://www.slotracinglemans.com"
    }
];

enyo.kind({
	name: "slmc.Suite",
	kind: "FittableRows",
	classes: "slmc-suite enyo-fit",
	components: [
	    {kind: "onyx.MoreToolbar", classes: "slmc-suite", components: [
	        {content: "slm.c Suite"}
	    ]},
	    {kind: "List", classes: "list-sample-contacts-list enyo-unselectable", fit: true, multiSelect: false,
			onSetupItem: "setupItem", onSelect: "selectApp", components: [
	    	{name: "item", kind: "AppItem", classes: "list-sample-contacts-item enyo-border-box"}
		]}
	],
	rendered: function() {
		this.inherited(arguments);
		this.loadApps();
	},
	setupItem: function(inSender, inEvent) {
		var i = inEvent.index;
		var item = apps[i];
		// content
		this.$.item.setApp(item);
	},
	loadApps: function() {
		this.$.list.setCount(apps.length);
		this.$.list.reset();
	},
	redrawList: function() {
		this.$.list.setCount(this.db.length);
		this.$.list.reset();
	},
	selectApp: function(inSender, inEvent) {
		var i = inEvent.index;
		self.location = apps[i].url;
		return true;
	},
	generateItem: function(inName, inUrl) {
		return {
			name: inName,
			url: inUrl
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


// It's convenient to create a kind for the item we'll render in the contacts list.
enyo.kind({
	name: "AppItem",
	events: {
		onRemove: ""
	},
	components: [
		{name: "avatar", kind: "Image", classes: "list-sample-contacts-avatar"},
		{components: [
			{name: "name"},
			{name: "url"}
		]}
	],
	setApp: function(inApp) {
		this.$.name.setContent(inApp.name);
		this.$.url.setContent(inApp.url);
	}
});
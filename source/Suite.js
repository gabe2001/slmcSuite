var apps = [
    {
    	name: "Users",
    	url: "source/Users.html",
    	icon: "assets/avatars/baby.png"
    },
    {
    	name: "Event",
    	url: "source/Event.html",
    	icon: "assets/events_icon.png"
    },
    {
    	name: "slm.c",
    	url: "http://www.slotracinglemans.com",
    	icon: "assets/slmc_icon.jpg"
    }
];

enyo.kind({
	name: "slmc.Suite",
	kind: "FittableRows",
	classes: "slmc-suite enyo-fit",
	components: [
	    {kind: "onyx.MoreToolbar", classes: "slmc-suite", components: [
	        {content: "slm.c Suite"}
	        // {kind: "Image", src: "assets/logo_lms124_32.png"}
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
	selectApp: function(inSender, inEvent) {
		// published properties access
		//self.location = this.$.item.getUrl();
		// (un)published properties access
		self.location = this.$.item.url;
		//return true;
	}
});


// It's convenient to create a kind for the item we'll render in the contacts list.
enyo.kind({
	name: "AppItem",
	events: {
		onRemove: ""
	},
//	published: {
//		url: null
//	},
	url: null,
	components: [
		{name: "appIcon", kind: "Image", classes: "list-sample-contacts-avatar"},
		{name: "name"}
	],
	setApp: function(inApp) {
		this.$.name.setContent(inApp.name);
		this.$.appIcon.setSrc(inApp.icon);
		// published properties have getter, setter and change methods
		//this.setUrl(inApp.url);
		// directly setting a property (not purist):
		this.url = inApp.url;
	}
});
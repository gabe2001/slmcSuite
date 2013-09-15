/**
 * slm.c Suite
 */

enyo.kind({
	name: "slmc.Suite",
	kind: "enyo.FittableColumns",
	menuLoaded: false,
	components:[
		{kind: "enyo.Signals", onmenubutton: "toggleMenu"},
		{kind: "onyx.Drawer", name: "menuDrawer", open: false, orient: "h", animated: false, components: [
				{kind: "enyo.FittableRows", fit: true, components: [
						{kind: "Sound", name: "sound", src: "assets/Effect_Tick.ogg", preload: "true"},
						{kind: "onyx.Toolbar", ontap: "toggleMenu", classes: "menu", components: [
								{kind: "enyo.Control", content: "Menu"}
							]},
						{kind: "enyo.FittableRows", name: "menuItems", ontap: "showPanel", fit: "true"}
					]}
			]},
		{kind: "enyo.FittableRows", classes: "mainview", components: [
				{kind: "onyx.Toolbar", ontap: "toggleMenu", classes: "toolbar", components: [
						{kind: "onyx.IconButton", src: "assets/menutap.jpg"},
						{kind: "enyo.Image", src: "assets/logo_lms124_32.png"}
					]},
				{kind: "enyo.FittableRows", fit: true, components: [
						{kind: "enyo.Panels", name: "mainView", arrangerKind: "CardArranger", fit: true, draggable: false}
					]}
			]}
	],
	rendered: function() {
		this.inherited(arguments);
		this.setApp();
	},
	setApp: function() {
		// create all menu and panel items on the fly
		for (var i = 0; i < menuItemData.length; i++) {
			// instanciate a slmc.MenuItem and add it to menuItems
			this.$.menuItems.createComponent({kind: "slmc.MenuItem"}, {owner: this.$.menuItems});
			// get the new instance and set the label string and the index value
			var item = this.$.menuItems.getComponents()[i];
			item.$.menuItem.children[0].setContent(menuItemData[i].label);
			item.setIndex(i);
			// create the corresponding panels container
			this.$.mainView.createComponent(menuItemData[i].content[0], {owner: this.$.mainView});
		}
		// now draw them
		this.$.menuItems.render();
		this.$.mainView.render();
	},
	toggleMenu: function(inSender, inEvent) {
		this.$.menuDrawer.setOpen(!this.$.menuDrawer.open);
		this.$.sound.play();
		return true;
	},
	showPanel: function(inSender, inEvent) {
		// enyo.log("showPanel", inSender, inEvent);
		// enyo.log(inEvent.originator.owner.index);
		if (inEvent.originator.owner.index >= 0) {
			this.toggleMenu(inSender, inEvent);
			this.$.mainView.setIndex(inEvent.originator.owner.index);
		}
		return true;
	},
	setupItem: function(inSender, inEvent) {
		var i = inEvent.index;
		this.$.menuItem.setMenuItem(menuItemData[i].name, i);
	}
});


enyo.kind({
	name: "slmc.MenuItem",
	kind: "enyo.Control",
	count: 0,
	published: {
		index: 0
	},
	components: [
		{name: "menuItem", ontap: "showPanel", fit: true, classes: "menuitem", components: [
					{kind: "enyo.Control", name: "menuLabel"}
				]}
	],
	create: function() {
		this.inherited(arguments);
	},
	showPanel: function(inSender, inEvent) {
		// event passed to parent unless this one returns true
	}
});
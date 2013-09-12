/**
 * slm.c Suite
 */

enyo.kind({
	name: "slmc.Suite",
	kind: "enyo.FittableColumns",
	menuLoaded: false,
	components:[
		{kind: "enyo.Signals", onmenubutton: "toggleMenu"},
		{kind: "onyx.Drawer", name: "menuDrawer", open: false, orient: "h", animated: false, style: "background: grey", components: [
				{kind: "enyo.FittableRows", fit: true, style: "width: 150px;", components: [
						{kind: "onyx.Toolbar", ontap: "toggleMenu", style: "height: 55px;", components: [
								{kind: "enyo.Control", content: "slm.c", style: "color: #CCDDFF;"}
							]},
						{kind: "enyo.FittableRows", name: "menuItems", ontap: "showPanel", fit: true}
					]}
			]},
		{kind: "enyo.FittableRows", style: "background: url(assets/bg.png); min-width: 100%; max-width: 100%", components: [
				{kind: "onyx.Toolbar", ontap: "toggleMenu", style: "background: transparent; height: 55px; border-style: hidden;", components: [
						{kind: "onyx.IconButton", src: "assets/grabbutton.png"},
						{kind: "enyo.Image", src: "assets/logo_lms124_32.png"}
					]},
				{kind: "enyo.FittableRows", fit: true, style: "padding: 1px 3px 3px 3px;", components: [
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
		{name: "menuItem", ontap: "showPanel", fit: true, style: "color: #CCDDFF; background: url(assets/menu-item.png); height: 55px;", components: [
					{kind: "enyo.Control", name: "menuLabel", style: "padding-top: 17px; padding-left: 16px;"}
				]}
	],
	create: function() {
		this.inherited(arguments);
	},
	showPanel: function(inSender, inEvent) {
		// event passed to parent unless this one returns true
	}
});

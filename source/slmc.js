/**
 * slm.c Suite
 */

enyo.kind({
	name: "slmc.Suite",
	kind: "enyo.FittableColumns",
	menuLoaded: false,
	components:[
		{kind: "onyx.Drawer", name: "menuDrawer", open: false, orient: "h", animated: false, style: "background: grey", components: [
				{kind: "enyo.FittableRows", fit: true, style: "width: 120px;", components: [
						{kind: "onyx.Toolbar", style: "height: 55px;", ontap: "toggleMenu", components: [
								{kind: "enyo.Control", content: "slm.c", style: "color: #CCDDFF;"}
							]},
						{kind: "enyo.FittableRows", name: "menuItems", ontap: "showPanel", fit: true}
					]}
			]},
		{kind: "enyo.FittableRows", fit: true, style: "background: url(assets/bg.png);", components: [
				{kind: "onyx.Toolbar", style: "background: transparent; height: 55px; border-style: hidden;", components: [
						{kind: "onyx.IconButton", src: "assets/grabbutton.png", ontap: "toggleMenu", ondragstart: "toggleMenu"},
						{kind: "enyo.Image", src: "assets/logo_lms124_32.png"}
					]},
				{kind: "enyo.Panels", name: "mainView", arrangerKind: "CardArranger", fit: true, draggable: true}
			]}
	],
	rendered: function() {
		this.inherited(arguments);
		this.setApp();
	},
	toggleMenu: function(inSender, inEvent) {
		this.$.menuDrawer.setOpen(!this.$.menuDrawer.open);
	},
	setApp: function() {
		// create all menu and panel items on the fly
		for (var i = 0; i < menuItemData.length; i++) {
			this.$.menuItems.createComponent({kind: "slmc.MenuItem"}, {owner: this.$.menuItems});
			var item = this.$.menuItems.getComponents()[i];
			item.$.menuItem.setContent(menuItemData[i].label);
			item.setIndex(i);
			this.$.mainView.createComponent(menuItemData[i].content[0], {owner: this.$.mainView});
		}
		// now draw them
		this.$.menuItems.render();
		this.$.mainView.render();
	},
	showPanel: function(inSender, inEvent) {
		// enyo.log("showPanel", inEvent);
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
		{name: "menuItem", ontap: "showPanel", fit: true,
			style: "color: #CCDDFF; background: url(assets/menu-item.png); height: 55px;"}
	],
	create: function() {
		this.inherited(arguments);
	},
	showPanel: function(inSender, inEvent) {
		// event passed to parent unless this one returns true
	}
});

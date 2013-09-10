/**
 * slm.c Suite
 */

						// {kind: "slmc.Suite.Home"},
						// {kind: "slmc.Suite.Event"},
						// {kind: "slmc.Suite.Users"},


enyo.kind({
	name: "slmc.Suite",
	kind: "enyo.FittableColumns",
	menuLoaded: false,
	components:[
		{kind: "onyx.Drawer", name: "menuDrawer", open: false, orient: "h", animated: false, components: [
				{kind: "enyo.FittableRows", fit: true, style: "width: 120px; background: #CCDDFF;", components: [
						{kind: "onyx.Toolbar", style: "height: 55px;", ontap: "toggleMenu", components: [
								{kind: "enyo.Control", content: "slm.c", style: "color: #CCDDFF;"}
							]},
						{kind: "enyo.Control", name: "menuItems", ontap: "showPanel", fit:true}
					]}
			]},
		{kind: "enyo.FittableRows", fit: true, style: "background: url(assets/bg.png);", components: [
				{kind: "onyx.Toolbar", style: "background: transparent; height: 55px; border-style: hidden;", components: [
						{kind: "onyx.IconButton", src: "assets/grabbutton.png", ontap: "toggleMenu", ondragstart: "toggleMenu"},
						{kind: "enyo.Image", src: "assets/logo_lms124_32.png"}
					]},
				{kind: "enyo.Panels", name: "mainView", arrangerKind: "CardArranger", style: "", fit: true, components: [
						{content: "slmc.Suite.Home"},
						{kind: "slmc.Suite.Event"},
						{kind: "slmc.Suite.Users"},
						{content: "forum page"}
					]}
			]}
	],
	rendered: function() {
		this.inherited(arguments);
		this.loadMenuItems();
	},
	toggleMenu: function(inSender, inEvent) {
		this.$.menuDrawer.setOpen(!this.$.menuDrawer.open);
	},
	loadMenuItems: function() {
		// create all menu items on the fly
		for (var i = 0; i < menuItemData.length; i++) {
			this.$.menuItems.createComponent({kind: "slmc.MenuItem"}, {owner: this.$.menuItems});
			var item = this.$.menuItems.getComponents()[i];
			item.$.menuItem.setContent(menuItemData[i].label);
			item.setIndex(i);
		}
		// now draw them
		this.$.menuItems.render();
	},
	showPanel: function(inSender, inEvent) {
		// enyo.log("showPanel", inEvent);
		// enyo.log(inEvent.originator.owner.index);
		this.$.mainView.setIndex(inEvent.originator.owner.index);
		this.toggleMenu(inSender, inEvent);
	},
	setupItem: function(inSender, inEvent) {
		var i = inEvent.index;
		this.$.menuItem.setMenuItem(menuItemData[i].name, i);
	}
});


enyo.kind({
	name: "slmc.MenuItem",
	count: 0,
	style: "height: 36px;",
	published: {
		index: 0
	},
	components: [
		{name: "menuItem", ontap: "showPanel", fit: true,
			style: "color: #0000CC; heigth: 46px; background: url(assets/gradient.png);"}
	],
	create: function() {
		this.inherited(arguments);
	},
	showPanel: function(inSender, inEvent) {
		// TODO - Auto-generated code
	}
});

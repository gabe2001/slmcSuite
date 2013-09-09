/**
 * some globals
 */

var menuItemData = [
	{
		name: "Home",
		url: 0
	},
	{
		name: "Event",
		url: 1
	},
	{
		name: "Users",
		url: 2
	},
	{
		name: "Forum",
		url: 3
	}
];

var count = 0;

/**
 * the code
 */

enyo.kind({
	name: "slmc.Suite",
	kind: "enyo.FittableRows",
	style: "background: url(assets/bg.png);",
	fit: true,
	components:[
		{kind: "onyx.Toolbar", style: "background: transparent; height: 55px; border-style: hidden;", components: [
				{kind: "onyx.MenuDecorator", onSelect: "selectMenuItem", style: "", components: [
						{kind: "onyx.IconButton", src: "assets/menu-icon-dropdown-arrow.png", style: ""},
						{kind: "onyx.Menu", name: "menu", style: ""}
					]},
				{name: "title", content: "Home", style: "color: black;"},
				{kind: "enyo.Image", src: "assets/logo_lms124_32.png"}
			]},
		{kind: "enyo.Panels", fit: true, arrangerKind: "CardArranger", components: [
			{kind: "slmc.Suite.Home"},
			{kind: "slmc.Suite.Event"},
			{kind: "slmc.Suite.Users"},
			{content: "forum page"}
			]},
	],
	rendered: function() {
		this.inherited(arguments);
		this.loadMenuItems();
	},
	loadMenuItems: function() {
		// enyo.log("loadMenuItems");
		for (var i = 0; i < menuItemData.length; i++){
			this.$.menu.createComponent({components: [{content: menuItemData[i].name, url: menuItemData[i].url}]}, {owner: this.$.menu});
		}
		this.$.menu.render();
	},
	toggleMenu: function(inSender, inEvent) {
		var showHide = !this.$.menuDrawer.getShowing();
		this.$.menuDrawer.setShowing(showHide);
		var openClose = !this.$.menuDrawer.getOpen();
		this.$.menuDrawer.setOpen(openClose);
	},
	selectMenuItem: function(inSender, inEvent) {
		// enyo.log("selectMenuItem", inEvent);
		if (inEvent.originator.content){
			this.$.mainView.setContent(inEvent.originator.content);
		} else if (inEvent.selected){
			// enyo.log(inEvent.selected.controlAtIndex(0));
			this.$.title.setContent(inEvent.selected.controlAtIndex(0).content);
			this.$.panels.setIndex(inEvent.selected.controlAtIndex(0).url);
		}
	}
});

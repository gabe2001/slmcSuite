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
		{name: "remove", kind: "onyx.IconButton", classes: "list-sample-contacts-remove-button", src: "assets/remove-icon.png", ontap: "removeTap"}
	],
	create: function() {
		this.inherited(arguments);
	},
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
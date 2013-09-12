enyo.kind({
	name: "slmc.Suite.Home",
	kind: "enyo.FittableRows",
	classes: "enyo-fit enyo-unselectable",
	components: [
		{name: "title", allowHtml: true, style: "font-weight: bold;"},
		{kind: "enyo.Panels", fit: true, dragable: false, components: [
				{kind: "enyo.Scroller", touch: true, components: [
						{name: "intro", allowHtml: true, style: "font-weight: normal; font-style: italic;"},
						{name: "article", allowHtml: true}
				]}
			]}
	],
	create: function() {
		this.inherited(arguments);
		this.loadMainArticle();
	},
	loadMainArticle: function() {
		var req = new enyo.JsonpRequest({
			url: "http://www.slotracinglemans.com/newforum/slmc.php"
		});
		req.go({action: "mainarticle"});
		req.response(this, "loadContent");
	},
	loadContent: function(inSender, inEvent) {
		// enyo.log("loadContent", inEvent);
		if (inEvent && inEvent.length > 0) {
			this.$.title.setContent(inEvent[0].title);
			this.$.intro.setContent(inEvent[0].intro);
			this.$.article.setContent(inEvent[0].content);
		}
	}
});

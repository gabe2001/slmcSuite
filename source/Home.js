enyo.kind({
	name: "slmc.Suite.Home",
	kind: "enyo.FittableRows",
	classes: "enyo-fit enyo-unselectable",
	components: [
		{content: "<b>Main Panel</b> - hot news, main article, etc", allowHtml: true},
		{content: "To do: query slm.c for article content based on relevance and/or news factor, then do some formatting suited for mobile devices",
			style: "color: grey;"},
		{kind: "enyo.Panels", fit: true, dragable: false, components: [
				{kind: "enyo.Scroller", touch: true, components: [
						{content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,<br>sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna<br>aliquam erat volutpat.<br>Ut wisi enim ad minim veniam,<br>quis nostrud exerci tation ullamcorper suscipit<br>lobortis nisl ut aliquip ex ea commodo consequat.<br>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat,<br>vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.<br>Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum.<br>Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem.<br>Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius.<br>Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum.<br>Mirum est notare quam littera gothica,<br>quam nunc putamus parum claram,<br>anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima.<br>Eodem modo typi,<br>qui nunc nobis videntur parum clari,<br>fiant sollemnes in futurum.<br>",
							allowHtml: true},
						{content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,<br>sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna<br>aliquam erat volutpat.<br>Ut wisi enim ad minim veniam,<br>quis nostrud exerci tation ullamcorper suscipit<br>lobortis nisl ut aliquip ex ea commodo consequat.<br>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat,<br>vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.<br>Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum.<br>Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem.<br>Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius.<br>Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum.<br>Mirum est notare quam littera gothica,<br>quam nunc putamus parum claram,<br>anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima.<br>Eodem modo typi,<br>qui nunc nobis videntur parum clari,<br>fiant sollemnes in futurum.<br>",
							allowHtml: true,
							style: "color: #0000CC"}
					]}
			]}
	],
	create: function() {
		this.inherited(arguments);
		// initialization code goes here
	}
});

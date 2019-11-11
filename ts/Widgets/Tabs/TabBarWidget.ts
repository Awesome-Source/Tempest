class TabBarWidget implements IWidget{

    public ColorClass = "t-blue";
    public BorderColorClass = "t-border-white";
    public SelectedIndex = 0;    

    constructor(public Id: string, public Tabs: TabWidget[]){}

    Render(ctx: RenderContext): VNode {
       var buttonChildren: VNode[] = [];
       this.renderButtons(ctx, buttonChildren);

        var tabBarDiv = new VNode("div")
            .WithClasses([this.ColorClass, "t-flex-row", "t-justify-content-start", "t-align-items-start"])
            .WithChildren(buttonChildren);
        var tabViewDiv = new VNode("div")
            .WithChildren([this.Tabs[this.SelectedIndex].Render(ctx)]);
        var completeDiv = new VNode("div")
            .WithChildren([tabBarDiv, tabViewDiv]);

        return completeDiv;
    }

    private setSelectedIndex(index: number, ctx: RenderContext){
        return () => {
            this.SelectedIndex = index;
            ctx.Render();
        }
    }

    private renderButtons(ctx: RenderContext, buttonChildren: VNode[]) {
        for (var t = 0; t < this.Tabs.length; t++) {

            var buttonWidget = new ButtonWidget(this.Id + "Tab" + t, this.Tabs[t].TabChild);
            buttonWidget.ColorClass = this.ColorClass;
            buttonWidget.OnClick = this.setSelectedIndex(t, ctx);
            var buttonConfig = buttonWidget.Render(ctx);

            if (this.SelectedIndex === t) {
                buttonConfig.WithClasses(["t-bottombar", this.BorderColorClass]);
            }
            buttonChildren.push(buttonConfig);
        }
    }
}
class ListWidget implements IWidget{

    constructor(public Children: IWidget[]){}

    Render(ctx: RenderContext): VNode {
        var config = new VNode("ul").WithClass("t-ul");
        
        for(var i = 0; i < this.Children.length; i++){
            const currentChild = this.Children[i];
            const childConfig = new VNode("li")
                .WithChildren([currentChild.Render(ctx)]);
            config.ChildElements.push(childConfig);
        }        

        return config;
    }

}
class TabWidget implements IWidget{
    
    constructor(public TabChild: IWidget, public ChildView: IWidget){}

    Render(ctx: RenderContext): VNode {
        return this.ChildView.Render(ctx);
    }

}
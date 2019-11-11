class RowWidget implements IWidget{

    public MainAxisAlignment: MainAxisAlignment;
    public CrossAxisAlignment: CrossAxisAlignment;
    public ContentAlignment: ContentAlignment;

    constructor(public Children: IWidget[]){
        this.MainAxisAlignment = MainAxisAlignment.SpaceBetween;
        this.CrossAxisAlignment = CrossAxisAlignment.Center;
        this.ContentAlignment = ContentAlignment.Center;
    }

    Render(ctx: RenderContext): VNode {
        return new VNode("div")
            .WithClasses([
                "t-flex-row",
                AlignmentConverter.GetClassForMainAxisAlignment(this.MainAxisAlignment),
                AlignmentConverter.GetClassForCrossAxisAlignment(this.CrossAxisAlignment),
                AlignmentConverter.GetClassForContentAlignment(this.ContentAlignment)
            ])
            .WithChildren(this.Children.map(c => c.Render(ctx)));
    }
    
}
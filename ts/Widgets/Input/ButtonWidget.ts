class ButtonWidget implements IWidget{

    constructor(public Id: string, public Child: IWidget){}

    public OnClick: () => void;
    public ColorClass = "t-blue";

    Render(ctx: RenderContext): VNode {
        var btn = new VNode("button")
        .WithClasses(["t-button", this.ColorClass])
        .WithChildren([this.Child.Render(ctx)]);

        if(this.OnClick){
            var callBack = this.createCallback(this.OnClick, this);
            ctx.Subscribe("buttonclick", this.Id, callBack, this);
            btn.WithEventListener("click", "buttonclick", this.Id, false);
        }

        return btn;
    }

    private createCallback(clickCallBack: () => void, caller: any){
        return (_data: any) => clickCallBack.call(caller);
    }

}
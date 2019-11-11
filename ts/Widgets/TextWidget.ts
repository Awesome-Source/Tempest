class TextWidget implements IWidget{

    constructor(public Value: string){}

    Render(_ctx: RenderContext): VNode {
        return new VNode("span").WithValue(this.Value);
    }

}
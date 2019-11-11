class RenderContext {
    private _targetElement: HTMLElement;
    private _rootWidget: IWidget;
    private _previousConfiguration: VNode;
    private _eventBus: EventBus;
    private _vdom: VirtualDom;

    constructor(targetElement: HTMLElement, rootWidget: IWidget)
    {
        this._targetElement = targetElement;
        this._rootWidget = rootWidget;
        this._eventBus = new EventBus();      
        this._vdom = new VirtualDom(this._eventBus);        
        this._previousConfiguration = new VNode(this._targetElement.tagName);
    }

    public Render(){
        this._eventBus.Clear();
        var newConfiguration = this._rootWidget.Render(this);
        this._vdom.UpdateElement(this._targetElement, newConfiguration, this._previousConfiguration);
        this._previousConfiguration = newConfiguration;
    }

    public Subscribe(topic: string, subtopic: string, callBack: (eventData: any) => void, caller: any)
    {
        this._eventBus.AddSubscription(new EventSubscription(topic, subtopic, callBack, caller));
    }
}

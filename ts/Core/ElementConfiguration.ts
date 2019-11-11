class VNode {
    ChildElements: VNode[];
    ElementValue: string;
    Classes: string[];
    EventListeners: EventListenerConfiguration[];
    Props: {[key: string]: string};

    constructor(public TagName: string) {
        this.ChildElements = [];
        this.ElementValue = null;
        this.Classes = [];
    }

    public WithClasses(classes: string[]) {
        for (var i = 0; i < classes.length; i++) {
            this.Classes.push(classes[i]);
        }
        return this;
    }

    public WithClass(singleClass: string) {
        this.Classes.push(singleClass);
        return this;
    }

    public WithChild(child: VNode): VNode{
        this.ChildElements.push(child);

        return this;
    }

    public WithChildren(children: VNode[]): VNode {
        for(var i = 0; i < children.length; i++){
            this.ChildElements.push(children[i]);
        }
        return this;
    }
    
    public WithValue(value: string): VNode {
        this.ElementValue = value;
        return this;
    }

    public WithProp(key: string, value: string): VNode{
        if(!this.Props){
            this.Props = {};
        }

        this.Props[key] = value;        
        return this;
    }

    public WithEventListener(eventName: string, topic: string, subTopic: string, bubble: boolean): VNode {

        if(!this.EventListeners){
            this.EventListeners = [];
        }

        this.EventListeners.push(new EventListenerConfiguration(eventName, topic, subTopic, bubble));
        return this;
    }

    public ToString(){
        return this.TagName + " (" + this.ChildElements.length + ") [" + this.Classes.join(';') + "] " + this.ElementValue;
    }
}

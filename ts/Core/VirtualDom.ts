class VirtualDom {
    private _eventBus: EventBus;

	constructor(eventBus: EventBus)
	{
		this._eventBus = eventBus;
    }
    
    public UpdateElement(currentNode: HTMLElement, newConfig: VNode, previousConfig: VNode) {
        this.updateNode(newConfig, previousConfig, currentNode);
        this.updateClasses(newConfig, previousConfig, currentNode);
		this.updateProps(currentNode, newConfig, previousConfig);		
		this.updateChildElements(newConfig, previousConfig, currentNode);	
    }

    private updateNode(newConfig: VNode, previousConfig: VNode, currentNode: HTMLElement) {		
		if (newConfig.ElementValue !== previousConfig.ElementValue) {
			currentNode.innerText = newConfig.ElementValue;
        }
	}

	private updateClasses(newConfig: VNode, previousConfig: VNode, childNode: Element) {
		const newConfigClasses = newConfig.Classes.join(" ");
		const previousConfigClasses = previousConfig.Classes.join(" ");

		if (newConfigClasses !== previousConfigClasses) {
			childNode.className = newConfigClasses;
		}
	}

	private updateProps(target: Element, newConfig: VNode, previousConfig: VNode)
	{
        const newProps = newConfig.Props;
        const oldProps = previousConfig.Props;

		if(!newProps && !oldProps)
		{
			return;
		}

		if(!newProps)
		{
			this.removeOldProps(oldProps, target);
			return;
		}

		var newKeys = Object.keys(newProps)

		if(!oldProps)
		{
			this.setNewProps(newKeys, target, newProps);
			return;
		}		
		
		this.removeOldPropsAndAddNewOnes(newKeys, target, newProps, oldProps);
	}

	private removeOldPropsAndAddNewOnes(newKeys: string[], target: Element, newProps: {[key: string]: string}, oldProps: {[key: string]: string}){
		for(var i = 0; i < newKeys.length; i++){
			let currentKey = newKeys[i];
			if(!oldProps.hasOwnProperty(currentKey))
			{
				target.removeAttribute(name);
				continue;
			}

			if(newProps[currentKey] !== oldProps[currentKey])
			{
				target.setAttribute(currentKey, newProps[currentKey]);
			}
		}
	}

	private setNewProps(newKeys: string[], target: Element, newProps: { [key: string]: string; }) {
		for (var n = 0; n < newKeys.length; n++) {
			let currentKey = newKeys[n];
			target.setAttribute(currentKey, newProps[currentKey]);
		}
	}

	private removeOldProps(oldProps: { [key: string]: string; }, target: Element) {
		var oldKeys = Object.keys(oldProps);
		for (var o = 0; o < oldKeys.length; o++) {
			target.removeAttribute(oldKeys[o]);
		}
	}
	
	private listenersAreDifferent(newConfig: VNode, previousConfig: VNode){
		if(!newConfig.EventListeners && !previousConfig.EventListeners){
			return false;
		}

		if(!newConfig.EventListeners && previousConfig.EventListeners){
			return true;
		}

		if(newConfig.EventListeners && !previousConfig.EventListeners){
			return true;
		}

		if(newConfig.EventListeners.length !== previousConfig.EventListeners.length){
			return true;
		}

		for(var i = 0; i < newConfig.EventListeners.length; i++){
			const newListener = newConfig.EventListeners[i];
			const previousListener = previousConfig.EventListeners[i];
			const eventNamesDiffer = newListener.EventName !== previousListener.EventName;
			const topicsDiffer = newListener.Topic !== previousListener.Topic;
			const subTopicDiffer = newListener.SubTopic !== previousListener.SubTopic;
			const bubbleSettingsDiffer = newListener.Bubble !== previousListener.Bubble;

			if(eventNamesDiffer || topicsDiffer || subTopicDiffer || bubbleSettingsDiffer){
				return true;
			}
		}

		return false;
	}
    
    private updateChildElements(newConfig: VNode, previousConfig: VNode, parentNode: Element) {
		const newLength = newConfig.ChildElements.length;
		const oldLength = previousConfig.ChildElements.length;
        const minLength = Math.min(newLength, oldLength);
        
        for(let i = 0; i < minLength; i++){
            let newChildConfig = newConfig.ChildElements[i];
            let prevChildConfig = previousConfig.ChildElements[i];

            if(newChildConfig.TagName !== prevChildConfig.TagName){
                parentNode.replaceChild(this.createElement(newChildConfig), parentNode.children[i]);
                continue;
			}
			
			//TODO implement a way where it is not necessary to recreate a sub-tree only to have the correct event listeners attatched.
			if(this.listenersAreDifferent(newChildConfig, prevChildConfig)){
				parentNode.replaceChild(this.createElement(newChildConfig), parentNode.children[i]);
                continue;
			}

            this.UpdateElement(<HTMLElement> parentNode.children[i], newChildConfig, prevChildConfig);
        }

        for(let i = oldLength - 1; i >= minLength; i--){
            var childNode = parentNode.childNodes[i];
            parentNode.removeChild(childNode);
        }

        for(let i = minLength; i < newLength; i++){
            parentNode.appendChild(this.createElement(newConfig.ChildElements[i]));
        }
    }
    
    private createElement(currentConfig: VNode) {
		const createdElement = document.createElement(currentConfig.TagName);

		if(currentConfig.ElementValue){
			createdElement.innerText = currentConfig.ElementValue;
		}

		if(currentConfig.Classes.length > 0){
			createdElement.className = currentConfig.Classes.join(" ");
		}

		if(currentConfig.Props){
			let keys = Object.keys(currentConfig.Props);
			this.setNewProps(keys, createdElement, currentConfig.Props);
		}

		if(currentConfig.EventListeners){
			for(var el = 0; el < currentConfig.EventListeners.length; el++){
				var listener = currentConfig.EventListeners[el];
				var callBack = this.createCallback(this._eventBus, listener.Topic, listener.SubTopic);
				createdElement.addEventListener(listener.EventName, callBack, listener.Bubble);
			}
		}

		for(var i = 0; i < currentConfig.ChildElements.length; i++){
            var child = currentConfig.ChildElements[i];
			createdElement.appendChild(this.createElement(child));
		}

		return createdElement;
	  }

	  private createCallback(eventBus: EventBus, topic: string, subTopic: string){
		  return (eventData: any) => {
			  eventBus.Publish(topic, subTopic, eventData);
		  }
	  }
}
class EventBus{
    private _subscriptionsByTopic: {[key: string]: EventSubscription[]};

    constructor(){
        this._subscriptionsByTopic = {};
    }

    public AddSubscription(subscription: EventSubscription){
        var subscriptionsOfTopic = this._subscriptionsByTopic[subscription.Topic];

        if(subscriptionsOfTopic){
            subscriptionsOfTopic.push(subscription);
            return;
        }

        this._subscriptionsByTopic[subscription.Topic]  = [subscription];
    }

    public Publish(topic: string, subTopic: string, data: any){
        console.log("Publish on topic: " + topic + " with subtopic: " + subTopic);
        var subscriptionsOfTopic = this._subscriptionsByTopic[topic];

        if(!subscriptionsOfTopic){
            return;
        }

        for(var i = 0; i < subscriptionsOfTopic.length; i++)
        {
            var currentSubscription = subscriptionsOfTopic[i];
            if(currentSubscription.SubTopic !== subTopic){
                continue;
            }

            currentSubscription.CallBack.call(currentSubscription.Caller, data);
        }   
     }

    public Clear(){
        this._subscriptionsByTopic = {};
    }
}
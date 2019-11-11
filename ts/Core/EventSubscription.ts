class EventSubscription{
    constructor(public Topic: string, public SubTopic: string, public CallBack: (eventData: any) => void, public Caller: any){}
}
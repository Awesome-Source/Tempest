class Tempest
{
	private _renderContext: RenderContext;

	constructor(targetElementId: string, rootWidget: IWidget)
	{
		var targetElement = document.getElementById(targetElementId);
		this._renderContext = new RenderContext(targetElement, rootWidget);

		if(!targetElement)
		{
			console.error("Could not find element for id: " + targetElementId);
		}
	}

	public Render()
	{		
		this._renderContext.Render();
	}	
}
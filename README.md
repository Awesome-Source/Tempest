Tempest
=======

Tempest is a rendering library heaviliy inspired by flutter.
The core concept is to compose the UI of widgets in a hierachy.
These widgets are rendered to virtual elements into a virtual DOM implementation.
Therefore only necessary updates are made to the real DOM.

**Disclaimer**: This project is provided "as is". It may be incomplete and/or faulty. The author(s) of this project cannot be held responsible for any damage occurring due to using this software.

Examples
--------

A simple List widget may look like this:
'''JavaScript
class ListWidget implements IWidget{

    constructor(public Children: IWidget[]){}

    Render(ctx: RenderContext): VNode {
        var config = new VNode("ul");
        
        for(var i = 0; i < this.Children.length; i++){
            const currentChild = this.Children[i];
            const childConfig = new VNode("li")
                .WithChildren([currentChild.Render(ctx)]);
            config.ChildElements.push(childConfig);
        }        

        return config;
    }

}
'''

This could be used like this:
'''JavaScript
var listContents: string[] = [];
        for(var i = 0; i < 5; i++){
            listContents.push(i.toString());
        }

        var list = new ListWidget(listContents.map(l => (new TextWidget(l))));
		
		var exampleTempest = new Tempest("example", list);
        exampleTempest.Render();
'''

Tempest needs an existing node with the provided id as render target.

'''HTML
<!DOCTYPE html>
<html>
<head>
    <title>Tempest Example</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>

<div>
	Tempest Example
</div>
	
<div id="example"></div>

<script src="js/tempest.js"></script>
<script src="js/tempest_example.js"></script>

</body>
</html>
'''
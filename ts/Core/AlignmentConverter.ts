class AlignmentConverter{
    public static GetClassForMainAxisAlignment(alignment: MainAxisAlignment)
    {
        switch(alignment){
            case MainAxisAlignment.Start: return "t-justify-content-start";
            case MainAxisAlignment.End: return "t-justify-content-end";
            case MainAxisAlignment.Center: return "t-justify-content-center";
            case MainAxisAlignment.SpaceAround: return "t-justify-content-space-around";
            case MainAxisAlignment.SpaceBetween: return "t-justify-content-space-between";
            default: throw "Unknown main axis alignment: " + alignment;
        }
    }

    public static GetClassForCrossAxisAlignment(alignment: CrossAxisAlignment)
    {
        switch(alignment){
            case CrossAxisAlignment.Start: return "t-align-items-start";
            case CrossAxisAlignment.End: return "t-align-items-end";
            case CrossAxisAlignment.Center: return "t-align-items-center";
            case CrossAxisAlignment.Stretch: return "t-align-items-stretch";
            case CrossAxisAlignment.Baseline: return "t-align-items-baseline";
            default: throw "Unknown cross axis alignment: " + alignment;
        }
    }

    public static GetClassForContentAlignment(alignment: ContentAlignment)
    {
        switch(alignment){
            case ContentAlignment.Start: return "t-align-content-start";
            case ContentAlignment.End: return "t-align-content-end";
            case ContentAlignment.Center: return "t-align-content-center";
            case ContentAlignment.Stretch: return "t-align-content-stretch";
            case ContentAlignment.SpaceAround: return "t-align-content-space-around";
            case ContentAlignment.SpaceBetween: return "t-align-content-space-between";
            default: throw "Unknown content alignment: " + alignment;
        }
    }
}
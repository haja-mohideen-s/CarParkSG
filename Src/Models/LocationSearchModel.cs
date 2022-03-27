namespace CarParkSG.Models.LocationSearch
{
    // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse);
    public class Result
    {
        public string SEARCHVAL { get; set; }
        public string BLK_NO { get; set; }
        public string ROAD_NAME { get; set; }
        public string BUILDING { get; set; }
        public string ADDRESS { get; set; }
        public string POSTAL { get; set; }
        public string X { get; set; }
        public string Y { get; set; }
        public string LATITUDE { get; set; }
        public string LONGITUDE { get; set; }
        public string LONGTITUDE { get; set; }
    }

    public class LocationSearchModel
    {
        public int found { get; set; }
        public int totalNumPages { get; set; }
        public int pageNum { get; set; }
        public List<Result> results { get; set; }
    }


}

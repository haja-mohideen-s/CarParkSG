namespace CarParkSG.Models
{
    // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse);
    public class Field
    {
        public string type { get; set; }
        public string id { get; set; }
    }

    public class Record
    {
        public string short_term_parking { get; set; }
        public string car_park_type { get; set; }
        public string y_coord { get; set; }
        public string x_coord { get; set; }
        public string free_parking { get; set; }
        public string gantry_height { get; set; }
        public string car_park_basement { get; set; }
        public string night_parking { get; set; }
        public string address { get; set; }
        public string car_park_decks { get; set; }
        public int _id { get; set; }
        public string car_park_no { get; set; }
        public string type_of_parking_system { get; set; }
        //extra fields
        public List<string> available_lots { get; set; }
        public string lot_type { get; set; }
        public int total_available_lot { get; set; }
        public bool is_available { get; set; }
    }

    public class Links
    {
        public string start { get; set; }
        public string next { get; set; }
    }

    public class Result
    {
        public string resource_id { get; set; }
        public List<Field> fields { get; set; }
        public List<Record> records { get; set; }
        public Links _links { get; set; }
        public int limit { get; set; }
        public int total { get; set; }
    }

    public class HDBCarParkModel
    {
        public string help { get; set; }
        public bool success { get; set; }
        public Result result { get; set; }
    }

}
